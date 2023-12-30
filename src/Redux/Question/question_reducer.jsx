import {
  CLEAR_QUESTION_ERROR,
  DELETE_QUESTION_FAIL,
  DELETE_QUESTION_REQ,
  DELETE_QUESTION_RESET,
  DELETE_QUESTION_SUCCESS,
  DETAIL_QUESTION_FAILURE,
  DETAIL_QUESTION_START,
  DETAIL_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAIL,
  UPDATE_QUESTION_REQ,
  UPDATE_QUESTION_RESET,
  UPDATE_QUESTION_SUCCESS,
  UPLOAD_QUESTION_FAILURE,
  UPLOAD_QUESTION_RESET,
  UPLOAD_QUESTION_START,
  UPLOAD_QUESTION_SUCCESS,
} from "./question_const";

export const uploadQuestReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_QUESTION_START:
      return { loading: true };

    case UPLOAD_QUESTION_SUCCESS:
      return { loading: false, upload_success: true, message: action.payload };

    case UPLOAD_QUESTION_FAILURE:
      return { loading: false, errUploadMessage: action.payload };

    case UPLOAD_QUESTION_RESET:
      return {};

    default:
      return state;
  }
};

export const detailQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_QUESTION_START:
      return { loading: true };

    case DETAIL_QUESTION_SUCCESS:
      return { loading: false, detail: action.payload };

    case DETAIL_QUESTION_FAILURE:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};

export const upDelQueReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_QUESTION_REQ:
    case UPDATE_QUESTION_REQ:
      return { loading: true };

    case UPDATE_QUESTION_SUCCESS:
      return { loading: false, isUpdated: true, updateMsg: action.payload };

    case DELETE_QUESTION_SUCCESS:
      return { loading: false, isDeleted: true, message: action.payload };

    case DELETE_QUESTION_FAIL:
      return { loading: true, isDeleted: false, error: action.payload };

    case UPDATE_QUESTION_FAIL:
      return { loading: false, isUpdate: true, updateErr: action.payload };

    case DELETE_QUESTION_RESET:
      return {};

    case UPDATE_QUESTION_RESET:
      return {};

    case CLEAR_QUESTION_ERROR:
      return {};

    default:
      return state;
  }
};
