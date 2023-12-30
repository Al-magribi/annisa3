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
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { updateUser } from "../../../Redux/User/user_action";

const Edit = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, detail: user } = useSelector((state) => state.detailUser);

  const { loading: updateLoading } = useSelector((state) => state.upDelUser);

  const { grades } = useSelector((state) => state.grades);

  const { classes } = useSelector((state) => state.classes);

  const [name, setName] = useState("");
  const [nis, setNis] = useState("");
  const [grade, setGrade] = useState("");
  const [kelas, setKelas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setNis(user?.nis);
      setGrade(user?.grade);
      setKelas(user?.class);
      setUsername(user?.username);
      setPassword(user?.password);
    }
  }, [user]);

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      nuis: nis,
      name: name,
      grade: grade,
      class: kelas,
      username: username,
      password: password,
    };

    dispatch(updateUser(user?._id, data));
  };

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
          {loading || updateLoading ? (
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
              onSubmit={updateHandler}
            >
              <TextField
                fullWidth
                label="NIS"
                sx={{ mb: 2 }}
                value={nis || ""}
                onChange={(e) => setNis(e.target.value)}
              />
              <TextField
                fullWidth
                label="Nama"
                sx={{ mb: 2 }}
                value={name || ""}
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
                fullWidth
                label="Username"
                sx={{ mb: 2 }}
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                sx={{ mb: 2 }}
                value={password || ""}
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
                  Update
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

export default Edit;
