import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import User_Protection from "../User_Protection";
import Search_Function from "./Search";
import Ebooks from "./Ebooks";

const User_Library = () => {
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
      <Title title="Siswa - Perpustakaan" />

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
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Search_Function />
          </Box>

          <Ebooks />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default User_Library;
