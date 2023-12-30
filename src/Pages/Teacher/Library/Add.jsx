import {
  Box,
  Fade,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addEbook } from "../../../Redux/Ebook/ebook_action";
import { EBOOK_RESET } from "../../../Redux/Ebook/ebook_const";

const Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector((state) => state.newEbook);

  const { userInfo: user } = useSelector((state) => state.userLogin);

  const imageLink =
    "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState(null);
  const [preview, setPreview] = useState(imageLink);

  const imageHandler = (e) => {
    const preview = e.target.files[0];

    if (preview.size > 1024 * 1024) {
      toast.error("Gambar lebih dari 1mb");

      return;
    }

    setPreview(URL.createObjectURL(preview));
    setImage(preview);
  };

  const pdfHandler = (e) => {
    setPdf(e.target.files[0]);
  };

  const addHandler = async (e) => {
    e.preventDefault();

    const data = {
      user: user._id,
      title: title,
      img: image,
      ebook: pdf,
      subject: subject,
      category: category,
    };

    dispatch(addEbook(data));
  };

  useEffect(() => {
    if (success) {
      setTitle("");
      setSubject("");
      setCategory("");
      setPdf("");

      setPreview(imageLink);

      toast.success("Berhasil ditambahkan");

      dispatch({ type: EBOOK_RESET });

      close();
    }
  }, [success, dispatch]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 500 },
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
                label='Judul'
                sx={{ mb: 2 }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                required
                fullWidth
                label='Mapel'
                sx={{ mb: 2 }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={category}
                  label='Kategori'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value='Tugas'>Tugas</MenuItem>
                  <MenuItem value='Bahan Bacaan'>Bahan Bacaan</MenuItem>
                  <MenuItem value='Artikel'>Artikel</MenuItem>
                  <MenuItem value='Novel'>Novel</MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 200 },
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    mt: { xs: 7, md: 0 },
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  <input
                    accept='images/*'
                    id='upload_featured_image'
                    type='file'
                    style={{ display: "none" }}
                    onChange={imageHandler}
                    required
                  />
                  <label htmlFor='upload_featured_image'>
                    <img
                      src={preview}
                      style={{
                        width: "100px",
                        height: "160px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = "0.6"; // Menambahkan efek opacity saat hover
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = "1"; // Mengembalikan opacity ke nilai semula saat tidak dihover
                      }}
                    />
                  </label>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <input
                    accept='.pdf'
                    id='pdf'
                    type='file'
                    onChange={pdfHandler}
                    style={{ display: "none" }}
                    required
                  />
                  <label htmlFor='pdf'>
                    <Button component='span' variant='outlined' color='success'>
                      PDF FILe
                    </Button>
                  </label>

                  <Typography sx={{ mt: 2 }}>
                    {pdf ? pdf.name : "Belum ada file yang dipilih"}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Button variant='contained' color='success' type='submit'>
                  tambah
                </Button>
                <Button variant='contained' color='error' onClick={close}>
                  batalkan
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>

      <ToastContainer />
    </div>
  );
};

export default Add;
