import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Token = () => {
  const { detail: exam } = useSelector((state) => state.detailExam);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Tooltip title="Token Masuk" placement="top-end">
        <Button
          variant="contained"
          color="success"
          sx={{ height: 80, width: 200, fontSize: 40 }}
        >
          {exam?.tokenIn}
        </Button>
      </Tooltip>

      <Tooltip title="Token Keluar" placement="top-end">
        <Button
          variant="contained"
          color="error"
          sx={{ height: 80, width: 200, fontSize: 40 }}
        >
          {exam?.tokenOut}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Token;
