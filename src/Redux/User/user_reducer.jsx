import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CLEAR_ERROR,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  DELETE_ALL_USER_FAIL,
  DELETE_ALL_USER_REQUEST,
  DELETE_ALL_USER_SUCCESS,
  DELETE_ALL_USER_RESET,
  UPLOAD_RESET,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_FAIL,
  CREATE_TEACHER_RESET,
  DETAIL_TEACHER_REQUEST,
  DETAIL_TEACHER_SUCCESS,
  DETAIL_TEACHER_FAIL,
  DELETE_TEACHER_REQUEST,
  DELETE_ALL_TEACHER_REQUEST,
  UPDATE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_ALL_TEACHER_SUCCESS,
  UPDATE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAIL,
  DELETE_ALL_TEACHER_FAIL,
  UPDATE_TEACHER_FAIL,
  DELETE_TEACHER_RESET,
  DELETE_ALL_TEACHER_RESET,
  UPDATE_TEACHER_RESET,
  GET_ALL_TEACHER_REQUEST,
  GET_ALL_TEACHER_SUCCESS,
  GET_ALL_TEACHER_FAIL,
  UPLOAD_TEACHER_START,
  UPLOAD_TEACHER_SUCCESS,
  UPLOAD_TEACHER_FAILURE,
  UPLOAD_TEACHER_RESET,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_RESET,
  UPDATE_ADMIN_FAIL,
} from "./user_const";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, auth: false };

    case USER_LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        auth: true,
        logout: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
    case LOAD_USER_FAIL:
      return { loading: false, auth: false, error: action.payload };

    case USER_LOGOUT:
      return { loading: false, auth: false, logout: true };

    case CLEAR_ERROR:
      return {};

    default:
      return state;
  }
};

// CREATE
export const createUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { loading: true };

    case CREATE_USER_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CREATE_USER_FAIL:
      return { loading: false, error: action.payload };

    case CREATE_USER_RESET:
      return {};
    default:
      return state;
  }
};

// DETAIL
export const detailUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_USER_REQUEST:
      return { loading: true };

    case DETAIL_USER_SUCCESS:
      return { loading: false, detail: action.payload };

    case DETAIL_USER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// DELETE & UPDATE
export const upDelUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
    case DELETE_ALL_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_ADMIN_REQUEST:
      return { loading: true };

    case DELETE_USER_SUCCESS:
      return { loading: false, isDeleted: true, delMessage: action.payload };

    case DELETE_ALL_USER_SUCCESS:
      return {
        loading: false,
        allDeleted: true,
        allDelmessage: action.payload,
      };

    case UPDATE_USER_SUCCESS:
    case UPDATE_ADMIN_SUCCESS:
      return { loading: false, isUpdated: true, upMessage: action.payload };

    case DELETE_USER_FAIL:
      return {
        loading: false,
        isDeleted: false,
        errorDeleteStudent: action.payload,
      };

    case DELETE_ALL_USER_FAIL:
      return {
        loading: false,
        allDeleted: false,
        errDelAllStudent: action.payload,
      };

    case UPDATE_USER_FAIL:
      return { loading: false, isUpdated: false, errUpStudent: action.payload };

    case UPDATE_ADMIN_FAIL:
      return { loading: false, isUpdated: false, err: action.payload };

    case DELETE_USER_RESET:
      return {};

    case DELETE_ALL_USER_RESET:
      return {};

    case UPDATE_USER_RESET:
    case UPDATE_ADMIN_RESET:
      return {};

    case CLEAR_ERROR:
      return { error: null };

    default:
      return state;
  }
};

// GET STUDENTS
export const getUserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return { loading: true };

    case GET_ALL_USER_SUCCESS:
      return { loading: false, users: action.payload };

    case GET_ALL_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPLOAD STUDENT
export const uploadUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_START:
      return { loading: true };

    case UPLOAD_SUCCESS:
      return { loading: false, upload_success: true, message: action.payload };

    case UPLOAD_FAILURE:
      return { loading: false, errUploadMessage: action.payload };

    case UPLOAD_RESET:
      return {};

    default:
      return state;
  }
};

// TEACHER
// CREATE
export const createTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TEACHER_REQUEST:
      return { loading: true };

    case CREATE_TEACHER_SUCCESS:
      return { loading: false, success: true, teacher: action.payload };

    case CREATE_TEACHER_FAIL:
      return { loading: false, succes: false, error: action.payload };

    case CREATE_TEACHER_RESET:
      return {};
    default:
      return state;
  }
};

// DETAIL
export const detailTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_TEACHER_REQUEST:
      return { loading: true };

    case DETAIL_TEACHER_SUCCESS:
      return { loading: false, detail: action.payload };

    case DETAIL_TEACHER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// DELETE & UPDATE
export const upDelTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TEACHER_REQUEST:
    case DELETE_ALL_TEACHER_REQUEST:
    case UPDATE_TEACHER_REQUEST:
      return { loading: true };

    case DELETE_TEACHER_SUCCESS:
      return { loading: false, isDeleted: true, message: action.payload };

    case DELETE_ALL_TEACHER_SUCCESS:
      return { loading: false, allDeleted: true, message: action.payload };

    case UPDATE_TEACHER_SUCCESS:
      return { loading: false, isUpdated: true, message: action.payload };

    case DELETE_TEACHER_FAIL:
      return {
        loading: false,
        isDeleted: false,
        errorDelTeacher: action.payload,
      };

    case DELETE_ALL_TEACHER_FAIL:
      return {
        loading: false,
        allDeleted: false,
        errDelTeachers: action.payload,
      };

    case UPDATE_TEACHER_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case DELETE_TEACHER_RESET:
      return {};

    case DELETE_ALL_TEACHER_RESET:
      return {};

    case UPDATE_TEACHER_RESET:
      return {};

    case CLEAR_ERROR:
      return { error: null };

    default:
      return state;
  }
};

// GET TEACHER
export const getTeacherReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_TEACHER_REQUEST:
      return { loading: true };

    case GET_ALL_TEACHER_SUCCESS:
      return { loading: false, teachers: action.payload };

    case GET_ALL_TEACHER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPLOAD TEACHER
export const uploadTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_TEACHER_START:
      return { loading: true };

    case UPLOAD_TEACHER_SUCCESS:
      return { loading: false, upload_success: true, message: action.payload };

    case UPLOAD_TEACHER_FAILURE:
      return { loading: false, errUpTeachers: action.payload };

    case UPLOAD_TEACHER_RESET:
      return {};

    default:
      return state;
  }
};
