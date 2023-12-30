import { Box, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const User_Data = () => {
  const { userInfo: user } = useSelector((state) => state.userLogin);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "80%", md: "50%" },
          boxShadow: 4,
          p: 2,
          borderRadius: 2,
        }}
      >
        <TextField
          readOnly
          sx={{ mb: 2 }}
          fullWidth
          label="Nama Siswa"
          value={user?.name || ""}
        />

        <TextField
          readOnly
          sx={{ mb: 2 }}
          fullWidth
          label="Tingkat"
          value={user?.grade || ""}
        />

        <TextField
          readOnly
          sx={{ mb: 2 }}
          fullWidth
          label="Kelas"
          value={user?.class || ""}
        />

        <TextField
          readOnly
          sx={{ mb: 2 }}
          fullWidth
          label="Username"
          value={user?.username || ""}
        />

        <Typography variant="body2">
          * Jika terdapat kesalahan, silahkan hubungi administrator di sekolah
          kamu
        </Typography>

        <Typography variant="body2">
          * Pastikan sinyal kamu stabil ketika mengikuti ujian berbasis web
        </Typography>
      </Box>
    </Box>
  );
};

export default User_Data;
