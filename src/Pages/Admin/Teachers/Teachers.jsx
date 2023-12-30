import { Box, IconButton, Modal, Backdrop } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { red, yellow } from "@mui/material/colors";
import Edit from "./Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteTeacher, detailTeacher } from "../../../Redux/User/user_action";
import { UPLOAD_TEACHER_RESET } from "../../../Redux/User/user_const";

const Teachers = () => {
  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.teachers);

  const { success, error, teacher } = useSelector((state) => state.newTeacher);

  const {
    isDeleted,
    message,
    errorDelTeacher,
    isUpdated,
    message: updateMessage,
    error: errorUpdate,
    allDeleted,
    message: allDeletedMessage,
    errDelTeachers,
  } = useSelector((state) => state.upDelTeacher);

  const {
    upload_success,
    message: uploadMessage,
    errUpTeachers,
  } = useSelector((state) => state.uploadTeacher);

  const [edit, setEdit] = useState(false);

  const detailHandler = (id) => {
    setEdit(true);
    dispatch(detailTeacher(id));
  };

  useEffect(() => {
    if (success) {
      toast.success(teacher);
    } else {
      toast.error(error);
    }
  }, [success, error, teacher]);

  const deleteHandler = (id) => {
    dispatch(deleteTeacher(id));
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success(message);
    } else {
      toast.error(errorDelTeacher);
    }
  }, [isDeleted, message, errorDelTeacher]);

  useEffect(() => {
    if (isUpdated) {
      toast.success(updateMessage);
    } else {
      toast.error(errorUpdate);
    }
  }, [isUpdated, updateMessage, errorUpdate]);

  useEffect(() => {
    if (allDeleted) {
      toast.success(allDeletedMessage);
    } else {
      toast.error(errDelTeachers);
    }
  }, [allDeleted, allDeletedMessage, errDelTeachers]);

  useEffect(() => {
    if (upload_success) {
      toast.success(uploadMessage);

      dispatch({ type: UPLOAD_TEACHER_RESET });
    } else {
      toast.error(errUpTeachers);
    }
  }, [upload_success, uploadMessage, errUpTeachers]);

  return (
    <Box
      sx={{
        m: 1,
        width: "99%",
        height: { xs: 690, md: 570, xl: 720 },
        overflow: "auto",
      }}
    >
      <table className="greenTable" width="100%">
        <thead>
          <tr>
            <th>Nama Guru</th>
            <th>Mapel</th>
            <th>Username</th>
            <th>Password</th>
            <th>opsi</th>
          </tr>
        </thead>
        <tbody>
          {teachers?.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.mapel}</td>
              <td>{teacher.username}</td>
              <td>{teacher.password}</td>
              <td>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <IconButton
                    sx={{
                      bgcolor: yellow[700],
                      color: "whitesmoke",
                      "&:hover": { bgcolor: yellow[900] },
                    }}
                    onClick={() => detailHandler(teacher._id)}
                  >
                    <EditNoteOutlinedIcon />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: red[500],
                      color: "whitesmoke",
                      "&:hover": { bgcolor: red[800] },
                    }}
                    onClick={() => deleteHandler(teacher._id)}
                  >
                    <PersonRemoveOutlinedIcon />
                  </IconButton>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />

      {/* edit teacher */}
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
    </Box>
  );
};

export default Teachers;
