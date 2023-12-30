import axios from "axios";
import {
  GET_NEWS_FAIL,
  GET_NEWS_REQ,
  GET_NEWS_SUCCESS,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_REQ,
  NEWS_DELETE_SUCCESS,
  NEWS_DETAIL_REQ,
  NEWS_DETAIL_SUCCESS,
  NEWS_FAIL,
  NEWS_REQ,
  NEWS_SUCCESS,
  NEWS_UPDATE_FAIL,
  NEWS_UPDATE_REQ,
  NEWS_UPDATE_SUCCESS,
} from "./news_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const getNews = (title) => async (dispatch) => {
  try {
    dispatch({ type: GET_NEWS_REQ });

    const { data } = await axiosUrl.get(`/api/news/all?title=${title}`);

    dispatch({ type: GET_NEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NEWS_FAIL, payload: error.message });
  }
};

export const addNews = (news) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosUrl.post("/api/news/create", news, config);

    dispatch({ type: NEWS_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const delNews = (id) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_DELETE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/news/delete/${id}`,

      config
    );

    dispatch({ type: NEWS_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: NEWS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailNews = (title) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_DETAIL_REQ });

    const { data } = await axiosUrl.get(`/api/news/${title}`);

    dispatch({ type: NEWS_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEWS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNews = (id, dataUpdate) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_UPDATE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/news/update/${id}`,
      dataUpdate,
      config
    );

    dispatch({ type: NEWS_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: NEWS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
