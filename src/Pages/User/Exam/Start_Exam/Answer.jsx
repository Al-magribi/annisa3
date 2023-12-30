import { Backdrop, Box, IconButton, Modal, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Editor } from "@tinymce/tinymce-react";
import React, { Fragment, useState, useRef, useEffect } from "react";

const createMarkup = (html) => {
  return { __html: html };
};

const Answer = ({ question_id, questions, answer, correct }) => {
  const editorRef = useRef(null);

  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const storedAnswer = JSON.parse(localStorage.getItem("myAnswer"));
    setSelectedOptions(storedAnswer || {});
  }, []);

  const handleOptionSelect = (questionId, optionKey) => {
    const updatedOptions = {
      ...selectedOptions,
      [questionId]: optionKey,
    };

    setSelectedOptions(updatedOptions);
    localStorage.setItem("myAnswer", JSON.stringify(updatedOptions));
  };

  const handleEssayAnswer = (id) => {
    const questionId = id;
    const essayAnswer = editorRef.current.getContent(); // Mendapatkan jawaban dari editor

    const updatedAnswers = {
      ...selectedOptions,
      [questionId]: essayAnswer,
    };

    setSelectedOptions(updatedAnswers);
    localStorage.setItem("myAnswer", JSON.stringify(updatedAnswers));
  };

  return (
    <Fragment>
      {questions === "essay" ? (
        <Box key={questions._id} sx={{ width: "100%" }}>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCCE_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={selectedOptions[question_id] || ""}
            init={{
              height: window.innerWidth < 920 ? 300 : 200,
              width: "100%",
              menubar: false,
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={() => handleEssayAnswer(question_id)}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 2,
          }}
        >
          {answer &&
            Object.entries(answer).map(([key, value]) => (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  m: 1,
                  width: { xs: "100%", md: "50%" },
                  boxShadow: 3,
                  borderRadius: "10px",
                  transition: "0.3s ease-in-out",

                  "&:hover": { transform: "scale(1.02)" },
                }}
                onClick={() => handleOptionSelect(question_id, key)}
              >
                <IconButton
                  sx={{
                    ml: 2,
                    color:
                      selectedOptions[question_id] === key ? "#00970d" : "",
                  }}
                >
                  <CircleIcon />
                </IconButton>
                <Typography
                  key={key}
                  value={key}
                  fontFamily="Nunito Sans"
                  sx={{
                    m: 2,
                    width: "100%",
                  }}
                  dangerouslySetInnerHTML={createMarkup(value)}
                />
              </Box>
            ))}
        </Box>
      )}
    </Fragment>
  );
};

export default Answer;
