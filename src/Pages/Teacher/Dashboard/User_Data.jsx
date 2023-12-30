import { Box, Divider, TextField, Typography } from "@mui/material";
import React from "react";

const User_Data = ({ user }) => {
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
          label="Mata Pelajaran"
          value={user?.mapel || ""}
        />

        <TextField
          readOnly
          sx={{ mb: 2 }}
          fullWidth
          label="Username"
          value={user?.username || ""}
        />

        <Typography variant="body2">
          * Jika terdapat kesalahan, silahkan hubungi administrator
        </Typography>
      </Box>
    </Box>
  );
};

export default User_Data;
