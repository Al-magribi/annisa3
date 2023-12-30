import {
  EBOOK_DELETE_FAIL,
  EBOOK_DELETE_REQ,
  EBOOK_DELETE_RESET,
  EBOOK_DELETE_SUCCESS,
  EBOOK_DETAIL_FAIL,
  EBOOK_DETAIL_REQ,
  EBOOK_DETAIL_SUCCESS,
  EBOOK_FAIL,
  EBOOK_REQ,
  EBOOK_RESET,
  EBOOK_SUCCESS,
  EBOOK_UPDATE_FAIL,
  EBOOK_UPDATE_REQ,
  EBOOK_UPDATE_RESET,
  EBOOK_UPDATE_SUCCESS,
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

export const addEbook = (state = {}, action) => {
  switch (action.type) {
    case EBOOK_REQ:
      return { loading: true };

    case EBOOK_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case EBOOK_FAIL:
      return { loading: false, success: false, error: action.payload };

    case EBOOK_RESET:
      return { loading: false };

    default:
      return state;
  }
};

export const getEbookReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EBOOK_REQ:
    case GET_TEACHER_EBOOK_REQ:
      return { loading: true };

    case GET_EBOOK_SUCCESS:
    case GET_TEACHER_EBOOK_SUCCESS:
      return { loading: false, ebooks: action.payload };

    case GET_EBOOK_FAIL:
    case GET_TEACHER_EBOOK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const upDelEbookReducer = (state = {}, action) => {
  switch (action.type) {
    case EBOOK_DELETE_REQ:
    case EBOOK_UPDATE_REQ:
      return { loading: true };

    case EBOOK_UPDATE_SUCCESS:
      return { loading: false, isUpdated: true, message: action.payload };

    case EBOOK_DELETE_SUCCESS:
      return { loading: false, isDeleted: true, message: action.payload };

    case EBOOK_DELETE_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case EBOOK_UPDATE_FAIL:
      return { loading: false, isDeleted: false, error: action.payload };

    case EBOOK_UPDATE_RESET:
      return { loading: false };

    case EBOOK_DELETE_RESET:
      return { loading: false };

    default:
      return state;
  }
};

export const detailEbookReducer = (state = {}, action) => {
  switch (action.type) {
    case EBOOK_DETAIL_REQ:
    case READ_EBOOK_REQ:
      return { loading: true };

    case EBOOK_DETAIL_SUCCESS:
    case READ_EBOOK_SUCCESS:
      return { loading: false, detail: action.payload };

    case EBOOK_DETAIL_FAIL:
    case READ_EBOOK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
