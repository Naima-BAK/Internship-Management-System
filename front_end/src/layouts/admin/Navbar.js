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



            {/* model for update password */}
            <div className="modal fade" id="info" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <form onSubmit={updateAdminData} id='DATA_FORM'>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier vos informations</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="card-body" id='test2'>



                                    <div className="mb-3">

                                        <div className="input-group input-group-merge">
                                            <input type='hidden' value={localStorage.getItem('auth_id')} />
                                            {/* name of student */}
                                            <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                </svg>
                                            </span>
                                            <input onChange={handlInputAdmin} type="text" className="form-control" id="name" name="name" value={admin.name} />
                                            <small className='text-danger'>{error.name}</small>
                                            {/* ******** */}

                                        </div>
                                        <br />
                                        <div className="input-group input-group-merge">

                                            {/* name of student */}
                                            <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                                </svg>
                                            </span>
                                            <input onChange={handlInputAdmin} type="email" className="form-control" id="email" name="email" value={admin.email} />
                                            <small className='text-danger'>{error.email}</small>
                                            {/* ******** */}

                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-info" >Mettre à jour</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
            {/* ---------- */}



        </nav>
    )
}
export default Navbar