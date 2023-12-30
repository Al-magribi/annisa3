import {
  CREATE_MY_ANSWER_FAIL,
  CREATE_MY_ANSWER_REQ,
  CREATE_MY_ANSWER_RESET,
  CREATE_MY_ANSWER_SUCCESS,
  GET_MY_ANSWER_FAIL,
  GET_MY_ANSWER_REQ,
  GET_MY_ANSWER_SUCCESS,
  GET_ALL_ANSWER_FAIL,
  GET_ALL_ANSWER_REQ,
  GET_ALL_ANSWER_SUCCESS,
  CREATE_SCORE_ESSAY_REQ,
  CREATE_SCORE_ESSAY_SUCCESS,
  CREATE_SCORE_ESSAY_FAIL,
  CREATE_SCORE_ESSAY_RESET,
} from "./answer_const";

export const createAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MY_ANSWER_REQ:
      return { loading: true };

    case CREATE_MY_ANSWER_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CREATE_MY_ANSWER_FAIL:
      return { loading: false, error: action.payload };

    case CREATE_MY_ANSWER_RESET:
      return {};

    default:
      return state;
  }
};

export const essayReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SCORE_ESSAY_REQ:
      return { loading: true };

    case CREATE_SCORE_ESSAY_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CREATE_SCORE_ESSAY_FAIL:
      return { loading: false, error: action.payload };

    case CREATE_SCORE_ESSAY_RESET:
      return {};

    default:
      return state;
  }
};

export const myAnswerReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MY_ANSWER_REQ:
      return { loading: true };

    case GET_MY_ANSWER_SUCCESS:
      return { loading: false, myAnswers: action.payload };

    case GET_MY_ANSWER_FAIL:
      return { loading: false, success: false, error: action.pay };

    default:
      return state;
  }
};

export const getAnswersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ANSWER_REQ:
      return { loading: true };

    case GET_ALL_ANSWER_SUCCESS:
      return { loading: false, answers: action.payload };

    case GET_ALL_ANSWER_FAIL:
      return { loading: false, success: false, error: action.pay };

    default:
      return state;
  }
};
