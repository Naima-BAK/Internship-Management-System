import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import logo from '../../components/frontend/logo.png';
import { Dropdown } from "react-bootstrap";
import Logo from '../../components/admin/settings/Logo';


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
            </ul>
        );
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
        <nav style={{ backgroundColor: '#f8f9fa !important' }} className="navbar navbar-expand-lg ">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link className="navbar-brand" to="#">
                <Logo />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/"><b>Home</b> <span className="sr-only"></span></Link>

                    </li>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {AuthButtons}
                    &nbsp; &nbsp;
                </ul>

            </div>
        </nav>
    )
}
export default Navbar;