import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: "100%",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        "&:hover": { cursor: "pointer" },
      }}
      component={Link}
      to="https://www.youtube.com/channel/UCl9oxBNIVDgdOsnD4L-hA1Q"
      target="blank"
    >
      <Typography
        sx={{ color: "black" }}
      >{`\u00A9 Almagribi ${year}`}</Typography>
    </Box>
  );
};

export default Footer;
