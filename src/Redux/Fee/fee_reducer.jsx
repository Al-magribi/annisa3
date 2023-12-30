import {
  CREATE_FEE_FAIL,
  CREATE_FEE_REQ,
  CREATE_FEE_RESET,
  CREATE_FEE_SUCCESS,
  DELETE_FEE_FAIL,
  DELETE_FEE_REQ,
  DELETE_FEE_RESET,
  DELETE_FEE_SUCCESS,
  DETAIL_FEE_FAIL,
  DETAIL_FEE_REQ,
  DETAIL_FEE_SUCCESS,
  GET_FEE_FAIL,
  GET_FEE_REQ,
  GET_FEE_SUCCESS,
  UPDATE_FEE_FAIL,
  UPDATE_FEE_REQ,
  UPDATE_FEE_RESET,
  UPDATE_FEE_SUCCESS,
} from "./fee_const";

export const createFeeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FEE_REQ:
      return { loading: true };

    case CREATE_FEE_SUCCESS:
      return { loading: false, success: true, fee: action.payload };

    case CREATE_FEE_FAIL:
      return { loading: false, success: false, error: action.payload };

    case CREATE_FEE_RESET:
      return {};

    default:
      return state;
  }
};

export const getFeeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FEE_REQ:
      return { loading: true };

    case GET_FEE_SUCCESS:
      return { loading: false, fee: action.payload };

    case GET_FEE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// MENGAHPAUS PEMBAYARAN
export const upDelFeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FEE_REQ:
    case UPDATE_FEE_REQ:
      return { loading: true };

    case DELETE_FEE_SUCCESS:
      return { loading: false, isDeleted: true, messageFee: action.payload };

    case UPDATE_FEE_SUCCESS:
      return { loading: false, isUpdated: true, messageFee: action.payload };

    case DELETE_FEE_FAIL:
      return { loading: false, isDeleted: false, error: action.payload };

    case UPDATE_FEE_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case DELETE_FEE_RESET:
      return {};

    case UPDATE_FEE_RESET:
      return {};

    default:
      return state;
  }
};

// DETAIL PEMBAYARAN
export const getDetailFeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_FEE_REQ:
      return { loading: true };

    case DETAIL_FEE_SUCCESS:
      return { loading: false, detail: action.payload };

    case DETAIL_FEE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
