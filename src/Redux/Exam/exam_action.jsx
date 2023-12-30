import axios from "axios";
import {
  CREATE_EXAM_FAIL,
  CREATE_EXAM_REQ,
  CREATE_EXAM_SUCCESS,
  DELETE_ALL_EXAM_FAIL,
  DELETE_ALL_EXAM_REQ,
  DELETE_ALL_EXAM_SUCCESS,
  DELETE_EXAM_FAIL,
  DELETE_EXAM_REQ,
  DELETE_EXAM_SUCCESS,
  DETAIL_EXAM_FAIL,
  DETAIL_EXAM_REQ,
  DETAIL_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_REQ,
  GET_EXAM_SUCCESS,
  LOGGED_USER_FAIL,
  LOGGED_USER_REQ,
  LOGGED_USER_SUCCESS,
  RESET_USER_FAIL,
  RESET_USER_REQ,
  RESET_USER_SUCCESS,
  START_EXAM_FAIL,
  START_EXAM_REQ,
  START_EXAM_SUCCESS,
  STUDENT_EXAM_FAIL,
  STUDENT_EXAM_REQUEST,
  STUDENT_EXAM_SUCCESS,
  TEACHER_EXAM_FAIL,
  TEACHER_EXAM_REQ,
  TEACHER_EXAM_SUCCESS,
  UNLOCK_USER_FAIL,
  UNLOCK_USER_REQ,
  UNLOCK_USER_SUCCESS,
  UPDATE_EXAM_FAIL,
  UPDATE_EXAM_REQ,
  UPDATE_EXAM_SUCCESS,
} from "./exam_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

// MEMBUAT BANK SOAL
export const createExam = (examData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post("/api/exam/create", examData, config);

    dispatch({ type: CREATE_EXAM_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_EXAM_FAIL, payload: error.message });
  }
};

// MENAMPILKAN SELURUH DATA BANK SOAL
export const getExams = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      `/api/exam/get-all?name=${name}`,
      config
    );

    dispatch({ type: GET_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_EXAM_FAIL, payload: error.message });
  }
};

export const getTeacherExams = (name) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      `/api/exam/teacher/my-exam?name=${name}`,
      config
    );

    dispatch({ type: TEACHER_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEACHER_EXAM_FAIL, payload: error.message });
  }
};

// DETAIL BANK SOAL
export const getDetailExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/exam/${id}`, config);

    dispatch({ type: DETAIL_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_EXAM_FAIL, payload: error.message });
  }
};

export const startExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/exam/${id}/start-exam`, config);

    dispatch({ type: START_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: START_EXAM_FAIL, payload: error.message });
  }
};

// MENGUPDATE BANK SOAL
export const updateExam = (id, examData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/exam/update/${id}`,
      examData,
      config
    );

    dispatch({ type: UPDATE_EXAM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPDATE_EXAM_FAIL, payload: error.message });
  }
};

// MENGHAPUS BANK SOAL
export const deleteExam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(`/api/exam/delete/${id}`, config);

    dispatch({
      type: DELETE_EXAM_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({ type: DELETE_EXAM_FAIL, payload: error.message });
  }
};

// MENGHAPUS SELURUH DATA UJIAN
export const deleteAllExams = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ALL_EXAM_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete("/api/exam/delete-all", config);

    dispatch({ type: DELETE_ALL_EXAM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_ALL_EXAM_FAIL, payload: error.message });
  }
};

// SISWA
// MENAMPILKAN SELURUH UJIAN BERDASARKAN TINGKATAN SISWA
export const getStudentsExam = (grade) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_EXAM_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/exam/my-exam/${grade}`, config);

    dispatch({ type: STUDENT_EXAM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STUDENT_EXAM_FAIL, payload: error.message });
  }
};

// LOGGES USER
export const loggedUser = (examId, userId) => async (dispatch) => {
  try {
    dispatch({ type: LOGGED_USER_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      `/api/exam/${examId}/logged-user`,
      userId,
      config
    );

    dispatch({ type: LOGGED_USER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGGED_USER_FAIL, payload: error.message });
  }
};

// UNLOCK USER
export const unlockUser = (examId, userId) => async (dispatch) => {
  try {
    dispatch({ type: UNLOCK_USER_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/exam/${examId}/remove-logged-user/${userId}`,

      config
    );

    dispatch({ type: UNLOCK_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UNLOCK_USER_FAIL, payload: error.message });
  }
};

// RESET USER
export const resetUser = (examId, userId) => async (dispatch) => {
  try {
    dispatch({ type: RESET_USER_REQ });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/exam/${examId}/reset-user/${userId}`,
      config
    );

    dispatch({ type: RESET_USER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: RESET_USER_FAIL, payload: error.message });
  }
};
