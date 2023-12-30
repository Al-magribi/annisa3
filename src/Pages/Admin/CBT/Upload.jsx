import { Box, Fade, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Components/Loader";
import { UPLOAD_RESET } from "../../../Redux/User/user_const";
import { uploadQuestion } from "../../../Redux/Question/question_action";

const Upload = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, upload_success, errUploadMessage, message } = useSelector(
    (state) => state.uploadQuestion
  );

  const { detail: exam } = useSelector((state) => state.detailExam);

  const [file, setFile] = useState(false);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = () => {
    if (file === false) {
      toast.error("Pilih file terlebih dahulu");
    } else {
      dispatch(uploadQuestion(exam._id, file));
    }
  };

  useEffect(() => {
    if (upload_success) {
      toast.success(message);

      dispatch({ type: UPLOAD_RESET });
      close();
    } else {
      errUploadMessage;
    }
  }, [upload_success, errUploadMessage, message]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Input required fullWidth type="file" onChange={fileHandler} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={uploadHandler}
                >
                  Upload
                </Button>
                <Button variant="contained" color="error" onClick={close}>
                  batalkan
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Upload;
