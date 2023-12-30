import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateAdmin } from "../../../Redux/User/user_action";
import { toast, ToastContainer } from "react-toastify";
import { UPDATE_ADMIN_RESET } from "../../../Redux/User/user_const";
import Loader from "../Components/Loader";

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const { isUpdated, err, upMessage, loading } = useSelector(
    (state) => state.upDelUser
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.user);
      setUsername(user?.username);
    }
  }, [user]);

  const updateHandler = (e) => {
    e.preventDefault();

    if (newPassword) {
      const data = {
        name: name,
        username: username,
        password: newPassword,
      };

      dispatch(updateAdmin(user?._id, data));
    } else {
      const data = {
        name: name,
        username: username,
      };

      dispatch(updateAdmin(user?._id, data));
    }
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(logoutUser());

      toast.success(upMessage);

      dispatch({ type: UPDATE_ADMIN_RESET });
    } else {
      toast.error(err);

      dispatch({ type: UPDATE_ADMIN_RESET });
    }
  }, [dispatch, isUpdated, upMessage, err]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          boxShadow: 4,
          borderRadius: 2,
          width: { xs: "100%", md: "40%" },
          height: "55%",
          p: 3,
        }}
      >
        <Typography variant="h5">Perbarui Data Administrator</Typography>

        {loading ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </Box>
        ) : (
          <form onSubmit={updateHandler}>
            <TextField
              sx={{ mt: 4, mb: 2 }}
              fullWidth
              label="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                mt: 4,
              }}
            >
              <Button variant="contained" color="success" type="submit">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Box>

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Profile;
