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
          src="https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/d5b83a8/2147483647/resize/800x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fd4%2F15%2F920c0f5845a99f89b6c6e62f0106%2Ftarget-bullseye-outside-gray-138434318.jpeg"
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
          VISI MISI
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
