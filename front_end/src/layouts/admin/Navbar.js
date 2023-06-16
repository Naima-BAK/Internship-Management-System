import axios from 'axios';
import React from 'react';
import logo from '../../components/frontend/logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Dropdown } from "react-bootstrap";
function Navbar() {

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/login');
            }
        });

    }
    var AuthButtons = '';

    if (!localStorage.getItem('auth_token')) {
        <Navigate to="/Login" />
    } else {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="info" className="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                            </svg>
                            <span>5</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey=""></Dropdown.Item>
                            <Dropdown.Item eventKey="option1">Paramétres</Dropdown.Item>
                            <Dropdown.Item eventKey="option2">Profile</Dropdown.Item>

                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="option3">
                                <Link>Modifier le mot de passe</Link></Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>

                </li>
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <img width={50} src={logo} alt="" style={{ marginRight: 10 }} />
                            <span>{localStorage.getItem('auth_name')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey=""></Dropdown.Item>
                            <Dropdown.Item eventKey="option1">Paramétres</Dropdown.Item>
                            <Dropdown.Item eventKey="option2">Profile</Dropdown.Item>

                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="option3">
                                <Link>Modifier le mot de passe</Link></Dropdown.Item>
                            <Dropdown.Item className="nav-item" onClick={logoutSubmit}>Se déconnecter</Dropdown.Item >
                        </Dropdown.Menu>

                    </Dropdown>
                </li>
            </ul>
        );
    }

    return (
        <nav style={{ backgroundColor: '#f8f9fa !important' }} className="sb-topnav navbar navbar-expand navbar-dark">

            <Link className="navbar-brand ps-3" to="/admin">
                Admin dahboard
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="navbar-brand ps-3" to="/admin">
                <img className='img' width={100} src={logo} alt="logo" />
            </Link>



            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" to="#!"><i className="fas fa-bars"></i></button>

            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." />
                    <button className="btn btn-info" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </form>
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            {AuthButtons}







        </nav>
    )
}
export default Navbar