import { Box, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
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
          src="https://www.signupgenius.com/cms/images/3%20Ways%20Sign%20Ups%20Help%20Coordinate%20Team%20Building%20Activities%20.png"
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
          KEGIATAN
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
