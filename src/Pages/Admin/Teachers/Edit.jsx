import { Box, Fade, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { updateTeacher } from "../../../Redux/User/user_action";
import { UPDATE_TEACHER_RESET } from "../../../Redux/User/user_const";

const Edit = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, detail: teacher } = useSelector(
    (state) => state.detailTeacher
  );

  const { isUpdated, loading: upLoading } = useSelector(
    (state) => state.upDelTeacher
  );

  const [name, setName] = useState("");
  const [mapel, setMapel] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (teacher) {
      setName(teacher?.name);
      setMapel(teacher?.mapel);
      setUsername(teacher?.username);
      setPassword(teacher?.password);
    }
  }, [teacher]);

  useEffect(() => {
    if (isUpdated) {
      setName("");
      setMapel("");
      setUsername("");
      setPassword("");

      close();

      dispatch({ type: UPDATE_TEACHER_RESET });
    }
  }, [isUpdated]);

  const editHandler = (e) => {
    e.preventDefault();

    const id = teacher?._id;
    const data = {
      name: name,
      mapel: mapel,
      username: username,
      password: password,
    };

    dispatch(updateTeacher(id, data));
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
          {loading || upLoading ? (
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
              onSubmit={editHandler}
            >
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label='Nama'
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label='Mapel'
                value={mapel || ""}
                onChange={(e) => setMapel(e.target.value)}
              />

              <TextField
                fullWidth
                sx={{ mb: 2 }}
                label='Username'
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                type='password'
                fullWidth
                sx={{ mb: 2 }}
                label='Password'
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
                <Button variant='contained' color='error' onClick={close}>
                  batalkan
                </Button>

                <Button variant='contained' color='success' type='submit'>
                  Update
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
