import {
  GET_NEWS_FAIL,
  GET_NEWS_REQ,
  GET_NEWS_SUCCESS,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_REQ,
  NEWS_DELETE_RESET,
  NEWS_DELETE_SUCCESS,
  NEWS_DETAIL_FAIL,
  NEWS_DETAIL_REQ,
  NEWS_DETAIL_SUCCESS,
  NEWS_FAIL,
  NEWS_REQ,
  NEWS_RESET,
  NEWS_SUCCESS,
  NEWS_UPDATE_FAIL,
  NEWS_UPDATE_REQ,
  NEWS_UPDATE_RESET,
  NEWS_UPDATE_SUCCESS,
} from "./news_const";

export const getNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NEWS_REQ:
      return { loading: true };

    case GET_NEWS_SUCCESS:
      return { loading: false, allNews: action.payload };

    case GET_NEWS_FAIL:
      return { loading: false, errorNews: action.payload };

    default:
      return state;
  }
};

export const createNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_REQ:
      return { loading: true };

    case NEWS_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case NEWS_FAIL:
      return { loading: false, error: action.payload };

    case NEWS_RESET:
      return { loading: false };

    default:
      return state;
  }
};

export const upDelNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_UPDATE_REQ:
    case NEWS_DELETE_REQ:
      return { loading: true };

    case NEWS_UPDATE_SUCCESS:
      return { loading: false, isUpdated: true, message: action.payload };

    case NEWS_DELETE_SUCCESS:
      return { loading: false, isDeleted: true, message: action.payload };

    case NEWS_UPDATE_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case NEWS_DELETE_FAIL:
      return { loading: false, isDeleted: false, error: action.payload };

    case NEWS_DELETE_RESET:
      return { loading: false };

    case NEWS_UPDATE_RESET:
      return { loading: false };

    default:
      return state;
  }
};

export const detailNewsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_DETAIL_REQ:
      return { loading: true };

    case NEWS_DETAIL_SUCCESS:
      return { loading: false, detail: action.payload };

    case NEWS_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
