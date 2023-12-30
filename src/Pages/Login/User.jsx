import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../../Redux/User/user_action";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import { CLEAR_ERROR } from "../../Redux/User/user_const";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    auth,
    loading,
    userInfo: user,
    error,
  } = useSelector((state) => state.userLogin);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(username, password));
  };

  useEffect(() => {
    if (auth) {
      if (user?.role === "siswa") {
        navigate("/student-dashboard");
      } else {
        navigate("/teacher-dashboard");
      }
    } else {
      toast.error(error);

      dispatch({ type: CLEAR_ERROR });
    }
  }, [auth, user, error]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Title title='User - Login' />
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", boxShadow: 4, borderRadius: "10px" }}>
          <Box
            sx={{
              width: { xs: 350, md: 400 },
              height: { xs: 350, md: 400 },
              display: { xs: "none", md: "flex" },
            }}
          >
            <img
              src='https://cdni.iconscout.com/illustration/premium/thumb/admin-control-panel-4487949-3722637.png'
              alt='admin'
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading='lazy'
            />
          </Box>
          <Box
            sx={{
              width: { xs: 350, md: 400 },
              height: { xs: 350, md: 400 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              onSubmit={loginHandler}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                p: 2,
                width: "95%",
                height: "95%",
              }}
            >
              <TextField
                sx={{ m: 2 }}
                fullWidth
                label='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                sx={{ m: 2 }}
                type='password'
                fullWidth
                label='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                variant='contained'
                color='success'
                type='submit'
              >
                Masuk
              </Button>
            </form>
          </Box>
        </Box>
      )}

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default User;
