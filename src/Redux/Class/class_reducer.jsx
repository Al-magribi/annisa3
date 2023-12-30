import {
  CLASS_DELETE_FAIL,
  CLASS_DELETE_REQ,
  CLASS_DELETE_RESET,
  CLASS_DELETE_SUCCESS,
  CLASS_DETAIL_FAIL,
  CLASS_DETAIL_REQ,
  CLASS_DETAIL_SUCCESS,
  CLASS_FAIL,
  CLASS_REQ,
  CLASS_RESET,
  CLASS_SUCCESS,
  CLASS_UPDATE_FAIL,
  CLASS_UPDATE_REQ,
  CLASS_UPDATE_RESET,
  CLASS_UPDATE_SUCCESS,
  GET_CLASS_FAIL,
  GET_CLASS_REQ,
  GET_CLASS_SUCCESS,
  STUDENTS_CLASS_FAIL,
  STUDENTS_CLASS_REQ,
  STUDENTS_CLASS_SUCCESS,
} from "./class_const";

// MENAMPILKAN SEMUA KELAS
export const getClassesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CLASS_REQ:
      return { loading: true };

    case GET_CLASS_SUCCESS:
      return { loading: false, classes: action.payload };

    case GET_CLASS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// MENAMBAHKAN KELAS
export const addClassReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASS_REQ:
      return { loading: true };

    case CLASS_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case CLASS_FAIL:
      return { loading: false, error: action.payload };

    case CLASS_RESET:
      return { loading: false };

    default:
      return state;
  }
};

//MENAMPILKAN SISWA DALAM KELAS
export const getStudentInClassReducer = (state = [], action) => {
  switch (action.type) {
    case STUDENTS_CLASS_REQ:
      return { loading: true };

    case STUDENTS_CLASS_SUCCESS:
      return { loading: false, allStudents: action.payload };

    case STUDENTS_CLASS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//MENGUPDATE DAN MENGHAPUS KELAS
export const upDelClassReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASS_UPDATE_REQ:
    case CLASS_DELETE_REQ:
      return { loading: true };

    case CLASS_UPDATE_SUCCESS:
      return { loading: false, isUpdated: true, upMessage: action.payload };

    case CLASS_DELETE_SUCCESS:
      return { loading: false, isDeleted: true, delMessage: action.payload };

    case CLASS_UPDATE_FAIL:
      return { loading: false, isUpdated: false, upError: action.payload };

    case CLASS_DELETE_FAIL:
      return { loading: false, isDeleted: false, delError: action.payload };

    case CLASS_UPDATE_RESET:
      return { loading: false };

    case CLASS_DELETE_RESET:
      return { loading: false };

    default:
      return state;
  }
};

// DETAIL KELAS
export const detailClassReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASS_DETAIL_REQ:
      return { loading: true };

    case CLASS_DETAIL_SUCCESS:
      return { loading: false, detail: action.payload };

    case CLASS_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
