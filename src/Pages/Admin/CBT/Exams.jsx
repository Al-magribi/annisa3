import {
  Box,
  IconButton,
  Modal,
  Backdrop,
  Button,
  Tooltip,
  Input,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { red, yellow, orange, pink, green } from "@mui/material/colors";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import Edit from "./Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteExam, getDetailExam } from "../../../Redux/Exam/exam_action";
import Upload from "./Upload";
import {
  DELETE_ALL_EXAM_RESET,
  DELETE_EXAM_RESET,
  UPDATE_EXAM_RESET,
} from "../../../Redux/Exam/exam_const";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { deleteQuestion } from "../../../Redux/Question/question_action";
import { DELETE_QUESTION_RESET } from "../../../Redux/Question/question_const";

const Exams = ({ subject }) => {
  const dispatch = useDispatch();

  const { exams } = useSelector((state) => state.Exams);
  const date = new Date();
  const real_time = format(date, "yyyy-MM-dd HH:mm");

  const {
    loading: delExam_loading,
    isDeleted,
    delAllExam,
    isUpdated,
    deleteMessage,
    updateMessage,
    deleteAllMessage,
  } = useSelector((state) => state.upDelExam);

  const {
    loading,
    isDeleted: question_deleted,
    message,
  } = useSelector((state) => state.upDelQuestion);

  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);

  const editHandler = (id) => {
    dispatch(getDetailExam(id));
    setEdit(true);
  };

  const uploadHandler = (id) => {
    dispatch(getDetailExam(id));
    setUpload(true);
  };

  const deleteHandler = (id) => dispatch(deleteExam(id));

  const deleteQue = (id) => dispatch(deleteQuestion(id));

  const copyToken = (item) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        toast.success("Copied");
      })
      .catch(() => {
        toast.info("Failed to copy");
      });
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success(updateMessage);

      dispatch({ type: UPDATE_EXAM_RESET });
    }

    if (isDeleted) {
      toast.success(deleteMessage);

      dispatch({ type: DELETE_EXAM_RESET });
    }

    if (delAllExam) {
      toast.success(deleteAllMessage);

      dispatch({ type: DELETE_ALL_EXAM_RESET });
    }

    if (question_deleted) {
      toast.success(message);

      dispatch({ type: DELETE_QUESTION_RESET });
    }
  }, [
    question_deleted,
    message,
    isUpdated,
    updateMessage,
    isDeleted,
    deleteMessage,
    delAllExam,
    deleteAllMessage,
  ]);

  const searchFilter = (exam) => {
    return exam.subject.toLowerCase().includes(subject);
  };

  const examFiltered = exams?.filter(searchFilter);

  return (
    <Box
      sx={{
        m: 1,
        width: "99%",
        height: { xs: 690, md: 570, xl: 720 },
        overflow: "auto",
      }}
    >
      <table
        className='greenTable'
        width={window.innerWidth < 950 ? "900px" : "100%"}
      >
        <thead>
          <tr>
            <th>Nama Guru</th>
            <th style={{ width: "150px" }}>Nama Ujian</th>
            <th style={{ width: "150px" }}>Mapel</th>
            <th>Tingkat</th>
            <th style={{ width: "200px" }}>Jadwal</th>
            <th>Token</th>
            <th>Soal</th>
            <th style={{ width: "130px" }}>Status</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {examFiltered?.map((item) => (
            <tr key={item._id}>
              <td>{item.user.name}</td>
              <td>
                <Tooltip title='Detail Soal'>
                  <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to={`/admin-cbt/exam/${item.name}/${item._id}`}
                  >
                    {item.name}
                  </Button>
                </Tooltip>
              </td>
              <td>{item.subject}</td>
              <td>{item.grade}</td>
              <td>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tooltip placement='top-end' title='Mulai'>
                    <Button sx={{ mb: 1 }} variant='contained' color='success'>
                      {item.start}
                    </Button>
                  </Tooltip>

                  <Tooltip placement='bottom-end' title='Selesai'>
                    <Button variant='contained' color='error'>
                      {item.end}
                    </Button>
                  </Tooltip>
                </Box>
              </td>
              <td>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tooltip placement='top-end' title='Token Masuk'>
                    <Button
                      sx={{ mb: 1 }}
                      variant='contained'
                      color='success'
                      onClick={() => copyToken(item.tokenIn)}
                    >
                      {item.tokenIn}
                    </Button>
                  </Tooltip>

                  <Tooltip placement='bottom-end' title='Token Keluar'>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => copyToken(item.tokenOut)}
                    >
                      {item.tokenOut}
                    </Button>
                  </Tooltip>
                </Box>
              </td>

              <td>{item.questions.length}</td>

              <td>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {real_time >= item.start && real_time <= item.end ? (
                    <Button
                      sx={{
                        color: "whitesmoke",
                        bgcolor: green[900],
                        "&:hover": { bgcolor: green[800] },
                      }}
                    >
                      berlangsung
                    </Button>
                  ) : real_time < item.start ? (
                    <Button
                      sx={{
                        color: "whitesmoke",
                        bgcolor: yellow[900],
                        "&:hover": { bgcolor: yellow[800] },
                      }}
                    >
                      dimulai
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        color: "whitesmoke",
                        bgcolor: red[500],
                        "&:hover": { bgcolor: red[800] },
                      }}
                    >
                      selesai
                    </Button>
                  )}
                </Box>
              </td>

              <td width='250px'>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <Tooltip title='Detail Ujian'>
                    <IconButton
                      sx={{
                        bgcolor: green[500],
                        color: "whitesmoke",
                        "&:hover": { bgcolor: green[800] },
                      }}
                      component={Link}
                      to={`/admin/exam/${item.grade}/${item._id}/${item.subject}/${item.name}`}
                    >
                      <DisplaySettingsIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Edit'>
                    <IconButton
                      sx={{
                        bgcolor: yellow[700],
                        color: "whitesmoke",
                        "&:hover": { bgcolor: yellow[900] },
                      }}
                      onClick={() => editHandler(item._id)}
                    >
                      <EditNoteOutlinedIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Upload'>
                    <IconButton
                      sx={{
                        bgcolor: orange[500],
                        color: "whitesmoke",
                        "&:hover": { bgcolor: orange[800] },
                      }}
                      onClick={() => uploadHandler(item._id)}
                    >
                      <UploadFileIcon />
                    </IconButton>
                  </Tooltip>

                  {loading ? (
                    <IconButton>
                      <RestartAltIcon />
                    </IconButton>
                  ) : (
                    <Tooltip title='Hapus Soal'>
                      <IconButton
                        sx={{
                          bgcolor: red[500],
                          color: "whitesmoke",
                          "&:hover": { bgcolor: red[800] },
                        }}
                        onClick={() => deleteQue(item._id)}
                      >
                        <FolderDeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  {delExam_loading ? (
                    <IconButton>
                      <RestartAltIcon />
                    </IconButton>
                  ) : (
                    <Tooltip title='Hapus Ujian'>
                      <IconButton
                        sx={{
                          bgcolor: red[500],
                          color: "whitesmoke",
                          "&:hover": { bgcolor: red[800] },
                        }}
                        onClick={() => deleteHandler(item._id)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT */}
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

      {/* UPLOAD */}
      <Modal
        open={upload}
        onClose={() => setUpload(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Upload open={upload} close={() => setUpload(false)} />
        </div>
      </Modal>

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Exams;
