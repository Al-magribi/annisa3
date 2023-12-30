import React, { useEffect } from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Panel from "./Panel";

import { useDispatch } from "react-redux";
import { getStudents, getTeachers } from "../../../Redux/User/user_action";
import { getEbook } from "../../../Redux/Ebook/ebook_action";

import Admin_Protection from "../Admin_Protection";
import { getExams } from "../../../Redux/Exam/exam_action";

const Dashboard = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  const name = "";

  useEffect(() => {
    dispatch(getStudents(name));

    dispatch(getTeachers(name));

    dispatch(getEbook(name));

    dispatch(getExams(name));
  }, [dispatch, name]);

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
      <Title title="Admin - Dashboard" />
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
            height: { xs: 790, md: 620, xl: 780 },
            mb: 1,
            overflow: { xs: "auto", md: "none" },
          }}
        >
          <Panel />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
