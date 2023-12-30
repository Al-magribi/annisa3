import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Title from "../../Title";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getSpp, getSppByGrade } from "../../../Redux/Spp/spp_action";
import { getFee } from "../../../Redux/Fee/fee_action";
import Payment from "./Payment";
import Data from "./Data";
import { getMyPayments } from "../../../Redux/Payment/payment_action";
import User_Protection from "../User_Protection";

const User_Payment = () => {
  User_Protection();

  const dispatch = useDispatch();

  const { spp } = useSelector((state) => state.spp);
  const { fee } = useSelector((state) => state.fee);
  const { payments } = useSelector((state) => state.myPayments);
  const { userInfo: user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(getSppByGrade(user?.grade));

    dispatch(getFee());

    dispatch(getMyPayments());
  }, [dispatch, user]);

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
      <Title title="Siswa - Pembayaran" />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 1900, md: 680, xl: 820 },
          top: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: { xs: 1950, md: 680, xl: 780 },
            mb: 1,
          }}
        >
          <Payment spp={spp} fee={fee} />

          <Data payments={payments} />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default User_Payment;
