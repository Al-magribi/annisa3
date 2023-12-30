import { Box } from "@mui/material";
import React from "react";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "./Banner";
import Visi_Misi from "./Visi_Misi";

const VISI_MISI = () => {
  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Title title="Visi Misi" />

      <Navbar />

      <Banner />

      <Box
        sx={{
          height: { xs: 692, md: 496 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Visi_Misi />
      </Box>

      <Footer />
    </Box>
  );
};

export default VISI_MISI;
