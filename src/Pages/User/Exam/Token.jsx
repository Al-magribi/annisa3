import { Box, Button, Fade, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedUser, startExam } from "../../../Redux/Exam/exam_action";
import Loader from "../Components/Loader";

const Token = ({ open, close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const {
    detail: exam,
    loading,
    start,
  } = useSelector((state) => state.detailExam);
  const { myAnswers: answer } = useSelector((state) => state.myAnswer);

  const [token, setToken] = useState("");

  const examId = answer?.map((item) => item.exam?._id);

  const verify = (e) => {
    e.preventDefault();

    if (token === exam?.tokenIn) {
      if (examId.includes(exam?._id)) {
        toast.error("Ujian ini sudah diselesaikan");

        setToken("");
      } else {
        if (exam?.log.includes(user?._id)) {
          toast.error(`${exam?.name} sedang dikerjakan`);

          setToken("");
        } else {
          setToken("");

          const data = {
            user: user?._id,
          };

          dispatch(loggedUser(exam?._id, data));

          dispatch(startExam(exam?._id));
        }
      }
    } else {
      toast.error("Token Salah");

      setToken("");
    }
  };

  useEffect(() => {
    if (start) {
      navigate(`/student/exam/${exam?.name}/${exam?._id}`);
    }
  }, [start, navigate]);

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
              onSubmit={verify}
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

export default Token;
