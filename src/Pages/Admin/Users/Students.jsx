import { Box, IconButton, Modal, Backdrop } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { red, yellow } from "@mui/material/colors";
import { deleteUser, detailUser } from "../../../Redux/User/user_action";
import Edit from "./Edit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Students = () => {
  const dispatch = useDispatch();

  const { success, message, error } = useSelector((state) => state.newUser);

  const { users } = useSelector((state) => state.users);

  const {
    isDeleted,
    delMessage,
    allDeleted,
    allDelMessage,
    isUpdated,
    upMessage,
    errorDeleteStudent,
    errDelAllStudent,
    errUpStudent,
  } = useSelector((state) => state.upDelUser);

  const [edit, setEdit] = useState(false);

  const detailHandler = (id) => {
    dispatch(detailUser(id));
    setEdit(true);
  };

  const deleteHandler = (id) => dispatch(deleteUser(id));

  useEffect(() => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(error);
    }
  }, [success, error, message]);

  useEffect(() => {
    if (isDeleted) {
      toast.success(delMessage);
    } else {
      toast.error(errorDeleteStudent);
    }
  }, [isDeleted, delMessage, errorDeleteStudent]);

  useEffect(() => {
    if (allDeleted) {
      toast.success(allDelMessage);
    } else {
      toast.error(errDelAllStudent);
    }
  }, [allDeleted, allDelMessage, errDelAllStudent]);

  useEffect(() => {
    if (isUpdated) {
      toast.success(upMessage);
    } else {
      toast.error(errUpStudent);
    }
  }, [isUpdated, upMessage, errUpStudent]);

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
            <th>NIS</th>
            <th>Nama Siswa</th>
            <th>Tingkat</th>
            <th>Kelas</th>
            <th>Username</th>
            <th>Password</th>
            <th>opsi</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.nis}</td>
              <td>{user.name}</td>
              <td>{user.grade}</td>
              <td>{user.class}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>

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
                    onClick={() => detailHandler(user._id)}
                  >
                    <EditNoteOutlinedIcon />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: red[500],
                      color: "whitesmoke",
                      "&:hover": { bgcolor: red[800] },
                    }}
                    onClick={() => deleteHandler(user._id)}
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

export default Students;
