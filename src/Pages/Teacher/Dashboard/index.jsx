import React from "react";
import Teacher_Protection from "../Teacher_Protection";
import { Box } from "@mui/material";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Time from "../Components/Time";
import { useSelector } from "react-redux";
import User_Data from "./User_Data";

const Teacher_Dasboard = () => {
  Teacher_Protection();
  const { userInfo: user } = useSelector((state) => state.userLogin);
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
      <Title title="Guru - Dashboard" />
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
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
          }}
        >
          <Time />

          <User_Data user={user} />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Teacher_Dasboard;
