import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

const Counter = () => {
  const { users } = useSelector((state) => state.users);
  const { teachers } = useSelector((state) => state.teachers);
  const { ebooks } = useSelector((state) => state.ebooks);
  const { exams } = useSelector((state) => state.Exams);

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flex: 2,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {/* Students */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          width: 145,
          height: 80,
          borderRadius: "10px",
          bgcolor: "#279EFF",
          position: "relative",
          p: 1,
          m: 1,
        }}
      >
        <Typography variant="h6" color="white">
          SISWA
        </Typography>
        <Typography variant="h6" color="white">
          {users?.length}
        </Typography>
        <GroupsOutlinedIcon
          sx={{
            position: "absolute",
            right: 0,
            fontSize: 60,
            color: "rgba(255, 255, 255, 0.8)",
            mr: 1,
            transition: "font-size 0.3s ease-in-out",

            "&:hover": {
              fontSize: 70,
              cursor: "pointer",
            },
          }}
        />
      </Box>

      {/* Teachers */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          width: 145,
          height: 80,
          borderRadius: "10px",
          bgcolor: "#0F6292",
          position: "relative",
          p: 1,
          m: 1,
        }}
      >
        <Typography variant="h6" color="white">
          GURU
        </Typography>
        <Typography variant="h6" color="white">
          {teachers?.length}
        </Typography>
        <PeopleAltOutlinedIcon
          sx={{
            position: "absolute",
            right: 0,
            fontSize: 60,
            color: "rgba(255, 255, 255, 0.8)",
            mr: 1,
            transition: "font-size 0.3s ease-in-out",

            "&:hover": {
              fontSize: 70,
              cursor: "pointer",
            },
          }}
        />
      </Box>

      {/* Exams */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          width: 145,
          height: 80,
          borderRadius: "10px",
          bgcolor: "#03C988",
          position: "relative",
          p: 1,
          m: 1,
        }}
      >
        <Typography variant="h6" color="white">
          SOAL
        </Typography>
        <Typography variant="h6" color="white">
          {exams?.length}
        </Typography>
        <DevicesOutlinedIcon
          sx={{
            position: "absolute",
            right: 0,
            fontSize: 60,
            color: "rgba(255, 255, 255, 0.8)",
            mr: 1,
            transition: "font-size 0.3s ease-in-out",

            "&:hover": {
              fontSize: 70,
              cursor: "pointer",
            },
          }}
        />
      </Box>

      {/* Ebooks */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          width: 145,
          height: 80,
          borderRadius: "10px",
          bgcolor: "#79155B",
          position: "relative",
          p: 1,
          m: 1,
        }}
      >
        <Typography variant="h6" color="white">
          EBOOK
        </Typography>
        <Typography variant="h6" color="white">
          {ebooks?.length}
        </Typography>
        <LibraryBooksOutlinedIcon
          sx={{
            position: "absolute",
            right: 0,
            fontSize: 60,
            color: "rgba(255, 255, 255, 0.8)",
            mr: 1,
            transition: "font-size 0.3s ease-in-out",

            "&:hover": {
              fontSize: 70,
              cursor: "pointer",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Counter;
