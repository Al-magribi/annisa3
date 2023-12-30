import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Banner = () => {
  const { detail } = useSelector((state) => state.detailNews);
  return (
    <Box
      sx={{
        height: { xs: "20vh", md: "30vh" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
        <img
          src="https://as1.ftcdn.net/v2/jpg/03/78/62/38/1000_F_378623891_fSVbw9fX6MRkHWCj3W6BbsiPvThZYdG3.jpg"
          alt="hero"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white" }}>
          Informasi
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
