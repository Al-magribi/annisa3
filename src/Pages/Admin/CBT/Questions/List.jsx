import { Box, Button, Typography, Modal, Backdrop } from "@mui/material";
import React, { Fragment, useState, useRef } from "react";
import Edit from "./Edit";
import { useDispatch } from "react-redux";
import { getDetailQuestion } from "../../../../Redux/Question/question_action";

const createMarkup = (html) => {
  return { __html: html };
};

const List = ({ exam }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const editHandler = (id) => {
    dispatch(getDetailQuestion(id));

    setEdit(true);
  };

  return (
    <Fragment>
      {exam?.questions.map((item, index) => (
        <Box
          key={item._id}
          sx={{
            display: "flex",
            flexDirection: "column",
            m: 2,
            boxShadow: 4,
            borderRadius: 2,
            width: "95%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 8,
              p: 2,
            }}
          >
            <Typography sx={{ mb: 1 }}>{`No ${index + 1}`}</Typography>
            <Typography dangerouslySetInnerHTML={createMarkup(item.question)} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                m: 3,
              }}
            >
              <audio controls style={{ display: item.audio ? "row" : "none" }}>
                <source src={item.audio} type='audio/mp3' />
              </audio>
            </Box>

            {item.options &&
              Object.entries(item.options).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      height: 25,
                      width: 26,
                      backgroundColor: item.answer === key ? "green" : "white",
                      border: item.answer !== key ? "1px solid black" : "green",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ml: 2,
                      color: item.answer === key ? "white" : "black",
                    }}
                  >
                    {key}
                  </Box>
                  <Typography
                    key={key}
                    value={key}
                    fontFamily='Nunito Sans'
                    sx={{
                      m: 2,
                      width: "100%",
                    }}
                    dangerouslySetInnerHTML={createMarkup(value)}
                  />
                </Box>
              ))}
          </Box>
          <Box
            sx={{ m: 1, width: "95%", display: "flex", justifyContent: "end" }}
          >
            <Button
              variant='contained'
              color='secondary'
              onClick={() => editHandler(item._id)}
            >
              Edit
            </Button>
          </Box>
        </Box>
      ))}

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Edit open={edit} close={() => setEdit(false)} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default List;
