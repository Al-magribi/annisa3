import axios from "axios";
import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQ,
  CREATE_PAYMENT_SUCCESS,
  GET_ALL_PAYMENT_FAIL,
  GET_ALL_PAYMENT_REQ,
  GET_ALL_PAYMENT_SUCCESS,
  DETAIL_PAYMENT_REQ,
  DETAIL_PAYMENT_SUCCESS,
  DETAIL_PAYMENT_FAIL,
  MY_PAYMENT_REQ,
  MY_PAYMENT_SUCCESS,
  MY_PAYMENT_FAIL,
  GET_TOKEN_FAIL,
  GET_TOKEN_REQ,
  GET_TOKEN_SUCCESS,
  GET_REPORT_PAYMENT_FAIL,
  GET_REPORT_PAYMENT_REQ,
  GET_REPORT_PAYMENT_SUCCESS,
} from "./payment_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

// Get Token
export const getToken = (data_payment) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOKEN_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/payment/transaction",
      data_payment,
      config
    );

    dispatch({ type: GET_TOKEN_SUCCESS, payload: data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_TOKEN_FAIL, payload: error.message });
  }
};

// MEMBUAT PEMBAYARAN
export const createPayment = (payment) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PAYMENT_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/payment/create",
      payment,
      config
    );

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAIL, payload: error.message });
  }
};

// DETAIL PEMBAYARAN
export const getDetailPayment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_PAYMENT_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/payment/my/${id}`, config);

    dispatch({ type: DETAIL_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_PAYMENT_FAIL, payload: error.message });
  }
};

// MENAMPILKAN SEMUA PEMBAYARAN => ADMIN
export const getAllPayment = (start, end) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PAYMENT_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      `/api/payment/admin/data-payment?start=${start}&end=${end}`,
      config
    );

    dispatch({ type: GET_ALL_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_PAYMENT_FAIL, payload: error.message });
  }
};

// Pembayaran siswa
export const getMyPayments = () => async (dispatch) => {
  try {
    dispatch({ type: MY_PAYMENT_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get("/api/payment/my-payment", config);

    dispatch({ type: MY_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_PAYMENT_FAIL, payload: error.response.data.message });
  }
};

// LAPORAN PEMBAYARAN
export const getReportPayments = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REPORT_PAYMENT_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      "/api/payment/admin/all-payment",
      config
    );

    dispatch({ type: GET_REPORT_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REPORT_PAYMENT_FAIL, payload: error.message });
  }
};
