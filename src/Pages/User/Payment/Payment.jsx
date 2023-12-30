import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Process from "./Process";

const Payment = ({ spp, fee }) => {
  const [selectedSpp, setSelectedSpp] = useState([]);

  const handleSppChange = (e, item) => {
    const value = e.target.value;
    const month = item.month;
    const amount = item.amount;

    if (selectedSpp.some((spp) => spp.month === month)) {
      // Jika sudah dipilih, hapus dari daftar
      setSelectedSpp(selectedSpp.filter((spp) => spp.month !== month));
    } else {
      // Jika belum dipilih, tambahkan ke daftar
      setSelectedSpp([...selectedSpp, { month, amount }]);
    }
  };

  const [selectedFee, setSelectedFee] = useState([]);

  const handleFeeChange = (e, item) => {
    const value = e.target.value;
    const name = item.name;
    const amount = item.amount;

    if (selectedFee.some((fee) => fee.name === name)) {
      // Jika sudah dipilih, hapus dari daftar
      setSelectedFee(selectedFee.filter((fee) => fee.name !== name));
    } else {
      // Jika belum dipilih, tambahkan ke daftar
      setSelectedFee([...selectedFee, { name, amount }]);
    }
  };

  return (
    <Box
      sx={{
        mb: 1,
        height: { xs: 1400, md: 300 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* JENIS PEMBAYARAN */}

      {/* SPP */}
      <Box sx={{ flex: 1, p: 1, m: 1, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Pembayaran SPP
        </Typography>

        <Box
          sx={{
            height: "70%",
            overflow: "auto",
            p: 2,
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          <FormControl>
            {spp?.map((item) => (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    value={item.amount}
                    onChange={(e) => handleSppChange(e, item)}
                  />
                }
                label={`${item.month} - Rp ${parseFloat(
                  item.amount
                ).toLocaleString("id-ID")}`}
              />
            ))}
          </FormControl>
        </Box>
      </Box>

      {/* Lainnya */}
      <Box sx={{ flex: 1, p: 1, m: 1, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Pembayaran Lainnya
        </Typography>

        <Box
          sx={{
            height: "70%",
            overflow: "auto",
            p: 2,
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          <FormControl>
            {fee?.map((item) => (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    value={item.amount}
                    onChange={(e) => handleFeeChange(e, item)}
                  />
                }
                label={`${item.name} - Rp ${parseFloat(
                  item.amount
                ).toLocaleString("id-ID")}`}
              />
            ))}
          </FormControl>
        </Box>
      </Box>

      {/* Pehitungan */}
      <Box sx={{ flex: 1, p: 1, m: 1, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          Total Pembayaran
        </Typography>

        <Process spp={selectedSpp} fee={selectedFee} />
      </Box>
    </Box>
  );
};

export default Payment;
