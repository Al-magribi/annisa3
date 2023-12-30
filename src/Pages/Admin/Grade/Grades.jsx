import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/Loader";
import { red } from "@mui/material/colors";
import {
  addGrade,
  deleteGrade,
  getGrades,
} from "../../../Redux/Grade/grade_action";
import { GRADE_RESET } from "../../../Redux/Grade/grade_const";

const Grades = ({ grades }) => {
  const dispatch = useDispatch();

  const { loading, success, message } = useSelector((state) => state.newGrade);
  const {
    loading: delLoading,
    isDeleted,
    message: delMessage,
  } = useSelector((state) => state.upDelGrade);

  const [grade, setGrade] = useState("");

  const deleteHandler = (id) => {
    dispatch(deleteGrade(id));
  };

  const createHandler = (e) => {
    e.preventDefault();

    const data = {
      grade: grade,
    };

    dispatch(addGrade(data));
  };

  useEffect(() => {
    if (success) {
      toast.success(message);

      dispatch(getGrades());

      setGrade("");

      dispatch({ type: GRADE_RESET });
    }
  }, [dispatch, success, message]);

  useEffect(() => {
    if (isDeleted) {
      toast.success(delMessage);

      dispatch(getGrades());
    }
  }, [dispatch, isDeleted, delMessage]);

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
            label="Tingkat"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
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
                <th>Tingkat</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {grades?.map((item) => (
                <tr key={item._id}>
                  <td>{item.grade}</td>
                  <td>
                    <Box>
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
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Grades;
