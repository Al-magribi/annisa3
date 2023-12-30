import React from "react";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { red } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delFeed } from "../../../Redux/Act/act_action";

const Feeds = () => {
  const dispatch = useDispatch();

  const { allActs: feeds } = useSelector((state) => state.Acts);

  const deleteHandler = (id) => dispatch(delFeed(id));

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
            <th>opsi</th>
          </tr>
        </thead>
        <tbody>
          {feeds?.map((item) => (
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
    </Box>
  );
};

export default Feeds;
