import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const createMarkup = (html) => {
  return { __html: html };
};

const Visi_Misi = () => {
  const { detail: web } = useSelector((state) => state.webDetail);
  return (
    <Box sx={{ width: "90%", overflow: "auto", m: 2, p: 1 }}>
      <Typography sx={{ mb: 2 }} variant="h4" align="center">
        VISI & MISI
      </Typography>

      <Box dangerouslySetInnerHTML={createMarkup(web?.visi_misi)} />
    </Box>
  );
};

export default Visi_Misi;
