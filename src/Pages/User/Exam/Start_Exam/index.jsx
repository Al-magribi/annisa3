import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { startExam } from "../../../../Redux/Exam/exam_action";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../Title";
import Questions from "./Questions";
import User_Protection from "../../User_Protection";
import Loader from "../../Components/Loader";

const Start_Exam = () => {
  User_Protection();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { detail: exam } = useSelector((state) => state.detailExam);
  const { loading } = useSelector((state) => state.newAnswer);

  const id = params.id;

  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    dispatch(startExam(id));
  }, [dispatch, id]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    // Tambahkan event listener untuk memantau perubahan tab aktif atau tidak aktif
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Hapus event listener ketika komponen dibongkar
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let timeoutId;

    if (isTabActive === false) {
      timeoutId = setTimeout(() => {
        navigate("/student-dashboard");
      }, 10000); // 10000 milliseconds (10 seconds)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTabActive, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title title={exam?.name} />

      <Header />

      <Box
        sx={{
          height: { xs: 810, md: 700 },
          m: 2,
          overflow: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: loading ? "center" : "start",
          flexDirection: "column",
        }}
      >
        {loading ? <Loader /> : <Questions />}
      </Box>
    </Box>
  );
};

export default Start_Exam;
