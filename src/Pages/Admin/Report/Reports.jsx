import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getStudentInClass } from "../../../Redux/Class/class_action";
import Titution from "./Titution";
import Fee from "./Fee";

const Reports = ({ classes, spp, fee }) => {
  const dispatch = useDispatch();

  const [reportSpp, setReportSpp] = useState(false);
  const [reportFee, setReportFee] = useState(false);

  const getSppReport = (name) => {
    dispatch(getStudentInClass(name));
    setReportSpp(true);
  };

  const getFeeReport = (name) => {
    dispatch(getStudentInClass(name));
    setReportFee(true);
  };

  return (
    <Box
      sx={{
        height: { xs: 500, md: 210 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* TITUTION */}
      <Box sx={{ flex: 1, p: 1 }}>
        <Typography variant="h6">SPP</Typography>
        <Box
          sx={{
            height: 150,
            display: "flex",
            flexWrap: "wrap",
            mt: 1,
            overflow: "auto",
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          {classes?.map((item) => (
            <Button
              key={item._id}
              variant="contained"
              color="secondary"
              sx={{ width: 80, height: 40, m: 1 }}
              onClick={() => getSppReport(item.class)}
            >
              {item.class}
            </Button>
          ))}
        </Box>
      </Box>

      {/* FEE */}
      <Box sx={{ flex: 1, p: 1 }}>
        <Typography variant="h6">Pembayaran lainnya</Typography>
        <Box
          sx={{
            height: 150,
            display: "flex",
            flexWrap: "wrap",
            mt: 1,
            overflow: "auto",
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          {classes?.map((item) => (
            <Button
              key={item._id}
              variant="contained"
              color="primary"
              sx={{ width: 80, height: 40, m: 1 }}
              onClick={() => getFeeReport(item.class)}
            >
              {item.class}
            </Button>
          ))}
        </Box>
      </Box>

      {/* TITUTION */}

      <Modal
        open={reportSpp}
        onClose={() => setReportSpp(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Titution
            open={reportSpp}
            close={() => setReportSpp(false)}
            spp={spp}
          />
        </div>
      </Modal>

      {/* FEE */}
      <Modal
        open={reportFee}
        onClose={() => setReportFee(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Fee open={reportFee} close={() => setReportFee(false)} fee={fee} />
        </div>
      </Modal>
    </Box>
  );
};

export default Reports;
