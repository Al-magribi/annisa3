import {
  Box,
  IconButton,
  Modal,
  Backdrop,
  Button,
  Tooltip,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
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

const Exams = () => {
  const dispatch = useDispatch();

  const { exams } = useSelector((state) => state.Exams);
  const date = new Date();
  const real_time = format(date, "yyyy-MM-dd HH:mm");

  const {
    isDeleted,
    delAllExam,
    isUpdated,
    deleteMessage,
    updateMessage,
    deleteAllMessage,
  } = useSelector((state) => state.upDelExam);

  const [detail, setDetail] = useState(false);
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

  const deleteQuestions = (id) => dispatch(deleteQuestions(id));

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
  }, [
    isUpdated,
    updateMessage,
    isDeleted,
    deleteMessage,
    delAllExam,
    deleteAllMessage,
  ]);
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
            <th style={{ width: "200px" }}>Nama Ujian</th>
            <th style={{ width: "200px" }}>Mapel</th>
            <th>Tingkat</th>
            <th>Jadwal</th>
            <th>Token</th>
            <th>Soal</th>
            <th>Status</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {exams?.map((item) => (
            <tr key={item._id}>
              <td>{item.user.name}</td>
              <td>
                <Tooltip title='Detail Soal'>
                  <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to={`/teacher-cbt/exam/${item.name}/${item._id}`}
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
                      belum dimulai
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        color: "whitesmoke",
                        bgcolor: red[500],
                        "&:hover": { bgcolor: red[800] },
                      }}
                    >
                      ujian selesai
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
                      to={`${import.meta.env.VITE_DOMAIN}/teacher/exam/${
                        item.grade
                      }/${item._id}/${item.subject}/${item.name}`}
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

                  <Tooltip title='Hapus Soal'>
                    <IconButton
                      sx={{
                        bgcolor: red[500],
                        color: "whitesmoke",
                        "&:hover": { bgcolor: red[800] },
                      }}
                      onClick={deleteQuestions}
                    >
                      <FolderDeleteIcon />
                    </IconButton>
                  </Tooltip>

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
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer autoClose={2000} />

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
    </Box>
  );
};

export default Exams;
