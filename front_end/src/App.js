import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/frontend/auth/Register';
// admin :
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import ListStudent from "./components/admin/students/ListStudents";
import AddStudent from "./components/admin/students/AddStudent";
import EditStudent from "./components/admin/students/EditStudent";
import ListTeachers from "./components/admin/teachers/ListTeachers";
import EditTeacher from "./components/admin/teachers/EditTeacher";
import AdminPrivateRoute from "./AdminPrivateRoute";

import AddTeacher from "./components/admin/teachers/AddTeacher";
import ShowStudent from "./components/admin/students/ShowStudent";
import ShowTeacher from "./components/admin/teachers/ShowTeacher";

import ListCompanies from "./components/admin/company/ListCompanies";
import EditCompany from "./components/admin/company/EditCompany";
import ShowCompany from "./components/admin/company/ShowCompany";
import EditLogo from "./components/admin/company/EditLogo";

import ListInternship from './components/admin/internships/ListInternship';
import AddInternship from './components/admin/internships/AddInternship';
import ShowInternship from './components/admin/internships/ShowInternship';
import EditInternship from './components/admin/internships/EditInternship';
import AffectSupervisor from "./components/admin/internships/AffectSupervisor";

import ListDocument from "./components/admin/documents/ListDocument";
import AddDocument from "./components/admin/documents/AddDocument";




// ****************




// ---------student***------------------------------
import MasterLayoutS from "./layouts/student/MasterLayoutS";
import DashboardS from "./components/student/DashboardS";
import ProfileS from "./components/student/ProfileS";
// ----------------------------------------------------


// ------------teacher----------------------------
import MasterLayoutT from "./layouts/teacher/MasterLayoutT";
import DashboardT from "./components/teacher/DashboardT";
import ProfileT from "./components/teacher/ProfileT";
import TeacherPrivateRoute from "./TeacherPrivateRoute";
// ------------------------------------
import PageNotFound from './components/errors/PageNotFound';
import Page403 from './components/errors/Page_403';
// -------------------------------------
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import axios from "axios";
import Convention from "./components/admin/documents/Convention";
import DemandeStage from "./components/admin/documents/DemandeStage";
import Chat from "./components/Chat_part/Chat";
import Setting from './components/admin/Setting';
import UpdatePasswordAdmin from "./components/admin/UpdatePasswordAdmin";
import UpdatePasswordStudent from "./components/student/UpdatePasswordStudent";
import UpdatePasswordTeacher from "./components/teacher/UpdatePasswordTeacher";



axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
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
          <Route path="/403" element={<Page403 />} />
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/Chat" element={<Chat />} /> */}
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/login" element={localStorage.getItem('auth_token') ?
            <Navigate to='/' replace /> : <Login />} />

          {/* ------------Admin routes --------------------------------------------------------*/}
          <Route path="/admin" element={<AdminPrivateRoute><MasterLayout /></AdminPrivateRoute>} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/profile' element={<Profile />} />
            {/* student management */}
            <Route path='/admin/ListStudent' element={<ListStudent />} />
            <Route path='/admin/AddStudent' element={<AddStudent />} />
            <Route path='/admin/EditStudent/:id' element={<EditStudent />} />
            <Route path='/admin/ShowStudent/:id' element={<ShowStudent />} />
            {/* Teacher management */}
            <Route path='/admin/ListTeacher' element={<ListTeachers />} />
            <Route path='/admin/AddTeacher' element={<AddTeacher />} />
            <Route path='/admin/ShowTeacher/:id' element={<ShowTeacher />} />
            <Route path='/admin/EditTeacher/:id' element={<EditTeacher />} />
            {/* company management */}
            <Route path='/admin/ListCompanies' element={<ListCompanies />} />
            <Route path='/admin/ShowCompany/:id' element={<ShowCompany />} />
            <Route path='/admin/EditCompany/:id' element={<EditCompany />} />
            <Route path='/admin/EditLogo/:id' element={<EditLogo />} />

            {/* Internship management */}
            <Route path='/admin/ListInternship' element={<ListInternship />} />
            <Route path='/admin/AddInternship' element={<AddInternship />} />
            <Route path='/admin/ShowInternship/:id' element={<ShowInternship />} />
            <Route path='/admin/EditInternship/:id' element={<EditInternship />} />
            <Route path='/admin/AffectSupervisor/:id' element={<AffectSupervisor />} />

            {/* Documents management */}
            <Route path='/admin/ListDocument' element={<ListDocument />} />
            <Route path='/admin/AddDocument/' element={<AddDocument />} />
            <Route path='/admin/DemandeStage/:id' element={<DemandeStage />} />
            <Route path='/admin/Convention/:id' element={<Convention />} />
            <Route exact path="/admin/Chat" element={<Chat />} />
            <Route exact path="/admin/UpdatePassword" element={<UpdatePasswordAdmin />} />



            <Route index element={<Navigate to="/admin/dashboard" />} />
          </Route>
          {/* --------------------------------------------------------------------------------------- */}



          {/* ---------------student part : routes---------------------------------------------------- */}
          <Route path="/student" element={<MasterLayoutS />} >
            <Route path='/student/dashboard' element={<DashboardS />} />
            <Route path='/student/profile' element={<ProfileS />} />
            <Route exact path="/student/Chat" element={<Chat />} />
            <Route exact path="/student/UpdatePassword" element={<UpdatePasswordStudent />} />
            <Route exact path="/student/setting" element={<Setting />} />

            <Route index element={<Navigate to="/student/dashboard" />} />
          </Route>
          {/* ------------------------------------------------------------------------------------- */}



          {/* -------------------teacher routes--------------------------------------------------- */}
          <Route path="/teacher" element={<TeacherPrivateRoute><MasterLayoutT /> </TeacherPrivateRoute>} >
            <Route path='/teacher/dashboard' element={<DashboardT />} />
            <Route path='/teacher/profile' element={<ProfileT />} />
            <Route exact path="/teacher/Chat" element={<Chat />} />
            <Route exact path="/teacher/UpdatePassword" element={<UpdatePasswordTeacher />} />


            <Route index element={<Navigate to="/teacher/dashboard" />} />
          </Route>
          {/* ------------------------------------------------------------------------------------------ */}


        </Routes>
      </Router>

    </div>
  );
}

export default App;
