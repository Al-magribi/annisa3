import React, { useState, useEffect } from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search_Function from "./Search";
import Functions from "./Functions";
import Exams from "./Exams";
import Admin_Protection from "../Admin_Protection";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../../../Redux/User/user_action";
import { getExams } from "../../../Redux/Exam/exam_action";
import { getGrades } from "../../../Redux/Grade/grade_action";

const Admin_CBT = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.newExam);

  const { isDeleted, delAllExam, isUpdated } = useSelector(
    (state) => state.upDelExam
  );

  const { upload_success } = useSelector((state) => state.uploadQuestion);

  const { isDeleted: question_deleted } = useSelector(
    (state) => state.upDelQuestion
  );

  const name = "";
  const teacher = "";

  useEffect(() => {
    dispatch(getExams(name));

    dispatch(getTeachers(teacher));

    dispatch(getGrades());

    if (success) {
      dispatch(getExams(name));
    }

    if (isDeleted) {
      dispatch(getExams(name));
    }

    if (delAllExam) {
      dispatch(getExams(name));
    }

    if (isUpdated) {
      dispatch(getExams(name));
    }

    if (upload_success) {
      dispatch(getExams(name));
    }

    if (question_deleted) {
      dispatch(getExams(name));
    }
  }, [
    dispatch,
    name,
    success,
    isDeleted,
    delAllExam,
    isUpdated,
    upload_success,
    question_deleted,
  ]);

  const [exam_subject, setExam] = useState([]);

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
      <Title title='Admin - CBT' />
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
          sx={{ width: "95%", height: { xs: 790, md: 620, xl: 780 }, mb: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Search_Function exam={(exam) => setExam(exam)} />

            <Functions />
          </Box>

          <Exams subject={exam_subject} />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin_CBT;
