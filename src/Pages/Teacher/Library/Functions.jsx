import { Box, IconButton, Modal, Backdrop } from "@mui/material";
import React, { Fragment, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import Add from "./Add";
import { useDispatch } from "react-redux";

const Functions = () => {
  const dispatch = useDispatch();

  const [add, setAdd] = useState(false);

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
