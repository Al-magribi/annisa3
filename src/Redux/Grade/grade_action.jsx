import axios from "axios";
import {
  GRADE_DELETE_FAIL,
  GRADE_DELETE_REQ,
  GRADE_DELETE_SUCCESS,
  GRADE_FAIL,
  GRADE_REQ,
  GRADE_SUCCESS,
  GET_GRADE_FAIL,
  GET_GRADE_REQ,
  GET_GRADE_SUCCESS,
  STUDENTS_GRADE_FAIL,
  STUDENTS_GRADE_REQ,
  STUDENTS_GRADE_SUCCESS,
} from "./grade_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

// MENAMPILKAN SELURUH TINGKAT
export const getGrades = () => async (dispatch) => {
  try {
    dispatch({ type: GET_GRADE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get("/api/grade/get-grade", config);

    dispatch({ type: GET_GRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_GRADE_FAIL, payload: error.message });
  }
};

// MENAMBAHKAN KELAS
export const addGrade = (dataGrade) => async (dispatch) => {
  try {
    dispatch({ type: GRADE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/grade/create",
      dataGrade,
      config
    );

    dispatch({ type: GRADE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: GRADE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// MENAMPILKAN SELURUH SISWA DALAM KELAS
export const getStudentInGrade = (grade) => async (dispatch) => {
  try {
    dispatch({ type: STUDENTS_GRADE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/grade/${grade}`, config);

    dispatch({ type: STUDENTS_GRADE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENTS_GRADE_FAIL,
      payload: error.message,
    });
  }
};

// MENGHAPUS TINGKAT
export const deleteGrade = (id) => async (dispatch) => {
  try {
    dispatch({ type: GRADE_DELETE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(`/api/grade/delete/${id}`, config);

    dispatch({ type: GRADE_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: GRADE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
