import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { blue, green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { createFee } from "../../../../Redux/Fee/fee_action";
import Loader from "../../Components/Loader";

const Add = () => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector((state) => state.newFee);

  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const createHandler = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      amount: price,
    };

    dispatch(createFee(data));
  };

  useEffect(() => {
    if (success) {
      setAdd(false);

      setName("");
      setPrice("");
    }
  }, [success]);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "end", mb: 2 }}>
      <Tooltip title="Tambah">
        <IconButton
          sx={{
            bgcolor: blue[500],
            color: "whitesmoke",
            "&:hover": { bgcolor: blue[800] },
          }}
          onClick={() => setAdd(true)}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

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
        <Fade in={add}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 400 },
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            {loading ? (
              <Loader />
            ) : (
              <form style={{ width: "98%" }} onSubmit={createHandler}>
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  required
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  required
                  label="Biaya"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <Box
                  sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                  <Button variant="contained" color="success" type="submit">
                    tambah
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Add;
