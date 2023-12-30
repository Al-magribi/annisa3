import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Add from "./Add";
import { useDispatch, useSelector } from "react-redux";
import { getFee } from "../../../../Redux/Fee/fee_action";
import List_fee from "./List_fee";
import {
  CREATE_FEE_RESET,
  DELETE_FEE_RESET,
} from "../../../../Redux/Fee/fee_const";

const Fee = () => {
  const dispatch = useDispatch();

  const { fee } = useSelector((state) => state.fee);

  const { isDeleted } = useSelector((state) => state.upDelFee);

  const { success } = useSelector((state) => state.newFee);

  useEffect(() => {
    dispatch(getFee());

    if (isDeleted) {
      dispatch(getFee());

      dispatch({ type: DELETE_FEE_RESET });
    }

    if (success) {
      dispatch(getFee());

      dispatch({ type: CREATE_FEE_RESET });
    }
  }, [dispatch, isDeleted, success]);
  return (
    <Box sx={{ flex: 1, p: 1, height: "97.5%", overflow: "auto" }}>
      <Box sx={{ width: "96%", boxShadow: 4, borderRadius: 2, p: 1 }}>
        <Add />

        <List_fee fee={fee} />
      </Box>
    </Box>
  );
};

export default Fee;
