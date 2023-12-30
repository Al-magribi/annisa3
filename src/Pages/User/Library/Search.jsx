import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { getEbook } from "../../../Redux/Ebook/ebook_action";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
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
      width: "40ch",
    },
  },
}));

const Search_Function = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const searchterm = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    dispatch(getEbook(name));
  }, [dispatch, name]);

  return (
    <Box sx={{ flex: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={searchterm}
        />
      </Search>
    </Box>
  );
};

export default Search_Function;
