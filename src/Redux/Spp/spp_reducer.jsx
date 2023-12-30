import {
  DELETE_ALL_SPP_FAIL,
  DELETE_ALL_SPP_REQ,
  DELETE_ALL_SPP_RESET,
  DELETE_ALL_SPP_SUCCESS,
  CLEAR_ERROR,
  GET_SPP_FAIL,
  GET_SPP_REQ,
  GET_SPP_SUCCESS,
  CREATE_SPP_REQ,
  CREATE_SPP_SUCCESS,
  CREATE_SPP_FAIL,
  CREATE_SPP_RESET,
  DELETE_SPP_REQ,
  DELETE_SPP_SUCCESS,
  DELETE_SPP_FAIL,
  DELETE_SPP_RESET,
  GET_SPP_BY_GRADE_REQ,
  GET_SPP_BY_GRADE_SUCCESS,
  GET_SPP_BY_GRADE_FAIL,
} from "./spp_const";

export const createSppReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SPP_REQ:
      return { loading: true };

    case CREATE_SPP_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CREATE_SPP_FAIL:
      return { loading: false, success: false, error: action.payload };

    case CREATE_SPP_RESET:
      return {};

    default:
      return state;
  }
};

export const getSppReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SPP_REQ:
    case GET_SPP_BY_GRADE_REQ:
      return { loading: true };

    case GET_SPP_SUCCESS:
    case GET_SPP_BY_GRADE_SUCCESS:
      return { loading: false, spp: action.payload };

    case GET_SPP_FAIL:
    case GET_SPP_BY_GRADE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const delSppReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALL_SPP_REQ:
    case DELETE_SPP_REQ:
      return { loading: true };

    case DELETE_ALL_SPP_SUCCESS:
    case DELETE_SPP_SUCCESS:
      return { loading: false, isSppDeleted: true, messageSpp: action.payload };

    case DELETE_ALL_SPP_FAIL:
    case DELETE_SPP_FAIL:
      return { loading: false, isSppDeleted: false, error: action.payload };

    case DELETE_ALL_SPP_RESET:
    case DELETE_SPP_RESET:
      return {};

    case CLEAR_ERROR:
      return { loading: false, isSppDeleted: false, error: {} };
    default:
      return state;
  }
};
