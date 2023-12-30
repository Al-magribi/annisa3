import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update setiap 1 detik

    // Membersihkan interval saat komponen tidak lagi digunakan
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
      <Button variant="contained" color="error" sx={{ mr: 2 }}>
        {currentTime.toLocaleDateString(undefined, options)}
      </Button>

      <Button
        variant="contained"
        color="error"
        sx={{ mr: 1 }}
      >{`${hours}:${minutes}:${seconds}`}</Button>
    </Box>
  );
};

export default Time;
