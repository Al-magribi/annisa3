import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Students = () => {
  const { users } = useSelector((state) => state.users);

  return (
    <Box sx={{ flex: 1, p: 1, height: { md: 420, xl: 580 }, overflow: "auto" }}>
      <table className="greenTable">
        <thead>
          <tr>
            <th>Nama Siswa</th>
            <th>Tingkat</th>
            <th>Kelas</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.grade}</td>
              <td>{user.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Students;
