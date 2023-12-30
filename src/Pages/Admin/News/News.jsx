import React, { useState, useRef } from "react";
import { Box, IconButton, Modal, Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { red, yellow } from "@mui/material/colors";
import Edit from "./Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delNews, detailNews } from "../../../Redux/News/news_action";

const createMarkup = (html) => {
  return { __html: html };
};

const News = () => {
  const dispatch = useDispatch();

  const { allNews: news } = useSelector((state) => state.News);

  const [edit, setEdit] = useState(false);

  const editHandler = (title) => {
    dispatch(detailNews(title));
    setEdit(true);
  };

  const deleteHandler = (id) => dispatch(delNews(id));

  return (
    <Box
      sx={{
        m: 1,
        width: "99%",
        height: { xs: 690, md: 570, xl: 720 },
        overflow: "auto",
      }}
    >
      <table
        className="greenTable"
        width={window.innerWidth < 950 ? "900px" : "100%"}
      >
        <thead>
          <tr>
            <th>Featured Image</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Isi</th>
            <th>opsi</th>
          </tr>
        </thead>
        <tbody>
          {news?.map((item) => (
            <tr key={item._id}>
              <td>
                <Box sx={{ width: 250, height: 130 }}>
                  <img
                    src={item.img}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </td>
              <td width="250px">{item.title}</td>
              <td width="100px">{item.category}</td>
              <td>
                <Box
                  dangerouslySetInnerHTML={createMarkup(
                    item.text.slice(0, window.innerWidth < 950 ? 100 : 1000)
                  )}
                />
              </td>
              <td width="130px">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <IconButton
                    sx={{
                      bgcolor: yellow[700],
                      color: "whitesmoke",
                      "&:hover": { bgcolor: yellow[900] },
                    }}
                    onClick={() => editHandler(item.title)}
                  >
                    <EditNoteOutlinedIcon />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: red[500],
                      color: "whitesmoke",
                      "&:hover": { bgcolor: red[800] },
                    }}
                    onClick={() => deleteHandler(item._id)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />

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
        <div ref={useRef(null)}>
          <Edit open={edit} close={() => setEdit(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default News;
