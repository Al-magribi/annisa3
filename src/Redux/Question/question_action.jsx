import axios from "axios";
import {
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_REQ,
  DELETE_QUESTION_SUCCESS,
  DETAIL_QUESTION_FAILURE,
  DETAIL_QUESTION_START,
  DETAIL_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  UPDATE_QUESTION_REQ,
  UPDATE_QUESTION_SUCCESS,
  UPLOAD_QUESTION_FAILURE,
  UPLOAD_QUESTION_START,
  UPLOAD_QUESTION_SUCCESS,
} from "./question_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const uploadQuestion = (id, file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_QUESTION_START });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/vnd.ms-excel",
      },
    };

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosUrl.post(
      `/api/exam/${id}/question-upload`,
      formData,
      config
    );

    dispatch({ type: UPLOAD_QUESTION_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPLOAD_QUESTION_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getDetailQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_QUESTION_START });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/vnd.ms-excel",
      },
    };

    const { data } = await axiosUrl.get(`/api/exam/question/${id}`, config);

    dispatch({ type: DETAIL_QUESTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_QUESTION_FAILURE, payload: error.message });
  }
};

export const updateQuestion = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUESTION_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/exam/question/update/${id}`,
      updateData,
      config
    );

    dispatch({ type: UPDATE_QUESTION_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_QUESTION_FAIL, payload: error.message });
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUESTION_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/exam/${id}/delete-all-questions`,
      config
    );

    dispatch({
      type: DELETE_QUESTION_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({ type: DELETE_QUESTION_FAIL, payload: error.message });
  }
};
