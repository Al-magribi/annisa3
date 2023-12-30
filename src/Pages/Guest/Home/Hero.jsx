import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const { detail } = useSelector((state) => state.webDetail);

  const [imageLoaded, setImageLoaded] = useState(false);

  // Fungsi untuk menandai bahwa gambar sudah selesai dimuat
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const image = new Image();
    image.src = detail?.hero;
    image.onload = handleImageLoad;

    // Hapus event listener ketika komponen unmount
    return () => {
      image.onload = null;
    };
  }, [detail]);

  return (
    <Box
      sx={{
        height: "50vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
        {imageLoaded ? (
          <img
            src={detail?.hero}
            alt="hero"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            loading="lazy" // Tambahkan loading="lazy" di sini
          />
        ) : null}
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
        <Typography
          variant={window.innerWidth < 920 ? "h5" : "h3"}
          sx={{ color: "white" }}
        >
          {detail?.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          {detail?.tagline}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
