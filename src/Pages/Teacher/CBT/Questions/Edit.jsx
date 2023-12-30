import {
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../../../Redux/Question/question_action";
import Loader from "../../Components/Loader";

const Edit = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, detail } = useSelector((state) => state.detailQuestion);
  const { isUpdated, loading: upLoad } = useSelector(
    (state) => state.upDelQuestion
  );

  const editorRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const [question, setQuestion] = React.useState("");
  const [questionAudio, setQuestionAudio] = React.useState("");
  const [updateAudio, setUpdateAudio] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [answer, setAnswer] = React.useState("");

  React.useEffect(() => {
    if (detail) {
      setQuestion(detail?.question);
      setQuestionAudio(detail?.audio);
      setOptions(detail?.options);
      setAnswer(detail?.answer);
    }
  }, [detail]);

  const handleQuestion = (question) => {
    setQuestion(question);
  };

  const handleAnswer = (key, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  const inputHandler = () => {
    inputRef.current.click();
  };

  const upAudio = (e) => {
    const file = e.target.files[0];

    setUpdateAudio(file);
  };

  const updateHandler = async () => {
    if (updateAudio) {
      const data = {
        question: question,
        options: options,
        answer: answer,
        audio: updateAudio,
      };

      dispatch(updateQuestion(detail._id, data));
    } else {
      const data = {
        question: question,
        audio: questionAudio,
        options: options,
        answer: answer,
      };

      dispatch(updateQuestion(detail._id, data));
    }
  };

  React.useEffect(() => {
    if (isUpdated) {
      close();
    }
  }, [isUpdated]);

  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 320, md: 1000 },
            height: 500,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            display: "flex",
            alignContent: "center",
            justifyContent: loading || upLoad ? "center" : "start",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
              mb: 2,
            }}
          >
            <Button
              sx={{ mr: 2 }}
              variant='contained'
              color='success'
              onClick={updateHandler}
            >
              Update
            </Button>

            <Button
              variant='contained'
              color='error'
              onClick={() => close(true)}
            >
              TUTUP
            </Button>
          </Box>
          {loading || upLoad ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
                flexDirection: "column",
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  mb: 2,
                  boxShadow: 4,
                  borderRadius: "10px",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCCE_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={question || ""}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      images_upload_url: `${
                        import.meta.env.VITE_URL
                      }/api/upload/image`,
                    }}
                    onEditorChange={handleQuestion}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <audio controls>
                    <source src={questionAudio} type='audio/mp3' />
                  </audio>
                  <Button
                    variant='contained'
                    sx={{
                      boxShadow: 5,
                      mr: 2,
                      bgcolor: "#3455AC",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                    onClick={inputHandler}
                  >
                    {updateAudio
                      ? updateAudio.name
                      : questionAudio
                      ? "Audio"
                      : "upload"}
                  </Button>
                  <input
                    ref={inputRef}
                    onChange={upAudio}
                    type='file'
                    multiple
                    accept='audio/*'
                    style={{ display: "none" }}
                  />
                </Box>
              </Box>

              {/* OPSI */}
              {options ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    flexWrap: "wrap",
                  }}
                >
                  {Object.entries(options).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <Typography
                        fontFamily='Nunito Sans'
                        fontWeight='bold'
                      >{`PILIHAN ${key}`}</Typography>
                      <Box
                        sx={{
                          width: "100%",
                          mb: 4,
                          boxShadow: 4,
                          borderRadius: "10px",
                        }}
                      >
                        <Editor
                          apiKey={import.meta.env.VITE_TINYMCCE_KEY}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          value={value ? value.toString() : ""}
                          init={{
                            height: 250,
                            menubar: true,
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "code",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "undo redo | blocks | " +
                              "bold italic forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            images_upload_url: `${
                              import.meta.env.VITE_URL
                            }/api/upload/image`,
                          }}
                          onEditorChange={(content) =>
                            handleAnswer(key, content)
                          }
                        />
                      </Box>
                    </React.Fragment>
                  ))}

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Jawaban Benar
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={answer}
                      label=' Jawaban Benar'
                      onChange={(e) => setAnswer(e.target.value)}
                    >
                      <MenuItem value='A'>A</MenuItem>
                      <MenuItem value='B'>B</MenuItem>
                      <MenuItem value='C'>C</MenuItem>
                      <MenuItem value='D'>D</MenuItem>
                      <MenuItem value='E'>E</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ) : null}
            </Box>
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default Edit;
