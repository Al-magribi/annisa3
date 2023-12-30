import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  addClass,
  deleteClass,
  detailClass,
  editClass,
  getClasses,
} from "../../../Redux/Class/class_action";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/Loader";
import { blue, red } from "@mui/material/colors";
import {
  CLASS_DELETE_RESET,
  CLASS_RESET,
  CLASS_UPDATE_RESET,
} from "../../../Redux/Class/class_const";

const Classes = ({ classes }) => {
  const dispatch = useDispatch();

  const { loading, success, message } = useSelector((state) => state.newClass);
  const { detail, loading: detail_loading } = useSelector(
    (state) => state.detailClass
  );
  const {
    laoding: updel_loading,
    isUpdated,
    isDeleted,
    upMessage,
    delMessage,
    upError,
    delError,
  } = useSelector((state) => state.upDelClass);

  const [class_name, setClassName] = useState("");

  const [edit, setEdit] = useState(false);
  const [udpate_class, setUpdate] = useState("");

  const createHandler = (e) => {
    e.preventDefault();

    const data = {
      class: class_name,
    };

    dispatch(addClass(data));
  };

  const showEdit = (id) => {
    setEdit(true);
    dispatch(detailClass(id));
  };

  const editHandler = (e) => {
    e.preventDefault();

    const data = {
      class: udpate_class,
    };

    dispatch(editClass(detail?._id, data));
  };

  const deleteHandler = (id) => {
    dispatch(deleteClass(id));
  };
  useEffect(() => {
    if (detail) {
      setUpdate(detail?.class);
    }

    if (isUpdated) {
      toast.success(upMessage);

      dispatch(getClasses());

      setEdit(false);

      dispatch({ type: CLASS_UPDATE_RESET });
    } else {
      toast.error(upError);

      dispatch({ type: CLASS_UPDATE_RESET });
    }

    if (isDeleted) {
      toast.success(delMessage);

      dispatch(getClasses());

      dispatch({ type: CLASS_DELETE_RESET });
    } else {
      toast.error(delError);

      dispatch({ type: CLASS_DELETE_RESET });
    }
  }, [detail, isUpdated, upMessage, upError, isDeleted, delMessage, delError]);

  useEffect(() => {
    if (success) {
      setClassName("");

      dispatch(getClasses());

      toast.success(message);

      dispatch({ type: CLASS_RESET });
    }
  }, [dispatch, success, message]);

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          onSubmit={createHandler}
        >
          <TextField
            label="Kelas"
            value={class_name}
            onChange={(e) => setClassName(e.target.value)}
          />

          <Button variant="contained" color="primary" type="submit">
            <AddOutlinedIcon />
          </Button>
        </form>
      </Box>

      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box sx={{ height: { xs: 320, md: 530 }, overflow: "auto", m: 1 }}>
          <table className="greenTable">
            <thead>
              <tr>
                <th>Kelas</th>
                <th>opsi</th>
              </tr>
            </thead>
            <tbody>
              {classes?.map((item) => (
                <tr key={item._id}>
                  <td>{item.class}</td>
                  <td>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: blue[500],
                          color: "whitesmoke",
                          "&:hover": { bgcolor: blue[800] },
                        }}
                        onClick={() => showEdit(item._id)}
                      >
                        <MoreVertOutlinedIcon />
                      </IconButton>

                      <IconButton
                        sx={{
                          bgcolor: red[500],
                          color: "whitesmoke",
                          "&:hover": { bgcolor: red[800] },
                        }}
                        onClick={() => deleteHandler(item._id)}
                      >
                        <RemoveOutlinedIcon />
                      </IconButton>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={edit}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 400 },
              bgcolor: "#ffff",

              p: 2,
              display: "flex",
              alignContent: "center",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            {detail_loading || updel_loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Loader />
              </Box>
            ) : (
              <form
                onSubmit={editHandler}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <TextField
                  label="Kelas"
                  value={udpate_class}
                  onChange={(e) => setUpdate(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ height: 40 }}
                >
                  Update
                </Button>
              </form>
            )}
          </Box>
        </Fade>
      </Modal>

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Classes;
