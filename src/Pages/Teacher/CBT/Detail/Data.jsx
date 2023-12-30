import { Backdrop, Box, Button, Modal } from "@mui/material";
import React, { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Scores from "./Scores";
import Asnwers from "./Asnwers";

const Data = () => {
  const anabut =
    "https://firebasestorage.googleapis.com/v0/b/sekolah-digi.appspot.com/o/template%2Fanabut.xlsx?alt=media&token=c2a008c9-bf04-4cc0-a20f-10331200b251";

  const [scores, setScores] = useState(false);
  const [answers, setAnswers] = useState(false);

  return (
    <Fragment>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          mt: { xs: 2, md: 0 },
        }}
      >
        <Button
          sx={{ width: { xs: 100, md: 120 } }}
          variant="contained"
          color="success"
          onClick={() => setScores(true)}
        >
          Nilai
        </Button>
        <Button
          sx={{ width: { xs: 100, md: 120 } }}
          variant="contained"
          color="secondary"
          onClick={() => setAnswers(true)}
        >
          Jawaban
        </Button>
        <Button
          sx={{ width: { xs: 100, md: 120 } }}
          variant="contained"
          color="primary"
          component={Link}
          target="blank"
          to={anabut}
        >
          Anabut
        </Button>
      </Box>

      {/* SCORES */}
      <Modal
        open={scores}
        onClose={() => setScores(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <Scores open={scores} close={() => setScores(false)} />
        </div>
      </Modal>

      {/* ANSWERS */}
      <Modal
        open={answers}
        onClose={() => setAnswers(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={useRef(null)}>
          <Asnwers open={answers} close={() => setAnswers(false)} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default Data;
