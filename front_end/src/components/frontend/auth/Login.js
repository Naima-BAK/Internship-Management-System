import React from 'react'
import Navbar from '../../../layouts/frontend/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import '../style.css';
import logo from '../logo.png';
function Login() {

    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handlInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }
    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {

                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.id);
                    localStorage.setItem('auth_email', res.data.email);
                    localStorage.setItem('auth_image', res.data.image);


                    swal("Success", res.data.message, "success");
                    if (res.data.role === 'admin') {
                        navigate('/admin/dashboard');
                    }
                    else if (res.data.role === 'teacher') {
                        navigate('/teacher/dashboard');
                    }
                    else {
                        navigate('/student/dashboard');

                    }
                }
                else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }

            });
        });



    };

    return (
        <div>
            <Navbar />
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form onSubmit={loginSubmit} class="login100-form validate-form">
                            <span class="login100-form-logo">
                                <i class="zmdi zmdi-landscape">
                                    <img className='img' width={120} src={logo} alt="logo" />
                                </i>
                            </span>
                            <span class="login100-form-title p-b-34 p-t-27">

                                Se connecter
                            </span>


                            <div class="wrap-input100 validate-input" data-validate="Enter username">
                                <br />
                                <input type="text" className="input100" name="email" onChange={handlInput} value={loginInput.name} placeholder='Entrez votre email' />
                                <span>{loginInput.error_list.email}</span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                <input type="password" name="password" onChange={handlInput} value={loginInput.password} className="input100" />
                                <span>{loginInput.error_list.password}</span>
                            </div>

                            <div class="container-login100-form-btn">
                                <button type="submit" class="login100-form-btn">Login</button>
                            </div>

                            <div class="text-center p-t-90">
                                <a class="txt1" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} export default Login;
