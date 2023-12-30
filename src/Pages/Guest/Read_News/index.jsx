import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Banner from "./Banner";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailNews } from "../../../Redux/News/news_action";
import Title from "../../Title";
import News from "./News";
import Recent_News from "./Recent_News";

const Read_News = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { detail } = useSelector((state) => state.detailNews);

  const title = params.title;

  useEffect(() => {
    dispatch(detailNews(title));
  }, [dispatch, title]);

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Title title={detail?.title} description={detail?.text} />

      <Navbar />

      <Banner />

      <Box
        sx={{
          minHeight: { xs: 692, md: 496 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <News />
      </Box>

      <Footer />
    </Box>
  );
};

export default Read_News;
