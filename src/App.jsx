import "./App.css";
import "./table.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Guest/Home";
import News from "./Pages/Guest/News";
import Library from "./Pages/Guest/Library";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser, logoutUser } from "./Redux/User/user_action";
import { getWeb } from "./Redux/Web/web_action";
import Teachers from "./Pages/Guest/Teacher";
import Feed from "./Pages/Guest/Feed";
import PPDB from "./Pages/Guest/Ppdb";
import VISI_MISI from "./Pages/Guest/Visi_Misi";
import Admin from "./Pages/Login/Admin";
import User from "./Pages/Login/User";
import Read_News from "./Pages/Guest/Read_News";

import Dashboard from "./Pages/Admin/Dashboard";
import Admin_Teachers from "./Pages/Admin/Teachers";
import Admin_Grade from "./Pages/Admin/Grade";
import Admin_Users from "./Pages/Admin/Users";
import Admin_News from "./Pages/Admin/News";
import Admin_Feeds from "./Pages/Admin/Feeds";
import Admin_Library from "./Pages/Admin/Library";
import Admin_CBT from "./Pages/Admin/CBT";
import Admin_Setting from "./Pages/Admin/Setting";
import Admin_Payment from "./Pages/Admin/Payment";
import Admin_Report from "./Pages/Admin/Report";
import Admin_Profile from "./Pages/Admin/Profile";
import Admin_DetailExam from "./Pages/Admin/CBT/Detail";
import Questions from "./Pages/Admin/CBT/Questions";
import Read_ebook_admin from "./Pages/Admin/Read_ebook";

import User_Dashboard from "./Pages/User/Dashboard";
import User_CBT from "./Pages/User/Exam";
import Start_Exam from "./Pages/User/Exam/Start_Exam";
import User_Payment from "./Pages/User/Payment";
import User_Library from "./Pages/User/Library";
import Read_ebook_student from "./Pages/User/Read_ebook";

import Teacher_Dasboard from "./Pages/Teacher/Dashboard";
import Teacher_Library from "./Pages/Teacher/Library";
import Read_ebook_teacher from "./Pages/Teacher/Read_ebook";
import Teacher_Exam from "./Pages/Teacher/CBT";
import Teacher_Questions from "./Pages/Teacher/CBT/Questions";
import Teacher_DetailExam from "./Pages/Teacher/CBT/Detail";
import Payment_status from "./Pages/User/Payment/Status";

import Playground from "./Playground";

function App() {
  const dispatch = useDispatch();

  const id = "6426348b83c37122a65486d6";

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (user) {
      dispatch(loadUser());
    }

    dispatch(getWeb(id));
  }, [dispatch, user, id]);

  useEffect(() => {
    const time = 8 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      if (user) {
        dispatch(logoutUser());
      }
    }, time);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/playground' element={<Playground />} />

        <Route path='/visi-misi' element={<VISI_MISI />} />

        <Route path='/ppdb' element={<PPDB />} />

        <Route path='/feed' element={<Feed />} />

        <Route path='/news' element={<News />} />

        <Route path='/:title' element={<Read_News />} />

        <Route path='/library' element={<Library />} />

        <Route path='/teachers' element={<Teachers />} />

        <Route path='/admin/login' element={<Admin />} />

        <Route path='/user/login' element={<User />} />

        {/* ADMIN */}
        <Route path='/admin-dashboard' element={<Dashboard />} />

        <Route path='/admin-teachers' element={<Admin_Teachers />} />

        <Route path='/admin-grade' element={<Admin_Grade />} />

        <Route path='/admin-users' element={<Admin_Users />} />

        <Route path='/admin-news' element={<Admin_News />} />

        <Route path='/admin-feeds' element={<Admin_Feeds />} />

        <Route path='/admin-library' element={<Admin_Library />} />

        <Route path='/admin-ebook/:title' element={<Read_ebook_admin />} />

        <Route path='/admin-cbt' element={<Admin_CBT />} />

        <Route
          path='/admin/exam/:grade/:id/:subject/:name'
          element={<Admin_DetailExam />}
        />

        <Route path='/admin-cbt/exam/:name/:id' element={<Questions />} />

        <Route path='/admin-payment' element={<Admin_Payment />} />

        <Route path='/admin-report' element={<Admin_Report />} />

        <Route path='/admin-settings' element={<Admin_Setting />} />

        <Route path='/admin-profile' element={<Admin_Profile />} />

        {/* TEACHER */}
        <Route path='/teacher-dashboard' element={<Teacher_Dasboard />} />

        <Route path='/teacher-library' element={<Teacher_Library />} />

        <Route path='/teacher-ebook/:title' element={<Read_ebook_teacher />} />

        <Route path='/teacher-cbt' element={<Teacher_Exam />} />

        <Route
          path='/teacher/exam/:grade/:id/:subject/:name'
          element={<Teacher_DetailExam />}
        />

        <Route
          path='/teacher-cbt/exam/:name/:id'
          element={<Teacher_Questions />}
        />

        {/* STUDENT */}
        <Route path='/student-dashboard' element={<User_Dashboard />} />

        <Route path='/student-cbt' element={<User_CBT />} />

        <Route path='/student/exam/:name/:id' element={<Start_Exam />} />

        <Route path='/student-library' element={<User_Library />} />

        <Route path='/student-ebook/:title' element={<Read_ebook_student />} />

        <Route path='/student-payment' element={<User_Payment />} />

        <Route path='/status-payment' element={<Payment_status />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
