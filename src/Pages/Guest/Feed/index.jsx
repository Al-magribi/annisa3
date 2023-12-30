import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Banner from "./Banner";
import Footer from "../Components/Footer";
import { useDispatch } from "react-redux";
import { getFeeds } from "../../../Redux/Act/act_action";
import Images from "./Images";

const Feed = () => {
  const dispatch = useDispatch();

  const name = "";

  useEffect(() => {
    dispatch(getFeeds(name));
  }, [dispatch, name]);

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Title title="Kegiatan" />

      <Navbar />

      <Banner />

      <Box
        sx={{
          minHeight: { xs: 692, md: 496 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
        }}
      >
        <Images />
      </Box>

      <Footer />
    </Box>
  );
};

export default Feed;
