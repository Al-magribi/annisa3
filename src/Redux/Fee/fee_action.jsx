import axios from "axios";
import {
  CREATE_FEE_FAIL,
  CREATE_FEE_REQ,
  CREATE_FEE_SUCCESS,
  DELETE_FEE_FAIL,
  DELETE_FEE_REQ,
  DELETE_FEE_SUCCESS,
  DETAIL_FEE_FAIL,
  DETAIL_FEE_REQ,
  DETAIL_FEE_SUCCESS,
  GET_FEE_FAIL,
  GET_FEE_REQ,
  GET_FEE_SUCCESS,
  UPDATE_FEE_FAIL,
  UPDATE_FEE_REQ,
  UPDATE_FEE_SUCCESS,
} from "./fee_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

// MENAMBAG PEMBAYARAN
export const createFee = (feeData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FEE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post("/api/fee/create", feeData, config);

    dispatch({ type: CREATE_FEE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: CREATE_FEE_FAIL, payload: error.message });
  }
};

// MENAMPILKAN SELURUH PEMABAYARAN
export const getFee = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FEE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get("/api/fee/all", config);

    dispatch({ type: GET_FEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_FEE_FAIL, payload: error.message });
  }
};

// MENGHAPUS PEMBAYARAN
export const deleteFee = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FEE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(`/api/fee/delete/${id}`, config);

    dispatch({ type: DELETE_FEE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_FEE_FAIL, payload: error.message });
  }
};

// DETAIL PEMBAYARAN
export const getFeeDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_FEE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/fee/${id}`, config);

    dispatch({ type: DETAIL_FEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_FEE_FAIL, payload: error.message });
  }
};

// UPDATE PEMBAYARAN
export const updateFee = (id, feeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FEE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/fee/update/${id}`,
      feeData,
      config
    );

    dispatch({ type: UPDATE_FEE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPDATE_FEE_FAIL, payload: error.message });
  }
};
