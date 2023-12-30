import { Box, IconButton, Modal, Backdrop } from "@mui/material";
import React, { Fragment, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TaskIcon from "@mui/icons-material/Task";
import { blue, red, orange, pink } from "@mui/material/colors";
import Add from "./Add";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { delAllTeacher } from "../../../Redux/User/user_action";

const Functions = () => {
  const dispatch = useDispatch();

  const template_teacher =
    "https://firebasestorage.googleapis.com/v0/b/sekolah-digi.appspot.com/o/template%2FimportData_Guru.xlsx?alt=media&token=74629772-6609-4181-839c-3270e43e0fd9";

  const [add, setAdd] = useState(false);
  const [upload, setUpload] = useState(false);

  const deleteTeachers = () => {
    dispatch(delAllTeacher());
  };

  return (
    <Fragment>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "end" },
          m: { xs: 1, md: 0 },
        }}
      >
        <IconButton
          sx={{
            bgcolor: blue[500],
            color: "whitesmoke",
            mr: 2,
            "&:hover": { bgcolor: blue[800] },
          }}
          onClick={() => setAdd(true)}
        >
          <AddIcon />
        </IconButton>

        <IconButton
          sx={{
            bgcolor: red[500],
            color: "whitesmoke",
            mr: 2,
            "&:hover": { bgcolor: red[800] },
          }}
          onClick={deleteTeachers}
        >
          <FolderDeleteIcon />
        </IconButton>

        <IconButton
          sx={{
            bgcolor: orange[500],
            color: "whitesmoke",
            mr: 2,
            "&:hover": { bgcolor: orange[800] },
          }}
          onClick={() => setUpload(true)}
        >
          <UploadFileIcon />
        </IconButton>

        <IconButton
          sx={{
            bgcolor: pink[500],
            color: "whitesmoke",
            "&:hover": { bgcolor: pink[800] },
          }}
          component={Link}
          to={template_teacher}
          target="blank"
        >
          <TaskIcon />
        </IconButton>
      </Box>

      {/* add teacher */}
      <Modal
        open={add}
        onClose={() => setAdd(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div ref={useRef(null)}>
          <Add open={add} close={() => setAdd(false)} />
        </div>
      </Modal>

      {/* upload */}
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
    </Fragment>
  );
};

export default Functions;
