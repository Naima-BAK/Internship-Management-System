import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import logo from '../../components/frontend/logo.png';

function Navbar() {

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/');
            }
        });

    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login"><b>Login</b></Link>
                </li>
                {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <li className="nav-item">
                    <Link className="nav-link" to="/register"><b>Register</b></Link>
                </li> */}
            </ul>
        );
    } else {
        AuthButtons = (
            <li className="nav-item">
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-info btn-sm text-white">Logout</button>
            </li>
        );
    }


    return (
        <nav style={{ backgroundColor: '#f8f9fa !important' }} className="navbar navbar-expand-lg ">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link className="navbar-brand" to="#">
                <img className='img' width={120} src={logo} alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/"><b>Home</b> <span className="sr-only"></span></Link>

                    </li>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {AuthButtons}
                    &nbsp; &nbsp;
                </ul>

            </div>
        </nav>
    )
}
export default Navbar;