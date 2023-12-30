import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import { useDispatch, useSelector } from "react-redux";
import { login, logoutUser } from "../../Redux/User/user_action";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

const Admin = () => {
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

    dispatch(login(username, password));
  };

  useEffect(() => {
    if (auth) {
      navigate("/admin-dashboard");
    } else {
      toast.error(error);
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
      <Title title='Admin - Login' />

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
              src='https://cdni.iconscout.com/illustration/premium/thumb/admin-services-4500540-3804451.png'
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
                type='text'
                sx={{ m: 2 }}
                fullWidth
                label='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                type='password'
                sx={{ m: 2 }}
                fullWidth
                label='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='success'
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

export default Admin;
