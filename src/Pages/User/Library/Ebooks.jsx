import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import { red, yellow } from "@mui/material/colors";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Ebooks = () => {
  const dispatch = useDispatch();

  const { ebooks } = useSelector((state) => state.ebooks);

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
            <th>Guru</th>
            <th>Mapel</th>
            <th>Kategori</th>
            <th>opsi</th>
          </tr>
        </thead>
        <tbody>
          {ebooks?.map((item) => (
            <tr key={item._id}>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 160,
                  }}
                >
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
              <td>{item.title}</td>
              <td>{item.user.name}</td>
              <td>{item.subject}</td>
              <td>{item.category}</td>

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
                      bgcolor: yellow[800],
                      color: "whitesmoke",
                      "&:hover": { bgcolor: yellow[900] },
                    }}
                    component={Link}
                    to={`/student-ebook/${item.title}`}
                  >
                    <ChromeReaderModeOutlinedIcon />
                  </IconButton>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};
export default Ebooks;
