import axios from "axios";
import {
  EBOOK_DELETE_FAIL,
  EBOOK_DELETE_REQ,
  EBOOK_DELETE_SUCCESS,
  EBOOK_DETAIL_FAIL,
  EBOOK_DETAIL_REQ,
  EBOOK_DETAIL_SUCCESS,
  EBOOK_FAIL,
  EBOOK_REQ,
  EBOOK_SUCCESS,
  GET_EBOOK_FAIL,
  GET_EBOOK_REQ,
  GET_EBOOK_SUCCESS,
  GET_TEACHER_EBOOK_FAIL,
  GET_TEACHER_EBOOK_REQ,
  GET_TEACHER_EBOOK_SUCCESS,
  READ_EBOOK_FAIL,
  READ_EBOOK_REQ,
  READ_EBOOK_SUCCESS,
} from "./ebook_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const addEbook = (ebook) => async (dispatch) => {
  try {
    dispatch({ type: EBOOK_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosUrl.post("/api/ebook/create", ebook, config);

    dispatch({ type: EBOOK_SUCCESS, paylaod: data.message });
  } catch (error) {
    dispatch({
      type: EBOOK_FAIL,
      payload: error.response.data.error.errors.message,
    });
  }
};

export const getEbook = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: GET_EBOOK_REQ });

    const { data } = await axiosUrl.get(`/api/ebook/all?search=${searchTerm}`);

    dispatch({ type: GET_EBOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_EBOOK_FAIL, payload: error.message });
  }
};

export const getTeacherEbooks = (title) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEACHER_EBOOK_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      `/api/ebook/teacher-ebooks?title=${title}`,
      config
    );

    dispatch({ type: GET_TEACHER_EBOOK_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_TEACHER_EBOOK_FAIL, paylod: error.message });
  }
};

export const detailEbook = (id) => async (dispatch) => {
  try {
    dispatch({ type: EBOOK_DETAIL_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/ebook/detail/${id}`, config);

    dispatch({ type: EBOOK_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EBOOK_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const Read_Ebook = (title) => async (dispatch) => {
  try {
    dispatch({ type: READ_EBOOK_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/ebook/read/${title}`, config);

    dispatch({ type: READ_EBOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: READ_EBOOK_FAIL,
      payload: error.message,
    });
  }
};

export const deleteEbook = (id) => async (dispatch) => {
  try {
    dispatch({ type: EBOOK_DELETE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(`/api/ebook/delete/${id}`, config);

    dispatch({ type: EBOOK_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: EBOOK_DELETE_FAIL,
      payload: error.message,
    });
  }
};
