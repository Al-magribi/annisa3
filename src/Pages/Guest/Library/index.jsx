import { Box, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "./Banner";
import Ebooks from "./Ebooks";
import { useDispatch } from "react-redux";
import { getEbook } from "../../../Redux/Ebook/ebook_action";
import Title from "../../Title";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderBottom: "1px solid #55ac34",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: 400,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 330,
    },
  },
}));

const Library = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    dispatch(getEbook(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Title title="Perpustakaan" />
      <Navbar />

      <Banner />

      <Box
        sx={{
          minHeight: { xs: 692, md: 496 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            height: 50,
            m: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#55ac34" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
        </Box>

        <Ebooks />
      </Box>

      <Footer />
    </Box>
  );
};

export default Library;
