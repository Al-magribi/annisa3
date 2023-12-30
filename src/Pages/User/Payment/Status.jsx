import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment_status = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      navigate("/student-payment");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: 250,
          width: 350,
          boxShadow: 4,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Pembayaran Berhasil</Typography>
        <Typography variant="h6">Kamu akan di alihkan dalam 5 detik</Typography>
      </Box>
    </Box>
  );
};

export default Payment_status;
