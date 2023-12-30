import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import User_Protection from "../User_Protection";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsExam } from "../../../Redux/Exam/exam_action";
import { getMyAnswer } from "../../../Redux/Answer/answer_actions";
import Exams from "./Exams";
import Time from "../Dashboard/Time";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CREATE_MY_ANSWER_RESET } from "../../../Redux/Answer/answer_const";
import { RESET_USER } from "../../../Redux/Exam/exam_const";

const User_CBT = () => {
  User_Protection();

  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { error, success, message } = useSelector((state) => state.newAnswer);
  const { resetLoading, reset, resetMsg } = useSelector((state) => state.reset);

  useEffect(() => {
    dispatch(getStudentsExam(user?.grade));

    dispatch(getMyAnswer());
  }, [dispatch, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getStudentsExam(user?.grade));
    }, 120000);

    return () => clearInterval(interval);
  }, [dispatch, user]);

  useEffect(() => {
    if (success) {
      toast.success(message);

      dispatch({ type: CREATE_MY_ANSWER_RESET });
    } else {
      toast.error(error);
    }

    if (reset) {
      window.location.reload();

      dispatch({ type: RESET_USER });
    } else {
      toast.error(resetMsg);

      dispatch({ type: RESET_USER });
    }
  }, [success, message, error, reset, resetMsg, user, dispatch]);

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
      <Title title='Siswa - CBT' />

      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 900, md: 680, xl: 820 },
          top: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: { xs: 790, md: 640, xl: 780 },
            mb: 1,
          }}
        >
          <Time />
          <Exams />
        </Box>
        <Footer />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default User_CBT;
