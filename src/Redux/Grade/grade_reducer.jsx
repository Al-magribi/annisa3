import {
  GRADE_DELETE_FAIL,
  GRADE_DELETE_REQ,
  GRADE_DELETE_RESET,
  GRADE_DELETE_SUCCESS,
  GRADE_DETAIL_FAIL,
  GRADE_DETAIL_REQ,
  GRADE_DETAIL_SUCCESS,
  GRADE_FAIL,
  GRADE_REQ,
  GRADE_RESET,
  GRADE_SUCCESS,
  GRADE_UPDATE_FAIL,
  GRADE_UPDATE_REQ,
  GRADE_UPDATE_RESET,
  GRADE_UPDATE_SUCCESS,
  GET_GRADE_FAIL,
  GET_GRADE_REQ,
  GET_GRADE_SUCCESS,
  STUDENTS_GRADE_FAIL,
  STUDENTS_GRADE_REQ,
  STUDENTS_GRADE_SUCCESS,
  GRADE_CLEAR_ERROR,
} from "./grade_const";

// MENAMPILKAN SEMUA KELAS
export const getGradesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GRADE_REQ:
      return { loading: true };

    case GET_GRADE_SUCCESS:
      return { loading: false, grades: action.payload };

    case GET_GRADE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// MENAMBAHKAN KELAS
export const addGradeReducer = (state = {}, action) => {
  switch (action.type) {
    case GRADE_REQ:
      return { loading: true };

    case GRADE_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case GRADE_FAIL:
      return { loading: false, error: action.payload };

    case GRADE_RESET:
      return {};

    case GRADE_CLEAR_ERROR:
      return {};

    default:
      return state;
  }
};

//MENAMPILKAN SISWA DALAM KELAS
export const getStudentInGradeReducer = (state = [], action) => {
  switch (action.type) {
    case STUDENTS_GRADE_REQ:
      return { loading: true };

    case STUDENTS_GRADE_SUCCESS:
      return { loading: false, students: action.payload };

    case STUDENTS_GRADE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//MENGUPDATE DAN MENGHAPUS KELAS
export const upDelGradeReducer = (state = {}, action) => {
  switch (action.type) {
    case GRADE_UPDATE_REQ:
    case GRADE_DELETE_REQ:
      return { loading: true };

    case GRADE_UPDATE_SUCCESS:
      return { loading: false, isUpdated: true, message: action.payload };

    case GRADE_DELETE_SUCCESS:
      return { loading: false, isDeleted: true, message: action.payload };

    case GRADE_UPDATE_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case GRADE_DELETE_FAIL:
      return { loading: false, isDeleted: false, error: action.payload };

    case GRADE_UPDATE_RESET:
      return { loading: false };

    case GRADE_DELETE_RESET:
      return { loading: false };

    default:
      return state;
  }
};

// DETAIL KELAS
export const detailGradeReducer = (state = {}, action) => {
  switch (action.type) {
    case GRADE_DETAIL_REQ:
      return { loading: true };

    case GRADE_DETAIL_SUCCESS:
      return { loading: false, detail: action.payload };

    case GRADE_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
