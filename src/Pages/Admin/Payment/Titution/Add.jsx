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
import { createSpp } from "../../../../Redux/Spp/spp_action";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { CREATE_SPP_RESET } from "../../../../Redux/Spp/spp_const";

const Add = ({ grades }) => {
  const dispatch = useDispatch();

  const [add, setAdd] = useState(false);
  const [grade, setGrade] = useState("");
  const [price, setPrice] = useState("");

  const createHandler = (e) => {
    e.preventDefault();

    const data = {
      grade: grade,
      amount: price,
    };

    dispatch(createSpp(data));
  };

  const { loading, error, success, message } = useSelector(
    (state) => state.newSpp
  );

  useEffect(() => {
    if (success) {
      toast.success(message);

      dispatch({ type: CREATE_SPP_RESET });
    } else {
      toast.error(error);

      dispatch({ type: CREATE_SPP_RESET });
    }
  }, [error, success, message]);

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
                <FormControl required fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="demo-simple-select-label">
                    --Pilih Tingkat--
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={grade}
                    label="--Pilih Guru--"
                    onChange={(e) => setGrade(e.target.value)}
                  >
                    {grades?.map((grade) => (
                      <MenuItem key={grade._id} value={grade.grade}>
                        {grade.grade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    tambah
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setAdd(false)}
                  >
                    batal
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
