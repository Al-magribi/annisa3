import { Box } from "@mui/material";
import React from "react";
import Time from "./Time";
import Counter from "./Counter";
import Contact from "./Contact";
import Students from "./Students";
import Teachers from "./Teachers";

const Panel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Time />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 4,
          width: "98%",
          mt: 1,
        }}
      >
        <Counter />

        <Contact />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: 4,
          width: "98%",
          mt: 1,
        }}
      >
        <Students />

        <Teachers />
      </Box>
    </Box>
  );
};

export default Panel;
