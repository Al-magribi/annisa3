import {
  WEB_DETAIL_FAIL,
  WEB_DETAIL_REQ,
  WEB_DETAIL_SUCCESS,
  WEB_UPDATE_FAIL,
  WEB_UPDATE_REQ,
  WEB_UPDATE_RESET,
  WEB_UPDATE_SUCCESS,
} from "./web_const";

export const webDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case WEB_DETAIL_REQ:
      return { loading: true };

    case WEB_DETAIL_SUCCESS:
      return { loading: false, detail: action.payload };

    case WEB_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const webUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WEB_UPDATE_REQ:
      return { loading: true };

    case WEB_UPDATE_SUCCESS:
      return { loading: false, isUpdated: true, message: action.payload };

    case WEB_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case WEB_UPDATE_RESET:
      return { loading: false };

    default:
      return state;
  }
};
