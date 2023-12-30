import { Box, IconButton, Modal, Backdrop, Tooltip } from "@mui/material";
import React, { Fragment, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import TaskIcon from "@mui/icons-material/Task";
import { blue, red, orange, pink } from "@mui/material/colors";
import Add from "./Add";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAllExams } from "../../../Redux/Exam/exam_action";

const Functions = () => {
  const dispatch = useDispatch();

  const template_student =
    "https://firebasestorage.googleapis.com/v0/b/sekolah-digi.appspot.com/o/template%2FimportData_Soal.xlsx?alt=media&token=cd6f6126-ca89-433a-8bd4-34c5e999c81b";
  const [add, setAdd] = useState(false);

  const deleteAll = () => {
    dispatch(deleteAllExams());
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
        <Tooltip title="Tambah Bank Soal">
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
        </Tooltip>

        <Tooltip title="Hapus Seluruh Bank Soal">
          <IconButton
            sx={{
              bgcolor: red[500],
              color: "whitesmoke",
              mr: 2,
              "&:hover": { bgcolor: red[800] },
            }}
            onClick={deleteAll}
          >
            <FolderDeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Template Bank Soal">
          <IconButton
            sx={{
              bgcolor: pink[500],
              color: "whitesmoke",
              "&:hover": { bgcolor: pink[800] },
            }}
            component={Link}
            to={template_student}
            target="blank"
          >
            <TaskIcon />
          </IconButton>
        </Tooltip>
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
    </Fragment>
  );
};

export default Functions;
