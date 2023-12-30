import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Detail = () => {
  const { detail: exam } = useSelector((state) => state.detailExam);

  const pg = exam?.questions?.filter((item) => item.type === "pg");
  const essay = exam?.questions?.filter((item) => item.type === "essay");

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        boxShadow: 4,
        borderRadius: 2,
        width: "98%",
      }}
    >
      <Box sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: "flex", mb: 2, borderBottom: "1px solid black" }}>
          <Typography sx={{ width: "30%" }}>Mapel</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${exam?.subject}`}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 2, borderBottom: "1px solid black" }}>
          <Typography sx={{ width: "30%" }}>Ujian</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${exam?.name}`}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 2, borderBottom: "1px solid black" }}>
          <Typography sx={{ width: "30%" }}>Kelas</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${exam?.grade}`}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 2, borderBottom: "1px solid black" }}>
          <Typography sx={{ width: "30%" }}>KKM</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${exam?.passing}`}</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 2 }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            mb: 2,
            borderBottom: "1px solid black",
          }}
        >
          <Typography sx={{ width: "30%" }}>Mulai</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${exam?.start}`}</Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            mb: 2,
            borderBottom: "1px solid black",
          }}
        >
          <Typography sx={{ width: "30%" }}>Selesai</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${exam?.end}`}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 2, borderBottom: "1px solid black" }}>
          <Typography sx={{ width: "30%" }}>PG</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${pg?.length}`}</Typography>
        </Box>

        <Box sx={{ display: "flex", mb: 2, borderBottom: "1px solid black" }}>
          <Typography sx={{ width: "30%" }}>Essay</Typography>
          <Typography sx={{ width: "80%" }}>{`: ${essay?.length}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;
