import {
  CLEAR_EXAM_ERROR,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_REQ,
  CREATE_EXAM_RESET,
  CREATE_EXAM_SUCCESS,
  DELETE_ALL_EXAM_FAIL,
  DELETE_ALL_EXAM_REQ,
  DELETE_ALL_EXAM_RESET,
  DELETE_ALL_EXAM_SUCCESS,
  DELETE_EXAM_FAIL,
  DELETE_EXAM_REQ,
  DELETE_EXAM_RESET,
  DELETE_EXAM_SUCCESS,
  DETAIL_EXAM_FAIL,
  DETAIL_EXAM_REQ,
  DETAIL_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_REQ,
  GET_EXAM_SUCCESS,
  LOGGED_USER_FAIL,
  LOGGED_USER_REQ,
  LOGGED_USER_RESET,
  LOGGED_USER_SUCCESS,
  RESET_USER,
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
  UNLOCK_USER_RESET,
  UNLOCK_USER_SUCCESS,
  UPDATE_EXAM_FAIL,
  UPDATE_EXAM_REQ,
  UPDATE_EXAM_RESET,
  UPDATE_EXAM_SUCCESS,
} from "./exam_const";

export const createExamReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EXAM_REQ:
      return { loading: true };

    case CREATE_EXAM_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CREATE_EXAM_FAIL:
      return { loading: false, success: false, error: action.payload };

    case CREATE_EXAM_RESET:
      return {};

    default:
      return state;
  }
};

export const getExamsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXAM_REQ:
    case TEACHER_EXAM_REQ:
      return { loading: true };

    case GET_EXAM_SUCCESS:
    case TEACHER_EXAM_SUCCESS:
      return { loading: false, success: true, exams: action.payload };

    case GET_EXAM_FAIL:
    case TEACHER_EXAM_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export const detailExamReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_EXAM_REQ:
    case START_EXAM_REQ:
      return { loading: true };

    case DETAIL_EXAM_SUCCESS:
      return { loading: false, detail: action.payload, detail_success: true };

    case START_EXAM_SUCCESS:
      return { loading: false, start: true, detail: action.payload };

    case DETAIL_EXAM_FAIL:
    case START_EXAM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const upDelExamReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXAM_REQ:
    case UPDATE_EXAM_REQ:
    case DELETE_ALL_EXAM_REQ:
      return { loading: true };

    case DELETE_EXAM_SUCCESS:
      return { loading: false, isDeleted: true, deleteMessage: action.payload };

    case UPDATE_EXAM_SUCCESS:
      return { loading: false, isUpdated: true, updateMessage: action.payload };

    case DELETE_ALL_EXAM_SUCCESS:
      return {
        loading: false,
        delALLExam: true,
        deleteAllMessage: action.payload,
      };

    case DELETE_EXAM_FAIL:
      return { loading: true, isDeleted: false, deleteError: action.payload };

    case UPDATE_EXAM_FAIL:
      return { loading: true, isDeleted: false, updateError: action.payload };

    case DELETE_ALL_EXAM_FAIL:
      return {
        loading: false,
        delALLExam: true,
        deleteAllError: action.payload,
      };

    case DELETE_EXAM_RESET:
      return {};

    case UPDATE_EXAM_RESET:
      return {};

    case DELETE_ALL_EXAM_RESET:
      return {};

    case CLEAR_EXAM_ERROR:
      return {};

    default:
      return state;
  }
};

// SISWA
export const studentExamsReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_EXAM_REQUEST:
      return { loading: true };

    case STUDENT_EXAM_SUCCESS:
      return { loading: false, myExams: action.payload };

    case STUDENT_EXAM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// LOGGED USER
export const LoggedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_USER_REQ:
      return { loading: true };

    case LOGGED_USER_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case LOGGED_USER_FAIL:
      return { loading: false, success: false, message: action.payload };

    case LOGGED_USER_RESET:
      return {};

    case CLEAR_EXAM_ERROR:
      return {};

    default:
      return state;
  }
};

// UNLOCK USER
export const unlockUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UNLOCK_USER_REQ:
      return { unlockLoading: true };

    case UNLOCK_USER_SUCCESS:
      return { unlockLoading: false, unlock: true, unlockMsg: action.payload };

    case UNLOCK_USER_FAIL:
      return { unlockLoading: false, unlock: false, unlockMsg: action.payload };

    case UNLOCK_USER_RESET:
      return {};

    case CLEAR_EXAM_ERROR:
      return {};

    default:
      return state;
  }
};

// RESET USER
export const resetUserReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_USER_REQ:
      return { resetLoading: true };

    case RESET_USER_SUCCESS:
      return { resetLoading: false, reset: true, resetMsg: action.payload };

    case RESET_USER_FAIL:
      return { resetLoading: false, reset: false, resetMsg: action.payload };

    case RESET_USER:
      return {};

    case CLEAR_EXAM_ERROR:
      return {};

    default:
      return state;
  }
};
