import React from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Admin_Protection from "../Admin_Protection";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const Admin_Profile = () => {
  Admin_Protection();

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
      <Title title="Admin - Profile" />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          minHeight: { xs: 900, md: 680, xl: 820 },
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
          <Profile user={user} />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin_Profile;
