import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  createTeacherReducer,
  createUserReducer,
  detailTeacherReducer,
  detailUserReducer,
  getTeacherReducer,
  getUserReducer,
  upDelTeacherReducer,
  upDelUserReducer,
  uploadTeacherReducer,
  uploadUserReducer,
  userLoginReducer,
} from "./Redux/User/user_reducer";
import {
  addClassReducer,
  detailClassReducer,
  getClassesReducer,
  getStudentInClassReducer,
  upDelClassReducer,
} from "./Redux/Class/class_reducer";
import {
  addEbook,
  detailEbookReducer,
  getEbookReducer,
  upDelEbookReducer,
} from "./Redux/Ebook/ebook_reducer";
import {
  createNewsReducer,
  detailNewsReducer,
  upDelNewsReducer,
  getNewsReducer,
} from "./Redux/News/news_reducer";
import {
  createActReducer,
  detailActReducer,
  upDelActReducer,
  getActsReducer,
} from "./Redux/Act/act_reducer";

import { webDetailReducer, webUpdateReducer } from "./Redux/Web/web_reducer";
import {
  createPaymentReducer,
  detailPaymentReducer,
  getPaymentReducer,
  getReportPaymentReducer,
  getTokenReducer,
  myPaymentReducer,
} from "./Redux/Payment/Payment_reducer";
import {
  createSppReducer,
  delSppReducer,
  getSppReducer,
} from "./Redux/Spp/spp_reducer";
import {
  createFeeReducer,
  getDetailFeeReducer,
  getFeeReducer,
  upDelFeeReducer,
} from "./Redux/Fee/fee_reducer";
import {
  LoggedUserReducer,
  createExamReducer,
  detailExamReducer,
  getExamsReducer,
  resetUserReducer,
  studentExamsReducer,
  unlockUserReducer,
  upDelExamReducer,
} from "./Redux/Exam/exam_reducer";
import {
  addGradeReducer,
  detailGradeReducer,
  getGradesReducer,
  getStudentInGradeReducer,
  upDelGradeReducer,
} from "./Redux/Grade/grade_reducer";
import {
  detailQuestionReducer,
  upDelQueReducer,
  uploadQuestReducer,
} from "./Redux/Question/question_reducer";
import {
  createAnswerReducer,
  essayReducer,
  getAnswersReducer,
  myAnswerReducer,
} from "./Redux/Answer/answer_reducer";

const reducer = {
  userLogin: userLoginReducer,

  newUser: createUserReducer,
  detailUser: detailUserReducer,
  upDelUser: upDelUserReducer,
  uploadUsers: uploadUserReducer,
  users: getUserReducer,

  grades: getGradesReducer,
  studentInGrade: getStudentInGradeReducer,
  newGrade: addGradeReducer,
  detailGrade: detailGradeReducer,
  upDelGrade: upDelGradeReducer,

  classes: getClassesReducer,
  newClass: addClassReducer,
  detailClass: detailClassReducer,
  upDelClass: upDelClassReducer,

  students: getStudentInClassReducer,
  newTeacher: createTeacherReducer,
  detailTeacher: detailTeacherReducer,
  upDelTeacher: upDelTeacherReducer,
  uploadTeacher: uploadTeacherReducer,
  teachers: getTeacherReducer,

  newEbook: addEbook,
  ebooks: getEbookReducer,
  detailEbook: detailEbookReducer,
  upDelEbook: upDelEbookReducer,

  News: getNewsReducer,
  newNews: createNewsReducer,
  detailNews: detailNewsReducer,
  upDelNews: upDelNewsReducer,

  Acts: getActsReducer,
  newAct: createActReducer,
  detailAct: detailActReducer,
  upDelAct: upDelActReducer,

  webDetail: webDetailReducer,
  upWeb: webUpdateReducer,

  payment: createPaymentReducer,
  allPayments: getPaymentReducer,
  myPayments: myPaymentReducer,
  report: getReportPaymentReducer,
  detailPayment: detailPaymentReducer,
  token: getTokenReducer,

  newSpp: createSppReducer,
  spp: getSppReducer,
  delSpp: delSppReducer,

  newFee: createFeeReducer,
  fee: getFeeReducer,
  detailFee: getDetailFeeReducer,
  upDelFee: upDelFeeReducer,

  Exams: getExamsReducer,
  newExam: createExamReducer,
  detailExam: detailExamReducer,
  upDelExam: upDelExamReducer,
  uploadQuestion: uploadQuestReducer,
  detailQuestion: detailQuestionReducer,
  upDelQuestion: upDelQueReducer,
  allAnswers: getAnswersReducer,
  essay: essayReducer,

  myExams: studentExamsReducer,
  newAnswer: createAnswerReducer,
  myAnswer: myAnswerReducer,
  log: LoggedUserReducer,
  unlock: unlockUserReducer,
  reset: resetUserReducer,
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  initialState: initialState,
  middleware: middleware,
});

export default store;
