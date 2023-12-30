import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Data = ({ payments }) => {
  return (
    <Box sx={{ boxShadow: 4, borderRadius: 2, height: { xs: 420, md: 320 } }}>
      <Typography variant="h6" sx={{ p: 1 }}>
        Riwayat Transaksi
      </Typography>
      <Box
        sx={{
          p: 1,
          height: { xs: 350, md: 260 },
          overflow: "auto",
        }}
      >
        <table className="greenTable">
          <thead>
            <tr>
              <th>NIS</th>
              <th>Nama Siswa</th>
              <th>Tanggal</th>
              <th>Kode</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((item) => (
              <tr key={item._id}>
                <td>{item.user.nis}</td>
                <td>{item.user.name}</td>
                <td>
                  {format(new Date(item.user.createdAt), "yyyy-MM-dd HH:mm:ss")}
                </td>
                <td>{item.orderId}</td>
                <td>{`Rp ${parseFloat(
                  item.totalAmount - item.app
                ).toLocaleString("id-ID")}`}</td>
                <td>{item.status}</td>
                <td>
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      target="blank"
                      to={item.url}
                    >
                      Download
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Data;
