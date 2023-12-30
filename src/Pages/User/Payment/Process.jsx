import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  getToken,
  createPayment,
  getMyPayments,
} from "../../../Redux/Payment/payment_action";
import Loader from "../Components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { CREATE_PAYMENT_RESET } from "../../../Redux/Payment/payment_const";

const Process = ({ spp, fee }) => {
  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.userLogin);

  // Menghitung total dari spp
  const sppTotal = spp.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.amount);
  }, 0);

  // Menghitung total dari fee
  const feeTotal = fee.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.amount);
  }, 0);

  // Menghitung total keseluruhan
  const { loading, token } = useSelector((state) => state.token);
  const sum = sppTotal + feeTotal;
  const app = 4440;
  const total = sum + app;

  const paymentHandler = async () => {
    const data = {
      order_id: uuidv4(),
      payment: total,
    };

    dispatch(getToken(data));
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          const payment = {
            user: user?._id,
            orderId: result.order_id,
            spp: spp,
            fee: fee,
            app: app,
            totalAmount: result.gross_amount,
            total: total,
            status: result.transaction_status,
            url: result.pdf_url,
            time: result.transaction_time,
          };

          dispatch(createPayment(payment));

          dispatch({ type: CREATE_PAYMENT_RESET });
        },
        onPending: (result) => {
          const payment = {
            user: user._id,
            orderId: result.order_id,
            spp: spp,
            fee: fee,
            app: app,
            totalAmount: result.gross_amount,
            total: total,
            url: result.pdf_url,
          };

          dispatch(createPayment(payment));

          dispatch(getMyPayments());

          dispatch({ type: CREATE_PAYMENT_RESET });
        },
        onError: (error) => {
          toast.error(error);

          dispatch({ type: CREATE_PAYMENT_RESET });
        },
        onClose: () => {
          toast.error(
            "Anda belum menyelesaikaan pembayaran, pembayaran dibatalkan"
          );
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtrans_url = import.meta.env.VITE_MIDTRANS_URL;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtrans_url;

    const midtrans_client_key = import.meta.env.VITE_MIDTRANS_KEY;
    scriptTag.setAttribute("data-client-key", midtrans_client_key);

    document.body.appendChild(scriptTag);

    return () => document.body.removeChild(scriptTag);
  }, []);

  return (
    <>
      {(!spp || spp.length === 0) && (!fee || fee.length === 0) ? (
        <Box sx={{ m: 1, p: 1 }}>
          <Typography fontStyle="italic">
            Silahkan Pilih Pembayaran Terlebih Dahulu
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            m: 1,
            p: 1,
            boxShadow: 4,
            borderRadius: 2,
            overflow: "auto",
            height: "75%",
          }}
        >
          {loading ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <>
              {spp?.map((item) => (
                <Box key={item._id} sx={{ display: "flex", m: 1 }}>
                  <Typography sx={{ width: "30%" }}>{item.month}</Typography>
                  <Typography>{`Rp ${parseFloat(item.amount).toLocaleString(
                    "id-ID"
                  )}`}</Typography>
                </Box>
              ))}

              {fee?.map((item) => (
                <Box key={item._id} sx={{ display: "flex", m: 1 }}>
                  <Typography sx={{ width: "30%" }}>{item.name}</Typography>
                  <Typography>{`Rp ${parseFloat(item.amount).toLocaleString(
                    "id-ID"
                  )}`}</Typography>
                </Box>
              ))}

              <Box sx={{ display: "flex", m: 1 }}>
                <Typography sx={{ width: "30%" }}>Biaya Transaksi</Typography>
                <Typography>{`Rp ${parseFloat(app).toLocaleString(
                  "id-ID"
                )}`}</Typography>
              </Box>

              <Box
                sx={{
                  m: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  width: { xs: "95%", md: "70%" },
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ fontWeight: "bold" }}
                >
                  {`Total: Rp ${parseFloat(total).toLocaleString("id-ID")}`}
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={paymentHandler}
                >
                  Bayar
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Process;
