import React from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Admin_Protection from "../Admin_Protection";
import { useSelector } from "react-redux";
import Setting from "./Setting";

const Admin_Setting = () => {
  Admin_Protection();

  const { detail } = useSelector((state) => state.webDetail);

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
      <Title title="Admin - Pengaturan" />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 1480, md: 680, xl: 820 },
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
            height: { xs: 1450, md: 670, xl: 780 },
            mb: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Setting web={detail} />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin_Setting;
