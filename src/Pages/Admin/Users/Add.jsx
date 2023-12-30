import {
  Box,
  Fade,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../Redux/User/user_action";
import { CREATE_USER_RESET } from "../../../Redux/User/user_const";

const Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.newUser);

  const { grades } = useSelector((state) => state.grades);

  const { classes } = useSelector((state) => state.classes);

  const { success } = useSelector((state) => state.newUser);

  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [grade, setGrade] = useState("");
  const [kelas, setKelas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addHandler = () => {
    const data = {
      nis: nis,
      name: name,
      grade: grade,
      class: kelas,
      username: username,
      password: password,
    };

    dispatch(createUser(data));
  };

  useEffect(() => {
    if (success) {
      setNis("");
      setName("");
      setGrade("");
      setKelas("");
      setUsername("");
      setPassword("");

      dispatch({ type: CREATE_USER_RESET });
    } else {
      setNis("");
      setName("");
      setGrade("");
      setKelas("");
      setUsername("");
      setPassword("");

      dispatch({ type: CREATE_USER_RESET });
    }
  }, [success, dispatch]);

  return (
    <div>
      <Fade in={open}>
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
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <form
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={addHandler}
            >
              <TextField
                required
                fullWidth
                label="NIS"
                sx={{ mb: 2 }}
                value={nis}
                onChange={(e) => setNis(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Nama"
                sx={{ mb: 2 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tingkat</InputLabel>
                <Select
                  value={grade}
                  label="Tingkat"
                  onChange={(e) => setGrade(e.target.value)}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade._id} value={grade.grade}>
                      {grade.grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel>Kelas</InputLabel>
                <Select
                  value={kelas}
                  label="Kelas"
                  onChange={(e) => setKelas(e.target.value)}
                >
                  {classes.map((item) => (
                    <MenuItem key={item._id} value={item.class}>
                      {item.class}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                label="Username"
                sx={{ mb: 2 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Button variant="contained" color="success" type="submit">
                  Tambahkan
                </Button>
                <Button variant="contained" color="error" onClick={close}>
                  batalkan
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Add;
