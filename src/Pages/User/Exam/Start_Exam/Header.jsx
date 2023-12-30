import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAnswer } from "../../../../Redux/Answer/answer_actions";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { detail: exam } = useSelector((state) => state.detailExam);
  const { error, success } = useSelector((state) => state.newAnswer);

  const start = new Date(exam?.start).getTime();
  const end = new Date(exam?.end).getTime();
  const [timeLeft, setTimeLeft] = useState(start - end);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = end - now;

      if (timeRemaining <= 0) {
        const myAnswers = JSON.parse(localStorage.getItem("myAnswer"));

        const answers = Object.entries(myAnswers).map(
          ([questionId, answer]) => ({
            question: questionId,
            key: answer,
          })
        );

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

        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  useEffect(() => {
    if (success) {
      localStorage.removeItem("myAnswer");
      localStorage.removeItem("countdown");

      navigate("/student-cbt");
    } else {
      toast.error(error);
    }
  }, [navigate, dispatch, success]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <Box
      sx={{
        height: 30,
        display: "flex",
        alignItems: "center",
        p: 2,
        boxShadow: 4,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography>{user?.name}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography align="center">{exam?.name}</Typography>
      </Box>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
        <Button variant="contained" color="error">
          <span style={{ width: "25px", display: "inline-block" }}>
            {hours.toString().padStart(2, "0")}:
          </span>
          <span style={{ width: "25px", display: "inline-block" }}>
            {minutes.toString().padStart(2, "0")}:
          </span>
          <span style={{ width: "25px", display: "inline-block" }}>
            {seconds.toString().padStart(2, "0")}
          </span>
        </Button>
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Header;
