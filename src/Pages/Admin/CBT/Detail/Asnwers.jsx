import { Box, Button, Fade, Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../Components/Loader";
import { ToastContainer, toast } from "react-toastify";

const createMarkup = (html) => {
  return { __html: html };
};

const Asnwers = ({ open, close }) => {
  const { students: users } = useSelector((state) => state.studentInGrade);
  const { detail: exam } = useSelector((state) => state.detailExam);

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_answer = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      timeout: 100000, //  atur batasan waktu menjadi 10 detik (10000 milidetik)
    };

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/exam/answer/admin/get-all/${exam._id}`,
        config
      );

      setAnswers(data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Permintaan dibatalkan karena melebihi batasan waktu
        toast.error("Permintaan melebihi batasan waktu.");
        setLoading(false);
      } else {
        // Penanganan error lainnya
        toast.error("Terjadi error dalam permintaan:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (exam) {
      get_answer();
    }
  }, [exam]);

  // Download Nilai
  const tableScoreRef = useRef(null);

  const exportScoreToExcel = (tableRef) => {
    // Membuat objek workbook baru
    const workbook = XLSX.utils.book_new();

    // Mendapatkan referensi tabel
    const table = tableRef.current;

    // Mendapatkan data dari tabel
    const tableData = XLSX.utils.table_to_sheet(table);

    // Menambahkan data ke workbook
    XLSX.utils.book_append_sheet(workbook, tableData, "Sheet1");

    // Mengkonversi workbook menjadi file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Membuat file Excel dari buffer
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Menyimpan file Excel
    const fileName = `Jawaban_${exam?.name}.xlsx`;
    if (navigator.msSaveBlob) {
      // Mendukung Internet Explorer
      navigator.msSaveBlob(data, fileName);
    } else {
      // Mendukung browser modern
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(data);
      link.download = fileName;
      link.click();
    }
  };

  const exportScoreExcel = () => exportScoreToExcel(tableScoreRef);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 1300 },
            height: 600,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            justifyContent: "start",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <ToastContainer />
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  mb: 2,
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  variant='contained'
                  color='success'
                  onClick={exportScoreExcel}
                  sx={{ mr: 2 }}
                >
                  Excel
                </Button>

                <Button variant='contained' color='error' onClick={close}>
                  TUTUP
                </Button>
              </Box>

              <table className='greenTable' width='100%' ref={tableScoreRef}>
                <thead>
                  <tr>
                    <th rowSpan='2'>NIS</th>
                    <th rowSpan='2'>Nama Siswa</th>
                    <th rowSpan='2'>Kelas</th>
                    <th rowSpan='2'>PG</th>
                    <th
                      colSpan={
                        exam?.questions.map((item) => item.type === "essay")
                          .length
                      }
                    >
                      Essay
                    </th>
                  </tr>
                  <tr>
                    {exam?.questions.map((item, index) =>
                      item.type === "essay" ? (
                        <th key={item._id}>{index + 1}</th>
                      ) : null
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => {
                    const studentAnswer = answers?.find(
                      (answer) =>
                        answer.user === user?._id && answer.exam === exam?._id
                    );

                    // Menggabungkan jawaban PG ke dalam satu string
                    const pgAnswers = exam?.questions
                      ?.filter((item) => item.type === "pg")
                      ?.map(
                        (item) =>
                          studentAnswer?.answer.find(
                            (ans) => ans.question === item._id
                          )?.key
                      )
                      ?.join("");

                    return (
                      <tr key={user._id}>
                        <td>{user.nis}</td>
                        <td>{user.name}</td>
                        <td>{user.class}</td>
                        <td>{pgAnswers}</td>

                        {exam?.questions?.map((item) =>
                          item.type === "essay" ? (
                            <td key={item._id}>
                              {
                                <Typography
                                  dangerouslySetInnerHTML={createMarkup(
                                    studentAnswer?.answer.find(
                                      (ans) => ans.question === item._id
                                    )?.key
                                  )}
                                />
                              }
                            </td>
                          ) : null
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Asnwers;
