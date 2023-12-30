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
          src="https://pxl-imperialacuk.terminalfour.net/fit-in/1079x305/prod01/channel_2/media/migration/staff/shutterstock_366490265--tojpeg_1518628471851_x4.jpg"
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
          {detail?.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
