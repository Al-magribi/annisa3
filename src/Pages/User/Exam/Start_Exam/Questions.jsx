import { Box, Button, Modal, Backdrop, Typography, Fade } from "@mui/material";
import React, { useState, useRef, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Answer from "./Answer";
import Submit from "./Submit";

const createMarkup = (html) => {
  return { __html: html };
};

const Questions = () => {
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);

  const stored_answer = JSON.parse(localStorage.getItem("myAnswer"));

  const { detail } = useSelector((state) => state.detailExam);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleQuestionButtonClick = (questionNumber) => {
    setCurrentQuestion(questionNumber - 1);
    setShow(false);
  };

  const previous = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const next = () => {
    if (currentQuestion < detail?.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const questions = detail?.questions[currentQuestion];

  const answeredQuestions = {};
  if (stored_answer && typeof stored_answer === "object") {
    for (const questionId in stored_answer) {
      answeredQuestions[questionId] = true;
    }
  }

  return (
    <Fragment>
      <Box
        sx={{
          width: { xs: "90%", md: "80%" },
          mt: 2,
          height: 40,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant='contained'
          color='success'
          onClick={() => setShow(true)}
        >
          {`No ${currentQuestion + 1}`}
        </Button>

        <Button
          variant='contained'
          color='error'
          onClick={() => setConfirm(true)}
        >
          Selesai
        </Button>
        <Modal
          open={show}
          onClose={() => setShow(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={show}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 350, md: 400 },
                bgcolor: "#ffff",

                p: 2,
                display: "flex",
                alignContent: "center",
                justifyContent: "start",
                flexWrap: "wrap",
              }}
            >
              {detail?.questions.map((question, index) => (
                <Button
                  key={index}
                  variant={
                    answeredQuestions[question._id] ? "contained" : "outlined"
                  }
                  color='error'
                  sx={{ m: 1 }}
                  onClick={() => handleQuestionButtonClick(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </Box>
          </Fade>
        </Modal>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "90%", md: "80%" },
          m: 2,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", m: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              m: 3,
            }}
          >
            <Typography
              dangerouslySetInnerHTML={createMarkup(questions?.question)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              m: 3,
              height: 60,
            }}
          >
            <audio
              controls
              style={{ display: questions?.audio ? "row" : "none" }}
            >
              <source src={questions?.audio} type='audio/mp3' />
            </audio>
          </Box>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <Answer
            question_id={questions?._id}
            questions={questions?.type}
            answer={questions?.options}
            correct={questions?.answer}
          />
        </Box>
      </Box>

      <Box sx={{ width: "80%", display: "flex" }}>
        <Box sx={{ flex: 1, m: 1 }}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={previous}
          >
            sebelumnya
          </Button>
        </Box>

        <Box sx={{ flex: 1, m: 1 }}>
          <Button fullWidth variant='contained' color='primary' onClick={next}>
            selanjutnya
          </Button>
        </Box>
      </Box>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Submit open={confirm} close={() => setConfirm(false)} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default Questions;
