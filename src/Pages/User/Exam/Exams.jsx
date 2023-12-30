import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Tooltip,
} from "@mui/material";
import React, { useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getDetailExam, resetUser } from "../../../Redux/Exam/exam_action";
import Token from "./Token";

const Exams = () => {
  const dispatch = useDispatch();

  const { myExams: exams } = useSelector((state) => state.myExams);
  const { myAnswers: answers } = useSelector((state) => state.myAnswer);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { resetLoading } = useSelector((state) => state.reset);

  const [check, setCheck] = useState(false);

  const checkToken = (id) => {
    dispatch(getDetailExam(id));

    setCheck(true);
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk mengubah nilai input pencarian
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fungsi untuk melakukan pencarian berdasarkan nama ujian
  const searchFilter = (exam) => {
    return exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredExams = Array.isArray(exams) ? exams.filter(searchFilter) : [];

  const date = new Date();
  const real_time = format(date, "yyyy-MM-dd HH:mm");

  const reset = (examId) => {
    dispatch(resetUser(examId, userInfo._id));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          m: 2,
          height: 70,
        }}
      >
        <TextField
          label='Cari Mapel'
          variant='outlined'
          sx={{ width: { xs: "90%", md: "30%" } }}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <Typography>* Data ujian akan diperbarui setiap 2 Menit</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          height: { xs: 650, md: 500, xl: 627 },
          overflow: "auto",
        }}
      >
        <table
          className='greenTable'
          width={window.innerWidth < 950 ? "1200px" : "100%"}
        >
          <thead>
            <tr>
              <th>Nama Guru</th>
              <th style={{ width: "200px" }}>Nama Ujian</th>
              <th style={{ width: "200px" }}>Mapel</th>
              <th>Jadwal</th>
              <th>PG</th>
              <th>Essay</th>
              <th>Total</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams?.map((item) => (
              <tr key={item._id}>
                <td>{item.user.name}</td>
                <td>{item.name}</td>
                <td>{item.subject}</td>
                <td>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Tooltip placement='top-end' title='Mulai'>
                      <Button
                        sx={{ mb: 1 }}
                        variant='contained'
                        color='success'
                      >
                        {item.start}
                      </Button>
                    </Tooltip>

                    <Tooltip placement='bottom-end' title='Selesai'>
                      <Button variant='contained' color='error'>
                        {item.end}
                      </Button>
                    </Tooltip>
                  </Box>
                </td>

                <td>
                  {item.display === "yes"
                    ? answers?.map((answer) =>
                        answer.exam._id === item._id
                          ? Number(answer.scorePg).toFixed()
                          : null
                      )
                    : "-"}
                </td>
                <td>
                  {item.display === "yes"
                    ? answers?.map((answer) =>
                        answer.exam._id === item._id
                          ? Number(answer.scoreEssay).toFixed()
                          : null
                      )
                    : "-"}
                </td>
                <td>
                  {item.display === "yes"
                    ? answers?.map((answer) =>
                        answer.exam._id === item._id
                          ? Number(answer.finalScore).toFixed()
                          : null
                      )
                    : "-"}
                </td>

                <td>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {real_time >= item.start && real_time <= item.end ? (
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => checkToken(item._id)}
                      >
                        ikuti ujian
                      </Button>
                    ) : real_time < item.start ? (
                      <Button variant='contained' color='secondary' disabled>
                        belum dimulai
                      </Button>
                    ) : (
                      <Button variant='contained' color='secondary' disabled>
                        ujian selesai
                      </Button>
                    )}

                    {item.remedial ? (
                      <Button
                        variant='contained'
                        color='error'
                        sx={{
                          ml: 2,
                          display: real_time < item.start ? "none" : "block",
                        }}
                        onClick={() => reset(item._id)}
                      >
                        {resetLoading ? "Prosess" : "Reset"}
                      </Button>
                    ) : null}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Modal
        open={check}
        onClose={() => setCheck(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Token open={check} close={() => setCheck(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default Exams;
