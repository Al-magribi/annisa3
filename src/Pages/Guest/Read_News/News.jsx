import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const createMarkup = (html) => {
  return { __html: html };
};

const News = () => {
  const { detail } = useSelector((state) => state.detailNews);

  return (
    <Box sx={{ m: 2, display: "flex", flexDirection: "column" }}>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={createMarkup(detail?.text)}
      />
    </Box>
  );
};

export default News;
