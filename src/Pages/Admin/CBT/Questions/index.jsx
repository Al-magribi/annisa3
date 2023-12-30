import Admin_Protection from "../../Admin_Protection";
import React, { useEffect } from "react";
import Title from "../../../Title";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import List from "./List";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailExam } from "../../../../Redux/Exam/exam_action";
import { UPDATE_QUESTION_RESET } from "../../../../Redux/Question/question_const";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Questions = () => {
  Admin_Protection();

  const params = useParams();
  const dispatch = useDispatch();

  const { detail: exam } = useSelector((state) => state.detailExam);
  const { isUpdated, updateMsg, updateErr } = useSelector(
    (state) => state.upDelQuestion
  );

  const id = params.id;

  useEffect(() => {
    dispatch(getDetailExam(id));

    if (isUpdated) {
      toast.success(updateMsg);

      dispatch(getDetailExam(id));

      dispatch({ type: UPDATE_QUESTION_RESET });
    } else {
      toast.error(updateErr);

      dispatch({ type: UPDATE_QUESTION_RESET });
    }
  }, [dispatch, id, isUpdated, updateMsg, updateErr]);

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
      <Title title={`Soal ${exam?.name}`} />
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
            alignItems: "start",
            justifyContent: "start",
            flexDirection: "column",
          }}
        >
          <List exam={exam} />
        </Box>
        <Footer />
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Questions;
