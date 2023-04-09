import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";

import MasterLayoutS from "./layouts/student/MasterLayoutS";
import DashboardS from "./components/student/DashboardS";
import ProfileS from "./components/student/ProfileS";

import MasterLayoutT from "./layouts/teacher/MasterLayoutT";
import DashboardT from "./components/teacher/DashboardT";
import ProfileT from "./components/teacher/ProfileT";
import AdminPrivateRoute from "./AdminPrivateRoute";
import TeacherPrivateRoute from "./TeacherPrivateRoute";

import PageNotFound from './components/errors/PageNotFound';
import Page_403 from './components/errors/Page_403';

import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";

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


          <Route path="/admin" element={<AdminPrivateRoute><MasterLayout /></AdminPrivateRoute>} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/profile' element={<Profile />} />
            <Route index element={<Navigate to="/admin/dashboard" />} />
          </Route>

          <Route path="/student" element={<MasterLayoutS />} >
            <Route path='/student/dashboard' element={<DashboardS />} />
            <Route path='/student/profile' element={<ProfileS />} />
            <Route index element={<Navigate to="/student/dashboard" />} />
          </Route>

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
