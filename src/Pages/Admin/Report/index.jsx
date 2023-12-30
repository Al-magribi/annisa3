import React, { useEffect } from "react";
import Title from "../../Title";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Admin_Protection from "../Admin_Protection";
import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../../Redux/Class/class_action";
import Reports from "./Reports";
import Payment_history from "./Payment_history";
import { getSpp, getSppByGrade } from "../../../Redux/Spp/spp_action";
import { getFee } from "../../../Redux/Fee/fee_action";

const Admin_Report = () => {
  Admin_Protection();

  const dispatch = useDispatch();

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { classes } = useSelector((state) => state.classes);
  const { fee } = useSelector((state) => state.fee);

  useEffect(() => {
    dispatch(getClasses());

    dispatch(getSppByGrade(user?.grade));

    dispatch(getFee());
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
      <Title title="Admin - Laporan" />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          minHeight: { xs: 900, md: 680, xl: 820 },
          top: { xs: 70, md: 80 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: { xs: 990, md: 620, xl: 780 },
            mb: 1,
          }}
        >
          <Reports classes={classes} fee={fee} />

          <Payment_history />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Admin_Report;
