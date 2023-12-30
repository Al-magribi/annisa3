import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Title from "../../Title";
import Admin_Protection from "../Admin_Protection";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../../Redux/Class/class_action";
import { getGrades } from "../../../Redux/Grade/grade_action";
import Classes from "./Classes";
import Grades from "./Grades";

const Admin_Grade = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  const { classes } = useSelector((state) => state.classes);
  const { grades } = useSelector((state) => state.grades);

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getGrades());
  }, []);
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
      <Box>
        <Title title="Admin - Kelas" />

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
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Classes classes={classes} />

            <Grades grades={grades} />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin_Grade;
