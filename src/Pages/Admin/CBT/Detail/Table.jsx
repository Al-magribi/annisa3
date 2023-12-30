import {
  Backdrop,
  Box,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment, useRef, useState, useEffect } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GradingIcon from "@mui/icons-material/Grading";
import LockResetIcon from "@mui/icons-material/LockReset";
import { green, blue, red, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailExam,
  resetUser,
  unlockUser,
} from "../../../../Redux/Exam/exam_action";
import Essay from "./Essay";
import { detailUser } from "../../../../Redux/User/user_action";
import { toast, ToastContainer } from "react-toastify";
import { getAnswers } from "../../../../Redux/Answer/answer_actions";
import {
  CLEAR_EXAM_ERROR,
  RESET_USER,
  UNLOCK_USER_RESET,
} from "../../../../Redux/Exam/exam_const";

const Table = ({ user, answers, exam }) => {
  const dispatch = useDispatch();

  const [essay, setEssay] = useState(false);

  const log = exam?.log;
  const examId = answers?.map((item) => item.exam);
  const userId = answers?.map((item) => item.user);

  const { unlockLoading, unlock, unlockMsg } = useSelector(
    (state) => state.unlock
  );
  const { resetLoading, reset, resetMsg } = useSelector((state) => state.reset);

  const unlockHandler = (id) => {
    dispatch(unlockUser(exam?._id, id));
  };

  const resetHandler = (id) => {
    dispatch(resetUser(exam?._id, id));
  };

  const essayHandler = (userId) => {
    setEssay(true);
    dispatch(detailUser(userId));
  };

  useEffect(() => {
    if (unlock) {
      toast.success(unlockMsg);

      dispatch(getDetailExam(exam?._id));
      dispatch(getAnswers());

      dispatch({ type: UNLOCK_USER_RESET });
    } else {
      toast.error(unlockMsg);

      dispatch({ type: CLEAR_EXAM_ERROR });
    }

    if (reset) {
      toast.success(resetMsg);

      dispatch(getDetailExam(exam?._id));
      dispatch(getAnswers());

      dispatch({ type: RESET_USER });
    } else {
      toast.error(resetMsg);

      dispatch({ type: CLEAR_EXAM_ERROR });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlock, reset, dispatch, unlockMsg, resetMsg]);

  return (
    <div>
      <table className='greenTable' width='100%'>
        <thead>
          <tr>
            <th>NIS</th>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>PG</th>
            <th>Essay</th>
            <th>Nilai</th>
            <th>Status</th>
            <th>opsi</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((user) => {
            const studentAnswer = answers?.find(
              (answer) => answer.user === user._id && answer.exam === exam?._id
            );
            return (
              <tr key={user._id}>
                <td>{user.nis}</td>
                <td>{user.name}</td>
                <td>{user.class}</td>
                <td>
                  {studentAnswer
                    ? Number(studentAnswer?.scorePg).toFixed()
                    : null}
                </td>
                <td>
                  {studentAnswer
                    ? Number(studentAnswer?.scoreEssay).toFixed()
                    : null}
                </td>
                <td>
                  {studentAnswer
                    ? Number(studentAnswer?.finalScore).toFixed()
                    : null}
                </td>

                <td>
                  <Box sx={{ width: "100%" }}>
                    {log?.includes(user._id) ? (
                      examId?.includes(exam?._id) &&
                      userId?.includes(user._id) ? (
                        <Typography
                          fontWeight='bold'
                          sx={{ color: green[500] }}
                        >
                          SAVED
                        </Typography>
                      ) : (
                        <Typography fontWeight='bold' sx={{ color: blue[800] }}>
                          ONLINE
                        </Typography>
                      )
                    ) : (
                      <Typography fontWeight='bold' sx={{ color: red[500] }}>
                        OFFLINE
                      </Typography>
                    )}
                  </Box>
                </td>
                <td>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    {unlockLoading ? (
                      <IconButton>
                        <LockResetIcon />
                      </IconButton>
                    ) : (
                      <Tooltip title='Unlock'>
                        <span>
                          <IconButton
                            sx={{ color: green[800] }}
                            disabled={
                              log?.includes(user._id)
                                ? examId?.includes(exam?._id) &&
                                  userId?.includes(user._id)
                                  ? true
                                  : false
                                : true
                            }
                            onClick={() => unlockHandler(user._id)}
                          >
                            <LockOpenIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}

                    {resetLoading ? (
                      <IconButton>
                        <LockResetIcon />
                      </IconButton>
                    ) : (
                      <Tooltip title='Reset'>
                        <span>
                          <IconButton
                            sx={{ color: blue[400] }}
                            disabled={
                              log?.includes(user._id)
                                ? examId?.includes(exam?._id) &&
                                  userId?.includes(user._id)
                                  ? false
                                  : true
                                : true
                            }
                            onClick={() => resetHandler(user._id)}
                          >
                            <RestartAltIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}

                    <Tooltip title='Essay'>
                      <span>
                        <IconButton
                          sx={{ color: yellow[900] }}
                          disabled={
                            log?.includes(user._id)
                              ? examId?.includes(exam?._id) &&
                                userId?.includes(user._id)
                                ? false
                                : true
                              : true
                          }
                          onClick={() => essayHandler(user._id)}
                        >
                          <GradingIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        open={essay}
        onClose={() => setEssay(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Essay open={essay} close={() => setEssay(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Table;
