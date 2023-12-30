import { Box, Button, Fade, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getSppByGrade } from "../../../Redux/Spp/spp_action";
import { getReportPayments } from "../../../Redux/Payment/payment_action";
import * as XLSX from "xlsx";

const Titution = ({ open, close }) => {
  const dispatch = useDispatch();

  const { spp } = useSelector((state) => state.spp);
  const { payments } = useSelector((state) => state.report);

  const { allStudents: users, loading } = useSelector(
    (state) => state.students
  );
  const grades = users?.map((user) => user.grade);
  const grade = grades && grades[0];

  useEffect(() => {
    if (grade) {
      dispatch(getSppByGrade(grade));

      dispatch(getReportPayments());
    }
  }, [dispatch, grade]);

  const tableReport = useRef(null);

  const exportTableReport = (tableRef) => {
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
    const fileName = `Laporan_SPP.xlsx`;
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

  const exportTable = () => exportTableReport(tableReport);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 1000 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Button
                startIcon={<SimCardDownloadOutlinedIcon />}
                variant="contained"
                color="success"
                sx={{ mr: 2 }}
                onClick={exportTable}
              >
                excel
              </Button>

              <Button variant="contained" color="error" onClick={close}>
                tutup
              </Button>
            </Box>

            <Box sx={{ width: "100%", mt: 2, height: 500, overflow: "auto" }}>
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
                <table className="greenTable" ref={tableReport}>
                  <thead>
                    <tr>
                      <th>NIS</th>
                      <th>Nama</th>
                      {spp?.map((item) => (
                        <th key={item._id}>{item.month}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => {
                      const find_payment = (id, month) => {
                        const found_payment = payments?.find(
                          (p) =>
                            p.user._id === id &&
                            p.spp?.map((spp) => spp.month === month)
                        );

                        if (found_payment?.spp) {
                          const spp = found_payment?.spp.find(
                            (spp) => spp.month === month
                          );

                          return spp.amount;
                        }

                        return "";
                      };

                      return (
                        <tr key={user._id}>
                          <td>{user.nis}</td>
                          <td style={{ textAlign: "left" }}>{user.name}</td>
                          {spp?.map((s) => (
                            <td key={s._id}>
                              {find_payment(user._id, s.month)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
    </div>
  );
};

export default Titution;
