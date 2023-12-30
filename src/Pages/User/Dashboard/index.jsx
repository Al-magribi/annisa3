import { Box } from "@mui/material";
import React from "react";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import User_Data from "./User_Data";
import Time from "./Time";
import User_Protection from "../User_Protection";

const User_Dashboard = () => {
  User_Protection();

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
      <Title title="Siswa - Dashboard" />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 700, md: 680, xl: 820 },
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
            height: { xs: 690, md: 640, xl: 780 },
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Time />

          <User_Data />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default User_Dashboard;
