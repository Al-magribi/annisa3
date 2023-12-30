import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Teachers = () => {
  const { teachers } = useSelector((state) => state.teachers);
  return (
    <Box sx={{ flex: 1, p: 1, height: { md: 420, xl: 580 }, overflow: "auto" }}>
      <table className="greenTable">
        <thead>
          <tr>
            <th>Nama Guru</th>
            <th>Mapel</th>
          </tr>
        </thead>
        <tbody>
          {teachers?.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.mapel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Teachers;
