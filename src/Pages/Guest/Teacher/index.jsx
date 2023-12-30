import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "./Banner";
import Teacher from "./Teacher";
import { useDispatch } from "react-redux";
import { getTeachers } from "../../../Redux/User/user_action";

const Teachers = () => {
  const dispatch = useDispatch();

  const name = "";

  useEffect(() => {
    dispatch(getTeachers(name));
  }, [dispatch, name]);

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Navbar />

      <Banner />

      <Box
        sx={{
          minHeight: { xs: 692, md: 496 },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Teacher />
      </Box>

      <Footer />
    </Box>
  );
};

export default Teachers;
