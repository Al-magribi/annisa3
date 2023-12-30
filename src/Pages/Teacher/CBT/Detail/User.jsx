import { Box, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Data from "./Data";
import Table from "./Table";
import axios from "axios";

const User = () => {
  const { students: users } = useSelector((state) => state.studentInGrade);
  const { detail: exam } = useSelector((state) => state.detailExam);

  const [answers, setAnswers] = useState([]);

  const get_answer = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      timeout: 100000, // Misalnya, atur batasan waktu menjadi 10 detik (10000 milidetik)
    };

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/exam/answer/admin/get-all/${exam._id}`,
        config
      );

      setAnswers(data);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Permintaan dibatalkan karena melebihi batasan waktu
        console.error("Permintaan melebihi batasan waktu.");
      } else {
        // Penanganan error lainnya
        console.error("Terjadi error dalam permintaan:", error);
      }
    }
  };

  useEffect(() => {
    if (exam) {
      get_answer();
    }
  }, [exam]);

  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk mengubah nilai input pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fungsi untuk melakukan pencarian berdasarkan nama siswa
  const searchFilter = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredUsers = users?.filter(searchFilter);

  return (
    <Box
      sx={{
        m: 1,
        width: { xs: "90%", md: "96%" },
        boxShadow: 4,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mb: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <TextField
            label='Cari Nama Siswa'
            variant='outlined'
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <Data />
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table user={filteredUsers} answers={answers} exam={exam} />
      </Box>
    </Box>
  );
};

export default User;
