import {
  Box,
  Fade,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import { updateNews } from "../../../Redux/News/news_action";
import { NEWS_UPDATE_RESET } from "../../../Redux/News/news_const";

const Edit = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, detail: news } = useSelector((state) => state.detailNews);
  const {
    loading: update_loading,
    isUpdated,
    message,
  } = useSelector((state) => state.upDelNews);

  const imageLink =
    "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("umum");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(imageLink);

  const [oldImage, setOldImg] = useState("");

  useEffect(() => {
    if (news) {
      setTitle(news?.title);
      setCategory(news?.category);
      setOldImg(news?.img);
      setText(news?.text);
    }

    if (isUpdated) {
      toast.success(message);

      dispatch({ type: NEWS_UPDATE_RESET });

      close();
    }
  }, [dispatch, news, isUpdated, message]);

  const imageHandler = (e) => {
    const preview = e.target.files[0];

    if (preview.size > 1024 * 1024) {
      toast.error("Gambar lebih dari 1mb");

      return;
    }

    setPreview(URL.createObjectURL(preview));
    setImage(preview);
  };

  const editHandler = (e) => {
    e.preventDefault();

    if (image) {
      const data = {
        title: title,
        category: category,
        text: text,
        img: image,
      };

      dispatch(updateNews(news?._id, data));
    } else {
      const data = {
        title: title,
        category: category,
        img: oldImage,
        text: text,
      };

      dispatch(updateNews(news?._id, data));
    }
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
            width: { xs: 350, md: 900 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {loading || update_loading ? (
            <Box
              sx={{
                width: "100%",
                height: { xs: 700, md: 500 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: { xs: 700, md: 500 },
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box sx={{ flex: 1, p: 1, height: "90%", width: "90%" }}>
                  <TextField
                    fullWidth
                    label='Judul'
                    sx={{ mb: 2 }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <FormControl required fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Kategory</InputLabel>
                    <Select
                      value={category}
                      label='Kategory'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value='umum'>Umum</MenuItem>
                      <MenuItem value='ppdb'>PPDB</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ width: "100%", height: 150, mb: 2 }}>
                    <input
                      accept='.jpg'
                      id='upload_featured_image'
                      type='file'
                      style={{ display: "none" }}
                      onChange={imageHandler}
                    />
                    <label htmlFor='upload_featured_image'>
                      <img
                        src={preview !== imageLink ? preview : oldImage}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
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
                </Box>

                <Box sx={{ flex: 1, p: 1, height: "90%" }}>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCCE_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={text || ""}
                    init={{
                      height: 450,
                      width: "100%",
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      images_upload_url: `${
                        import.meta.env.VITE_URL
                      }/api/images/web-asset/upload`,
                    }}
                    onEditorChange={setText}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  color='error'
                  onClick={close}
                >
                  batalkan
                </Button>

                <Button variant='contained' color='success' type='submit'>
                  update
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Edit;
