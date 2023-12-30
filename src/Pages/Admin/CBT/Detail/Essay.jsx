import { Box, Button, Fade, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { essayScore } from "../../../../Redux/Answer/answer_actions";
import { toast } from "react-toastify";
import { CREATE_SCORE_ESSAY_RESET } from "../../../../Redux/Answer/answer_const";
import Loader from "../../Components/Loader";
import axios from "axios";

const createMarkup = (html) => {
  return { __html: html };
};

const Essay = ({ open, close }) => {
  const dispatch = useDispatch();

  const { error, message, success, loading } = useSelector(
    (state) => state.essay
  );

  const [scores, setScores] = useState("");
  const [totalScore, setTotalScore] = useState(0);

  const { detail: exam } = useSelector((state) => state.detailExam);
  const { detail: user } = useSelector((state) => state.detailUser);

  const [answers, setAnswers] = useState([]);
  const [load, setLoading] = useState(false);

  const get_answer = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      timeout: 100000, // Misalnya, atur batasan waktu menjadi 10 detik (10000 milidetik)
    };

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/exam/answer/admin/get-all/${exam._id}`,
        config
      );

      setAnswers(data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Permintaan dibatalkan karena melebihi batasan waktu
        toast.error("Permintaan melebihi batasan waktu.");
        setLoading(false);
      } else {
        // Penanganan error lainnya
        toast.error("Terjadi error dalam permintaan:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    get_answer();
  }, []);

  const questions = exam?.questions.filter((item) => item.type === "essay");

  useEffect(() => {
    const storedScores = localStorage.getItem("essayScores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    // Menghitung total skor dari objek scores
    const calculatedTotalScore = Object.values(scores).reduce(
      (acc, score) => acc + parseInt(score || 0, 10),
      0
    );
    setTotalScore(calculatedTotalScore);

    localStorage.setItem("essayScores", JSON.stringify(scores));
  }, [scores]);

  const handleScoreChange = (questionId, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      [questionId]: score,
    }));
  };

  const addScore = () => {
    const presentage = parseFloat(exam?.essay) / 100;
    const result = totalScore * presentage;
    console.log(result);

    const data = {
      essay: result,
    };

    dispatch(essayScore(user?._id, exam?._id, data));
  };

  useEffect(() => {
    if (success) {
      setScores("");

      localStorage.removeItem("essayScores");

      dispatch({ type: CREATE_SCORE_ESSAY_RESET });

      close();
    } else {
      toast.error(error);

      dispatch({ type: CREATE_SCORE_ESSAY_RESET });
    }
  }, [dispatch, error, message, success]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 800 },
            height: 600,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {load ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  mb: 2,
                }}
              >
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  color='success'
                  onClick={addScore}
                >
                  Simpan
                </Button>
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  color='error'
                  onClick={close}
                >
                  Batal
                </Button>
              </Box>
              {loading ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </Box>
              ) : (
                <form
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflowX: "auto",
                  }}
                >
                  {questions?.map((item) => {
                    const studentAnswers = answers?.find(
                      (answer) =>
                        answer.user === user?._id && answer.exam === exam?._id
                    );

                    return (
                      <Box
                        key={item._id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "95%",
                          m: 1,
                          p: 1,
                        }}
                      >
                        {/* Questions and answer */}
                        <Box
                          sx={{
                            flex: 2,
                            p: 1,
                            m: 1,
                            boxShadow: 4,
                            borderRadius: 2,
                          }}
                        >
                          <Box
                            sx={{ mb: 2 }}
                            dangerouslySetInnerHTML={createMarkup(
                              item.question
                            )}
                          />
                          {studentAnswers && (
                            <Box
                              sx={{ fontStyle: "italic" }}
                              dangerouslySetInnerHTML={createMarkup(
                                studentAnswers?.answer.find(
                                  (ans) => ans.question === item._id
                                )?.key
                              )}
                            />
                          )}
                        </Box>

                        {/* Score */}
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            m: 2,
                          }}
                        >
                          <TextField
                            fullWidth
                            label='Score'
                            value={scores[item._id] || ""}
                            onChange={(e) =>
                              handleScoreChange(item._id, e.target.value)
                            }
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </form>
              )}
            </>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Essay;
