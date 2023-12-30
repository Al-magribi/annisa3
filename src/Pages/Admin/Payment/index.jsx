import React, { useEffect } from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Admin_Protection from "../Admin_Protection";
import Titution from "./Titution/Titution";
import Fee from "./Fee/Fee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Admin_Payment = () => {
  Admin_Protection();

  const {
    error: addFeeError,
    success,
    fee,
  } = useSelector((state) => state.newFee);

  const { error, isSppDeleted, messageSpp } = useSelector(
    (state) => state.delSpp
  );

  const {
    error: feeError,
    isDeleted,
    messageFee,
  } = useSelector((state) => state.upDelFee);

  useEffect(() => {
    if (isSppDeleted) {
      toast.success(messageSpp);
    } else {
      toast.error(error);
    }

    if (isDeleted) {
      toast.success(messageFee);
    } else {
      toast.error(feeError);
    }

    if (success) {
      toast.success(fee);
    } else {
      toast.error(addFeeError);
    }
  }, [
    isSppDeleted,
    error,
    messageSpp,
    feeError,
    isDeleted,
    messageFee,
    fee,
    success,
    addFeeError,
  ]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title title="Admin - Pembayaran" />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          minHeight: { xs: 900, md: 680 },
          top: { xs: 40, md: 80 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "95%",
            height: { xs: 790, md: 620 },
            mb: 1,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Titution />

          <Fee />
        </Box>
        <Footer />
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Admin_Payment;
