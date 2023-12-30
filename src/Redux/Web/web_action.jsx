import axios from "axios";
import {
  WEB_DETAIL_FAIL,
  WEB_DETAIL_REQ,
  WEB_DETAIL_SUCCESS,
  WEB_UPDATE_FAIL,
  WEB_UPDATE_REQ,
  WEB_UPDATE_SUCCESS,
} from "./web_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const getWeb = (id) => async (dispatch) => {
  try {
    dispatch({ type: WEB_DETAIL_REQ });

    const { data } = await axiosUrl.get(`/api/web/${id}`);

    dispatch({ type: WEB_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WEB_DETAIL_FAIL, payload: error.message });
  }
};

export const updateWeb = (id, dataWeb) => async (dispatch) => {
  try {
    dispatch({ type: WEB_UPDATE_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/web/update/${id}`,
      dataWeb,
      config
    );

    dispatch({ type: WEB_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: WEB_UPDATE_FAIL, payload: error.message });
  }
};
