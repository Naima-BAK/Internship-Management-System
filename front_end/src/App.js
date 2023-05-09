import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// admin :
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import ListStudent from "./components/admin/students/ListStudents";
import AddStudent from "./components/admin/students/AddStudent";
import EditStudent from "./components/admin/students/EditStudent";
import ShowStudent from "./components/admin/students/ShowStudent";
import ListTeachers from "./components/admin/teachers/ListTeachers";
import AdminPrivateRoute from "./AdminPrivateRoute";
// ****************

import MasterLayoutS from "./layouts/student/MasterLayoutS";
import DashboardS from "./components/student/DashboardS";
import ProfileS from "./components/student/ProfileS";
// ----------------------------------------
import MasterLayoutT from "./layouts/teacher/MasterLayoutT";
import DashboardT from "./components/teacher/DashboardT";
import ProfileT from "./components/teacher/ProfileT";
import TeacherPrivateRoute from "./TeacherPrivateRoute";
// ------------------------------------
import PageNotFound from './components/errors/PageNotFound';
import Page_403 from './components/errors/Page_403';
// -------------------------------------
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";
import AddTeacher from "./components/admin/teachers/AddTeacher";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  return (
    <div className="App">
      {/* nested routes */}
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/403" element={<Page_403 />} />

          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminPrivateRoute><MasterLayout /></AdminPrivateRoute>} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/profile' element={<Profile />} />
            <Route path='/admin/ListStudent' element={<ListStudent />} />
            <Route path='/admin/AddStudent' element={<AddStudent />} />
            <Route path='/admin/ShowStudent' element={<ShowStudent />} />
            <Route path='/admin/EditStudent/:id' element={<EditStudent />} />
            <Route path='/admin/ListTeacher' element={<ListTeachers />} />
            <Route path='/admin/AddTeacher' element={<AddTeacher />} />
            {/*<Route path='/admin/ShowTeacher' element={<ShowTeacher />} />
            <Route path='/admin/EditTeacher/:id' element={<EditTeacher />} /> */}



            <Route index element={<Navigate to="/admin/dashboard" />} />
          </Route>
          {/* ---------------student routes----------------------- */}
          <Route path="/student" element={<MasterLayoutS />} >
            <Route path='/student/dashboard' element={<DashboardS />} />
            <Route path='/student/profile' element={<ProfileS />} />
            <Route index element={<Navigate to="/student/dashboard" />} />
          </Route>

          {/* -------------------teacher routes----------------- */}
          <Route path="/teacher" element={<TeacherPrivateRoute><MasterLayoutT /> </TeacherPrivateRoute>} >
            <Route path='/teacher/dashboard' element={<DashboardT />} />
            <Route path='/teacher/profile' element={<ProfileT />} />
            <Route index element={<Navigate to="/teacher/dashboard" />} />
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
