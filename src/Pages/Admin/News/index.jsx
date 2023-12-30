import React from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search_Function from "./Search";
import Functions from "./Functions";
import News from "./News";
import Admin_Protection from "../Admin_Protection";

const Admin_News = () => {
  Admin_Protection();

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
      <Title title="Admin - Informasi" />
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

          <News />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin_News;
