import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQ,
  CREATE_PAYMENT_RESET,
  CREATE_PAYMENT_SUCCESS,
  DETAIL_PAYMENT_FAIL,
  DETAIL_PAYMENT_REQ,
  DETAIL_PAYMENT_SUCCESS,
  GET_ALL_PAYMENT_FAIL,
  GET_ALL_PAYMENT_REQ,
  GET_ALL_PAYMENT_SUCCESS,
  GET_REPORT_PAYMENT_FAIL,
  GET_REPORT_PAYMENT_REQ,
  GET_REPORT_PAYMENT_SUCCESS,
  GET_TOKEN_FAIL,
  GET_TOKEN_REQ,
  GET_TOKEN_SUCCESS,
  MY_PAYMENT_FAIL,
  MY_PAYMENT_REQ,
  MY_PAYMENT_SUCCESS,
} from "./payment_const";

// MEMBUAT PAYMENT
export const createPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQ:
      return { loading: true };

    case CREATE_PAYMENT_SUCCESS:
      return { loading: false, payment: action.payload };

    case CREATE_PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    case CREATE_PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

// Token
export const getTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOKEN_REQ:
      return { loading: true };

    case GET_TOKEN_SUCCESS:
      return { loading: false, success: true, token: action.payload };

    case GET_TOKEN_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

// MENAMPILKAN SELURUH PAYMENT => ADMIN
export const getPaymentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PAYMENT_REQ:
      return { loading: true };

    case GET_ALL_PAYMENT_SUCCESS:
      return { loading: false, payments: action.payload };

    case GET_ALL_PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getReportPaymentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REPORT_PAYMENT_REQ:
      return { loading: true };

    case GET_REPORT_PAYMENT_SUCCESS:
      return { loading: false, payments: action.payload };

    case GET_REPORT_PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// MENAMPILKAN SELURUH PEMBAYARAN SAYA
export const myPaymentReducer = (state = [], action) => {
  switch (action.type) {
    case MY_PAYMENT_REQ:
      return { loading: true };

    case MY_PAYMENT_SUCCESS:
      return { loading: false, payments: action.payload };

    case MY_PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// MENAMPILKAN DETAIL PEMBAYARA
export const detailPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case DETAIL_PAYMENT_REQ:
      return { loading: true };

    case DETAIL_PAYMENT_SUCCESS:
      return { loading: false, detail: action.payload };

    case DETAIL_PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
