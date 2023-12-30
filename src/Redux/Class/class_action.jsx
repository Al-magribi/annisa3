import axios from "axios";
import {
  CLASS_DELETE_FAIL,
  CLASS_DELETE_REQ,
  CLASS_DELETE_SUCCESS,
  CLASS_DETAIL_FAIL,
  CLASS_DETAIL_REQ,
  CLASS_DETAIL_SUCCESS,
  CLASS_FAIL,
  CLASS_REQ,
  CLASS_SUCCESS,
  CLASS_UPDATE_SUCCESS,
  CLASS_UPDATE_FAIL,
  CLASS_UPDATE_REQ,
  GET_CLASS_FAIL,
  GET_CLASS_REQ,
  GET_CLASS_SUCCESS,
  STUDENTS_CLASS_FAIL,
  STUDENTS_CLASS_REQ,
  STUDENTS_CLASS_SUCCESS,
} from "./class_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

// MENAMPILKAN SELURUH KELAS
export const getClasses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CLASS_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get("/api/class/get-class", config);

    dispatch({ type: GET_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CLASS_FAIL, payload: error.message });
  }
};

// MENAMBAHKAN KELAS
export const addClass = (classData) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/class/create",
      classData,
      config
    );

    dispatch({ type: CLASS_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CLASS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// MENAMPILKAN SELURUH SISWA DALAM KELAS
export const getStudentInClass = (name) => async (dispatch) => {
  try {
    dispatch({ type: STUDENTS_CLASS_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/class/${name}`, config);

    dispatch({ type: STUDENTS_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENTS_CLASS_FAIL,
      payload: error.message,
    });
  }
};

// MENGHAPUS KELAS
export const deleteClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DELETE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(`/api/class/delete/${id}`, config);

    dispatch({ type: CLASS_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CLASS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DETAIL KELAS
export const detailClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DETAIL_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/class/detail/${id}`, config);

    dispatch({ type: CLASS_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLASS_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//MENGEDIT KELAS
export const editClass = (id, dataClass) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_UPDATE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/class/update/${id}`,
      dataClass,
      config
    );

    dispatch({ type: CLASS_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CLASS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
