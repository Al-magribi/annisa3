import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ebooks = () => {
  const navigate = useNavigate();

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { ebooks } = useSelector((state) => state.ebooks);

  const readEbook = (title) => {
    if (user?.role === "admin") {
      navigate(`/admin-ebook/${title}`);
    } else if (user?.role === "guru") {
      navigate(`/teacher-ebook/${title}`);
    } else if (user?.role === "siswa") {
      navigate(`/student-ebook/${title}`);
    } else {
      toast.error("Silahkan login terlebih dahulu");
    }
  };

  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ebooks ? (
        ebooks?.map((item) => (
          <Card key={item._id} sx={{ width: { xs: 150, md: 200 }, m: 1 }}>
            <CardMedia
              sx={{ height: { xs: 180, md: 240 } }}
              image={item.img}
              title="Ebook"
            />
            <CardContent
              sx={{
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontSize={14} textAlign="center">
                {item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="success"
                onClick={() => readEbook(item.title)}
              >
                <ChromeReaderModeOutlinedIcon />
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography>Belum ada eBook yang diunggah</Typography>
      )}

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Ebooks;
