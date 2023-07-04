import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import logo from '../../components/frontend/logo.png';
import { Dropdown } from "react-bootstrap";
import Logo from '../../components/admin/settings/Logo';
import Swal from 'sweetalert2';


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
    const [colors, setColors] = useState([]);
    useEffect(() => {
        axios.get(`/api/view_colors/${1}`)
            .then(res => {
                if (res.data.status === 200) {
                    setColors(res.data.colors);
                } else if (res.data.status === 404) {
                    Swal.fire("Error", res.data.message, "error");
                }
            });
    }, [1]);

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
                        <Dropdown.Toggle variant={colors.navbarbackground} id="dropdown-basic">
                            <img width={30} src={`../../../profile/${localStorage.getItem('auth_image')}`} alt="Maxwell Admin" />
                            <span style={{ color: colors.navbarcolor }}>{localStorage.getItem('auth_name')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey=""></Dropdown.Item>

                            <Dropdown.Divider />
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
            <Link className="navbar-brand" to="/">
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

                    <li className="nav-item active">
                        <Link className="nav-link" to="/Contact"><b>Contact</b> <span className="sr-only"></span></Link>
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