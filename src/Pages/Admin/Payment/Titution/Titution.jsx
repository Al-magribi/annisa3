import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Add from "./Add";
import { useDispatch, useSelector } from "react-redux";
import { getGrades } from "../../../../Redux/Grade/grade_action";
import List_Titution from "./List_Titution";
import { getSpp } from "../../../../Redux/Spp/spp_action";
import { DELETE_SPP_RESET } from "../../../../Redux/Spp/spp_const";

const Titution = () => {
  const dispatch = useDispatch();

  const { grades } = useSelector((state) => state.grades);
  const { success } = useSelector((state) => state.newSpp);
  const { spp } = useSelector((state) => state.spp);
  const { error, isSppDeleted, messageSpp } = useSelector(
    (state) => state.delSpp
  );

  useEffect(() => {
    dispatch(getGrades());

    dispatch(getSpp());

    if (success) {
      dispatch(getSpp());
    }

    if (isSppDeleted) {
      dispatch(getSpp());

      dispatch({ type: DELETE_SPP_RESET });
    } else {
      dispatch({ type: DELETE_SPP_RESET });
    }
  }, [dispatch, success, isSppDeleted, error, messageSpp]);

  return (
    <Box
      sx={{
        flex: 1,
        p: 1,
        height: "97.5%",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "96%", boxShadow: 4, borderRadius: 2, p: 1 }}>
        <Add grades={grades} />

        <List_Titution list={spp} />
      </Box>
    </Box>
  );
};

export default Titution;
