import axios from "axios";
import {
  CREATE_SPP_FAIL,
  CREATE_SPP_REQ,
  CREATE_SPP_SUCCESS,
  DELETE_ALL_SPP_FAIL,
  DELETE_ALL_SPP_REQ,
  DELETE_ALL_SPP_SUCCESS,
  DELETE_SPP_FAIL,
  DELETE_SPP_REQ,
  DELETE_SPP_SUCCESS,
  GET_SPP_BY_GRADE_FAIL,
  GET_SPP_BY_GRADE_REQ,
  GET_SPP_BY_GRADE_SUCCESS,
  GET_SPP_FAIL,
  GET_SPP_REQ,
  GET_SPP_SUCCESS,
} from "./spp_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

// MENAMPILKAN SEMUA DATA SPP
export const getSpp = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SPP_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get("/api/fee/spp-all", config);

    dispatch({ type: GET_SPP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SPP_FAIL, payload: error.message });
  }
};

// Menampilkan SPP BERDASARKAN TINGKATAN
export const getSppByGrade = (grade) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPP_BY_GRADE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/fee/spp-grade/${grade}`, config);

    dispatch({ type: GET_SPP_BY_GRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SPP_BY_GRADE_FAIL, payload: error.message });
  }
};

// MEMBUAT SPP
export const createSpp = (sppData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SPP_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/fee/spp/create",
      sppData,
      config
    );

    dispatch({ type: CREATE_SPP_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: CREATE_SPP_FAIL, payload: error.message });
  }
};

// MENGHAPUS SEMUA DATA SPP
export const deleteAllSpp = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ALL_SPP_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete("/api/fee/spp/delete-all", config);

    dispatch({ type: DELETE_ALL_SPP_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_ALL_SPP_FAIL, patload: error.message });
  }
};

export const deleteSpp = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SPP_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(`/api/fee/spp-delete/${id}`, config);

    console.log(data.message);

    dispatch({ type: DELETE_SPP_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_SPP_FAIL, payload: error.message });
  }
};
