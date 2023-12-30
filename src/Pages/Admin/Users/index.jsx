import React, { useEffect } from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search_Function from "./Search";
import Functions from "./Functions";
import Students from "./Students";
import Admin_Protection from "../Admin_Protection";
import { useDispatch } from "react-redux";
import { getGrades } from "../../../Redux/Grade/grade_action";
import { getClasses } from "../../../Redux/Class/class_action";

const Admin_Users = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGrades());

    dispatch(getClasses());
  }, [dispatch]);

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
      <Title title="Admin - Siswa" />
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
            <Search_Function />

            <Functions />
          </Box>

          <Students />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin_Users;
