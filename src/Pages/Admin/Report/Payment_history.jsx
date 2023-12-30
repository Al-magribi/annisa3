import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState, forwardRef, useRef } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayment } from "../../../Redux/Payment/payment_action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

const DatePickerInputStart = forwardRef(({ value, onClick }, ref) => {
  return (
    <Button variant="contained" color="success" onClick={onClick} ref={ref}>
      {`Dari: ${value}`}
    </Button>
  );
});

const DatePickerInputEnd = forwardRef(({ value, onClick }, ref) => {
  return (
    <Button variant="contained" color="success" onClick={onClick} ref={ref}>
      {`sampai: ${value}`}
    </Button>
  );
});

const Payment_history = () => {
  const dispatch = useDispatch();

  const { payments } = useSelector((state) => state.allPayments);

  const [today, setToday] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const startISO = format(start, "yyyy-MM-dd");
  const endISO = format(end, "yyyy-MM-dd");

  useEffect(() => {
    setToday(new Date());
  }, []);

  useEffect(() => {
    dispatch(getAllPayment(startISO, endISO));
  }, [dispatch, startISO, endISO]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllPayment(startISO, endISO));
    }, 300000);

    return () => clearInterval(interval);
  }, [dispatch, startISO, endISO]);

  const dailyIncome = payments?.reduce(
    (acc, item) => acc + (item.totalAmount - 4440),
    0
  );

  const excelHandler = () => {
    const data = [
      [
        "NIS",
        "NAMA SISWA",
        "KELAS",
        "TANGGAL",
        "JENIS PEMBAYARAN",
        "JUMLAH",
        "TOTAL",
      ],
    ];

    const colWidths = [
      { wch: 10 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
    ];

    payments.forEach((item) => {
      const row = [
        item.user.nis,
        item.user.name,
        item.user.class,
        format(new Date(item.createdAt), "dd-MM-yyyy HH:mm:ss"),
      ];

      const spp = item.spp || [];
      const fee = item.fee || [];
      const total = [...spp, ...fee];

      if (total.length > 0) {
        total.forEach((t, index) => {
          const newRow = [...row];
          newRow[4] = t.name || `${t.month}`;
          newRow[5] = t.amount;
          newRow[6] = item.totalAmount - item.app;
          if (index === 0) {
            data.push(newRow);
          } else {
            data.push(["", "", "", "", newRow[4], newRow[5]]);
          }
        });
      } else {
        data.push(row);
      }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Pendapatan_${today.toLocaleDateString(
      "id-ID"
    )}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  return (
    <Box sx={{ m: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-around", md: "space-between" },
          height: { xs: 120, md: 60 },
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", md: "inline-block", width: 600 } }}
        >
          Data Pembayaran
        </Typography>

        {/* START */}

        <DatePicker
          closeOnScroll={true}
          selected={start}
          onChange={(date) => setStart(date)}
          customInput={<DatePickerInputStart />}
          maxDate={today}
        />

        {/* END */}

        <DatePicker
          closeOnScroll={true}
          selected={end}
          onChange={(date) => setEnd(date)}
          customInput={<DatePickerInputEnd />}
          maxDate={today}
        />

        <Button
          startIcon={<SimCardDownloadOutlinedIcon />}
          variant="contained"
          color="error"
          onClick={excelHandler}
          sx={{ width: 200 }}
        >
          excel
        </Button>
      </Box>

      <Box sx={{ height: 330, overflow: "auto" }}>
        <table className="greenTable">
          <thead>
            <tr>
              <th colSpan={7}>
                <Box>
                  <Typography align="left" fontStyle="italic">
                    * Pilih tanggal untuk menampilkan data pembayaran
                  </Typography>
                  <Typography align="left" fontStyle="italic">
                    * Data diperbarui setiap 5 menit
                  </Typography>
                </Box>
              </th>
            </tr>
            <tr>
              <th>NIS</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Tanggal</th>
              <th>Order Id</th>
              <th>Pembayaran</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {payments?.map((item) => (
              <tr key={item._id}>
                <td>{item.user.nis}</td>
                <td>{item.user.name}</td>
                <td>{item.user.class}</td>
                <td>
                  {format(new Date(item.createdAt), "yyyy-MM-dd hh:mm:ss")}
                </td>
                <td>{item.orderId}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {(item.spp || []).map((s, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ margin: "0" }}>{s.month}</p>
                        <p
                          style={{ margin: "0", width: "120px" }}
                        >{`Rp ${parseFloat(s.amount).toLocaleString(
                          "id-ID"
                        )}`}</p>
                      </div>
                    ))}
                    {(item.fee || []).map((f, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ margin: "0" }}>{f.name}</p>
                        <p
                          style={{ margin: "0", width: "120px" }}
                        >{`Rp ${parseFloat(f.amount).toLocaleString(
                          "id-ID"
                        )}`}</p>
                      </div>
                    ))}
                  </div>
                </td>
                <td>{`Rp ${parseFloat(
                  item.totalAmount - item.app
                ).toLocaleString("id-ID")}`}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <Typography fontWeight="bold">{`Total pendapatan ${format(
                  new Date(start),
                  "dd-MM-yyyy"
                )} - ${format(new Date(end), "dd-MM-yyyy")}`}</Typography>
              </td>
              <td>
                <Typography fontWeight="bold">{`Rp ${parseFloat(
                  dailyIncome
                ).toLocaleString("id-ID")}`}</Typography>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <Typography align="left">{`Laporan pada tanggal ${today.toLocaleDateString(
                  "id-ID"
                )}`}</Typography>
              </td>
            </tr>
          </tfoot>
        </table>
      </Box>
    </Box>
  );
};

export default Payment_history;
