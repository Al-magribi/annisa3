import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../../../Redux/User/user_action";
import { getExams, getTeacherExams } from "../../../Redux/Exam/exam_action";
import { getGrades } from "../../../Redux/Grade/grade_action";

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

  const { success } = useSelector((state) => state.newExam);

  const { isDeleted, delAllExam, isUpdated } = useSelector(
    (state) => state.upDelExam
  );

  const { upload_success } = useSelector((state) => state.uploadQuestion);

  const [name, setName] = useState("");

  const searchterm = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    dispatch(getTeacherExams(name));

    dispatch(getGrades());

    if (success) {
      dispatch(getTeacherExams(name));
    }

    if (isDeleted) {
      dispatch(getTeacherExams(name));
    }

    if (delAllExam) {
      dispatch(getTeacherExams(name));
    }

    if (isUpdated) {
      dispatch(getTeacherExams(name));
    }

    if (upload_success) {
      dispatch(getTeacherExams(name));
    }
  }, [
    dispatch,
    name,
    success,
    isDeleted,
    delAllExam,
    isUpdated,
    upload_success,
  ]);

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
