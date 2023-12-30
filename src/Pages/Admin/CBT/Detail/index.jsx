import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Title from "../../../Title";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailExam } from "../../../../Redux/Exam/exam_action";
import { getStudentInGrade } from "../../../../Redux/Grade/grade_action";
import Token from "./Token";
import Detail from "./Detail";
import User from "./User";
import Admin_Protection from "../../Admin_Protection";
import { getAnswers } from "../../../../Redux/Answer/answer_actions";
import Countdown from "./Countdown";
import { toast, ToastContainer } from "react-toastify";

const Admin_DetailExam = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  const { detail: exam } = useSelector((state) => state.detailExam);

  const { success, message, error } = useSelector((state) => state.essay);

  const params = useParams();

  const id = params.id;

  const grade = params.grade;

  useEffect(() => {
    dispatch(getStudentInGrade(grade));
    dispatch(getDetailExam(id));
  }, [dispatch, grade, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getDetailExam(id));
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      dispatch(getAnswers(exam?._id));

      toast.success(message);
    } else {
      toast.error(error);
    }
  }, [dispatch, success, message, error]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title title={exam?.name} />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          minHeight: { xs: 900, md: 680 },
          top: { xs: 40, md: 80 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: { xs: 790, md: 620, xl: 780 },
            mb: 1,
            overflow: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 80,
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Countdown />
          </Box>
          <Token />

          <Detail />

          <User />
        </Box>
        <Footer />
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Admin_DetailExam;
