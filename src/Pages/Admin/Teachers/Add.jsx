import { Box, Fade, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeacher } from "../../../Redux/User/user_action";
import Loader from "../Components/Loader";

import { CREATE_TEACHER_RESET } from "../../../Redux/User/user_const";

const Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.newTeacher);

  const [name, setName] = useState("");
  const [mapel, setMapel] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      mapel: mapel,
      username: username,
      password: password,
    };

    dispatch(createTeacher(data));
  };

  useEffect(() => {
    if (success) {
      setName("");
      setMapel("");
      setUsername("");
      setPassword("");

      dispatch({ type: CREATE_TEACHER_RESET });
    } else {
      setName("");
      setMapel("");
      setUsername("");
      setPassword("");

      dispatch({ type: CREATE_TEACHER_RESET });
    }
  }, [success, error]);

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
              onSubmit={addHandler}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                required
                fullWidth
                label="Nama"
                sx={{ mb: 2 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Mapel"
                sx={{ mb: 2 }}
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
              />
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
                  tambah
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
