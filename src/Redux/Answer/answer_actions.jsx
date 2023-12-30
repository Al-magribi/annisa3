import axios from "axios";
import {
  CREATE_MY_ANSWER_FAIL,
  CREATE_MY_ANSWER_REQ,
  CREATE_MY_ANSWER_SUCCESS,
  CREATE_SCORE_ESSAY_FAIL,
  CREATE_SCORE_ESSAY_REQ,
  CREATE_SCORE_ESSAY_SUCCESS,
  GET_ALL_ANSWER_FAIL,
  GET_ALL_ANSWER_REQ,
  GET_ALL_ANSWER_SUCCESS,
  GET_MY_ANSWER_FAIL,
  GET_MY_ANSWER_REQ,
  GET_MY_ANSWER_SUCCESS,
} from "./answer_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const createAnswer = (answer) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MY_ANSWER_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      `/api/exam/answer/student-answer/save`,
      answer,
      config
    );

    dispatch({ type: CREATE_MY_ANSWER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_MY_ANSWER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const essayScore = (userId, exam, score) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SCORE_ESSAY_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      `api/exam/answer/admin/score-essay/${userId}/${exam}`,
      score,
      config
    );

    dispatch({ type: CREATE_SCORE_ESSAY_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: CREATE_SCORE_ESSAY_FAIL, payload: error.message });
  }
};

export const getMyAnswer = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ANSWER_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get("/api/exam/answer/my-answers", config);

    dispatch({ type: GET_MY_ANSWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_MY_ANSWER_FAIL, payload: error.message });
  }
};

export const getAnswers = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ANSWER_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      `/api/exam/answer/admin/get-all/${id}`,
      config
    );

    dispatch({ type: GET_ALL_ANSWER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_ANSWER_FAIL, payload: error.message });
  }
};
