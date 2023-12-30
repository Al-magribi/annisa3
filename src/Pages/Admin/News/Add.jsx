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
import { toast } from "react-toastify";
import { addNews } from "../../../Redux/News/news_action";
import { NEWS_RESET } from "../../../Redux/News/news_const";

const Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, success, message, error } = useSelector(
    (state) => state.newNews
  );

  const imageLink =
    "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("umum");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
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

  const addHandler = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      category: category,
      text: text,
      img: image,
    };

    dispatch(addNews(data));
  };

  useEffect(() => {
    if (success) {
      toast.success(message);

      close();

      dispatch({ type: NEWS_RESET });
    } else {
      toast.error(error);

      dispatch({ type: NEWS_RESET });
    }
  }, [success, message, error]);

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
                    src={preview}
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

              <Editor
                apiKey={import.meta.env.VITE_TINYMCCE_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={text}
                init={{
                  height: 300,
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
                  tambah
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Add;
