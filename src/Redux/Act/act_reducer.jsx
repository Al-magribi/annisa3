import {
  ACT_DELETE_FAIL,
  ACT_DELETE_REQ,
  ACT_DELETE_RESET,
  ACT_DELETE_SUCCESS,
  ACT_DETAIL_FAIL,
  ACT_DETAIL_REQ,
  ACT_DETAIL_SUCCESS,
  ACT_FAIL,
  ACT_REQ,
  ACT_RESET,
  ACT_SUCCESS,
  ACT_UPDATE_FAIL,
  ACT_UPDATE_REQ,
  ACT_UPDATE_RESET,
  ACT_UPDATE_SUCCESS,
  CLEAR_ERROR,
  GET_ACT_FAIL,
  GET_ACT_REQ,
  GET_ACT_SUCCESS,
} from "./act_const";

export const getActsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACT_REQ:
      return { loading: true };

    case GET_ACT_SUCCESS:
      return { loading: false, allActs: action.payload };

    case GET_ACT_FAIL:
      return { loading: false, errorAct: action.payload };

    default:
      return state;
  }
};

export const createActReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT_REQ:
      return { loading: true };

    case ACT_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case ACT_FAIL:
      return { loading: false, error: action.payload };

    case ACT_RESET:
      return { loading: false };

    default:
      return state;
  }
};

export const upDelActReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT_UPDATE_REQ:
    case ACT_DELETE_REQ:
      return { loading: true };

    case ACT_UPDATE_SUCCESS:
      return { loading: false, isUpdated: true, message: action.payload };

    case ACT_DELETE_SUCCESS:
      return { loading: false, isDeleted: true, message: action.payload };

    case ACT_UPDATE_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case ACT_DELETE_FAIL:
      return { loading: false, isDeleted: false, error: action.payload };

    case ACT_UPDATE_RESET:
      return { laoding: false };

    case ACT_DELETE_RESET:
      return { laoding: false };

    case CLEAR_ERROR:
      return { error: {} };

    default:
      return state;
  }
};

export const detailActReducer = (state = {}, action) => {
  switch (action.type) {
    case ACT_DETAIL_REQ:
      return { loading: true };

    case ACT_DETAIL_SUCCESS:
      return { loading: false, detail: action.payload };

    case ACT_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
