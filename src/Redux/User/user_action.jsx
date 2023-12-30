import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DETAIL_USER_FAIL,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGOUT,
  DELETE_ALL_USER_REQUEST,
  DELETE_ALL_USER_FAIL,
  UPLOAD_FAILURE,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  CREATE_TEACHER_FAIL,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  DETAIL_TEACHER_FAIL,
  DETAIL_TEACHER_REQUEST,
  DETAIL_TEACHER_SUCCESS,
  DELETE_TEACHER_FAIL,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  GET_ALL_TEACHER_FAIL,
  GET_ALL_TEACHER_REQUEST,
  GET_ALL_TEACHER_SUCCESS,
  UPLOAD_TEACHER_START,
  UPLOAD_TEACHER_SUCCESS,
  UPLOAD_TEACHER_FAILURE,
  DELETE_ALL_TEACHER_REQUEST,
  DELETE_ALL_TEACHER_SUCCESS,
  DELETE_ALL_TEACHER_FAIL,
  UPDATE_TEACHER_FAIL,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
} from "./user_const";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_URL });

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/user/admin/login",
      { username, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/user/login",
      { username, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LOGOUT
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
};

// LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/user/profile`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

// CREATE
export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post("/api/user/create", userData, config);

    dispatch({ type: CREATE_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DETAIL
export const detailUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/user/student/${id}`, config);

    dispatch({ type: DETAIL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DETAIL_USER_FAIL,
      payload: error.message,
    });
  }
};

// UPDATE
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/user/student/update/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.messagey
          : error.message,
    });
  }
};

// Update Admin Profile
export const updateAdmin = (id, adminData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADMIN_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/user/admin/update-profile/${id}`,
      adminData,
      config
    );

    dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_FAIL, payload: error.message });
  }
};

// DELETE
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/user/student/delete/${id}`,
      config
    );

    dispatch({ type: DELETE_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET STUDENTS
export const getStudents = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(
      `/api/user/students/all?name=${name}`,
      config
    );

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.students });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE ALL STUDENTS
export const delAllStudent = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ALL_USER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete("/api/user/students/delete", config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DELETE_ALL_USER_FAIL,
      payload: error.message,
    });
  }
};

// UPLOAD STUDENTS
export const upStudents = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_START });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/vnd.ms-excel",
      },
    };

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosUrl.post("/api/user/upload", formData, config);

    dispatch({ type: UPLOAD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPLOAD_FAILURE,
      payload: error.message,
    });
  }
};

// TEACHER
// CREATE
export const createTeacher = (dataTeacher) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TEACHER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/user/teacher/create",
      dataTeacher,
      config
    );

    dispatch({ type: CREATE_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: CREATE_TEACHER_FAIL, payload: error.message });
  }
};

// MENAMPILKAN SEMUA GURU
export const getTeachers = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEACHER_REQUEST });

    const { data } = await axiosUrl.get(`/api/user/teachers-all?name=${name}`);

    dispatch({ type: GET_ALL_TEACHER_SUCCESS, payload: data.teachers });
  } catch (error) {
    dispatch({ type: GET_ALL_TEACHER_FAIL, payload: error.message });
  }
};

export const detailTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_TEACHER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/user/teacher/${id}`, config);

    dispatch({ type: DETAIL_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DETAIL_TEACHER_FAIL, payload: error.message });
  }
};

export const updateTeacher = (id, teacherData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEACHER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/user/teacher/update/${id}`,
      teacherData,
      config
    );

    dispatch({ type: UPDATE_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPDATE_TEACHER_FAIL, payload: error.message });
  }
};

export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEACHER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete(
      `/api/user/teacher/delete/${id}`,
      config
    );

    dispatch({ type: DELETE_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_TEACHER_FAIL, payload: error.message });
  }
};

export const upTeachers = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_TEACHER_START });

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
      "/api/user/teacher/upload",
      formData,
      config
    );

    dispatch({ type: UPLOAD_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPLOAD_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};

export const delAllTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ALL_TEACHER_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.delete("/api/user/teachers/delete", config);

    dispatch({ type: DELETE_ALL_TEACHER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DELETE_ALL_TEACHER_FAIL,
      payload: error.message,
    });
  }
};
