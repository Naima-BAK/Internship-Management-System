import axios from 'axios';
import React from 'react';
import logo from '../../components/frontend/logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
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
            <>
                <li className="dropdown-item">
                    Modifier le mot de passe
                </li>
                <li className="dropdown-item" onClick={logoutSubmit} >
                    Logout
                </li>

            </>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </form>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img width={50} src={`../../../profile/${localStorage.getItem('auth_image')}`} alt="Maxwell Admin" />
                        <span style={{ color: 'black' }}>   {localStorage.getItem('auth_name')}</span>
                        <i className="fas fa-user fa-fw"></i>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="#!">Paramètres</Link></li>
                        <li><Link className="dropdown-item" to="#!">Votre profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        {AuthButtons}
                    </ul>
                </li>
            </ul>







        </nav>
    )
}
export default Navbar