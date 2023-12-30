import axios from "axios";
import {
  ACT_DELETE_FAIL,
  ACT_DELETE_REQ,
  ACT_DELETE_SUCCESS,
  ACT_SUCCESS,
  GET_ACT_FAIL,
  GET_ACT_REQ,
  GET_ACT_SUCCESS,
  ACT_FAIL,
  ACT_REQ,
} from "./act_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const addFeeds = (act) => async (dispatch) => {
  try {
    dispatch({ type: ACT_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosUrl.post("/api/activity/create", act, config);

    dispatch({ type: ACT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ACT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE
export const delFeed = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACT_DELETE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/activity/delete/${id}`,
      config
    );

    dispatch({ type: ACT_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFeeds = (title) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACT_REQ });

    const { data } = await axiosUrl.get(`/api/activity/all?title=${title}`);

    dispatch({ type: GET_ACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ACT_FAIL, payload: error.message });
  }
};
