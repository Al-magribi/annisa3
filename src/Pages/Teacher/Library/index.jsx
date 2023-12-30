import { Box } from "@mui/material";
import React from "react";
import Teacher_Protection from "../Teacher_Protection";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search_Function from "./Search";
import Ebooks from "./Ebooks";
import Functions from "./Functions";
import Title from "../../Title";

const Teacher_Library = () => {
  Teacher_Protection();
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
      <Title title="Guru - Perpustakaan" />

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

          <Ebooks />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Teacher_Library;
