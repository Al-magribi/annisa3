import { Button, Box, Fade, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAnswer } from "../../../../Redux/Answer/answer_actions";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

const Submit = ({ open, close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const { detail: exam } = useSelector((state) => state.detailExam);
  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { loading, error, success } = useSelector((state) => state.newAnswer);

  const finish = (e) => {
    e.preventDefault();

    if (token !== exam?.tokenOut) {
      toast.error("Token salah");

      setToken("");
    } else {
      const myAnswers = JSON.parse(localStorage.getItem("myAnswer"));

      const answers = Object.entries(myAnswers).map(([questionId, answer]) => ({
        question: questionId,
        key: answer,
      }));

      // Mencocokkan jawaban pada variabel answer dengan variabel exam
      const countCorrectAnswer = answers.filter((item) => {
        const question = exam?.questions.find((q) => q._id === item.question);

        return question?.answer === item.key;
      });

      // MENGHITUNG JUMLAH JAWABAN SALAH
      const wrong = answers.length - countCorrectAnswer;
      const wrongAnswer = isNaN(wrong) ? 0 : wrong;

      // MENGHITUNG JUMLAH JAWABAN BENAR
      const correctAnswer = countCorrectAnswer.length;

      // MENGHITUNG JUMLAH SOAL PG
      const totalPg = exam?.questions.filter((q) => q.type === "pg").length;

      // MENGHITUNG JUMLAH JAWABAN PG YANG BENAR
      const pgCorrectAnswer = countCorrectAnswer.filter((item) => {
        const question = exam?.questions.find((q) => q._id === item.question);

        return question?.type === "pg";
      }).length;

      const maxScore = 100; // Skor maksimal jika semua soal PG benar
      const weight = exam?.choice / 100; // Faktor untuk mengalikan skor

      const finalScore = (pgCorrectAnswer / totalPg) * maxScore * weight;

      const data = {
        user: user?._id,
        exam: exam?._id,
        answer: answers,
        correct: correctAnswer,
        wrong: wrongAnswer,
        scorePg: finalScore,
      };

      dispatch(createAnswer(data));

      setToken("");
    }
  };

  useEffect(() => {
    if (success) {
      localStorage.removeItem("myAnswer");
      localStorage.removeItem("countdown");

      navigate("/student-cbt");
    } else {
      toast.error(error);
    }
  }, [navigate, dispatch, success]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 400 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <form
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
              onSubmit={finish}
            >
              <TextField
                required
                label="TOKEN"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />

              <Button variant="contained" color="error" type="submit">
                Verifikasi
              </Button>
            </form>
          )}
        </Box>
      </Fade>

      <ToastContainer />
    </div>
  );
};

export default Submit;
