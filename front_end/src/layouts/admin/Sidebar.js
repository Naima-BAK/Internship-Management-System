import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import dashboard from '../../assets/admin/assets/img/dashboard/dashboard.png';
import intern from '../../assets/admin/assets/img/dashboard/internship.png'
import { MdSchool } from 'react-icons/md';
import { FaTachometerAlt } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
function Sidebar() {
    const [colors, setColors] = useState([]);
    const id = 1;
    useEffect(() => {
        axios.get(`/api/view_colors/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setColors(res.data.colors);
                } else if (res.data.status === 404) {
                    Swal.fire("Error", res.data.message, "error");
                }
            });
    }, [id]);

    return (
        <nav className={`sb-sidenav accordion sb-sidenav-${colors.sidebarbackground}`} style={{ backgroundColor: colors.sidebarbg }} id="sidenavAccordion">

            <div className="sb-sidenav-menu">
                <div className="nav" >
                    <div>
                        {/* Dashboard---------------- */}
                        <Link className="nav-link" to="/admin/dashboard" style={{ marginBottom: '10px', color: colors.sidebarecolor }}>

                            <div className="sb-nav-link-icon">
                                <FaTachometerAlt size={20} fill={colors.sidebaricon} />
                            </div>
                            Dashboard
                        </Link>

                        <Link className="nav-link" to="/admin/ListDocument">
                            <div className="sb-nav-link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-file-earmark-richtext" viewBox="0 0 16 16">
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                                    <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
                                </svg>
                            </div>
                            Documents
                        </Link>
                        {/* -------------------------- */}

                        {/* Profile-------------------- */}
                        <Link className="nav-link" to="/admin/profile">
                            <div className="sb-nav-link-icon" style={{ marginBottom: '10px' }}>

                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                </svg>
                            </div>
                            profile
                        </Link>
                        {/* -------------------------- */}

                        <div className="container">
                            <div className="row">
                                <div className="col bg-white" style={{ height: '1px', }}></div>
                            </div>
                        </div>

                        {/* Ensiegnants----------------------- */}
                        <Link className="nav-link collapsed" to="/admin/ListTeacher" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-person-video3" viewBox="0 0 16 16">
                                    <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
                                </svg></div>
                            Ensiegnants
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <Link className="nav-link collapsed" to="/admin/ListTeacher">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div>
                                    Liste des Ensiegnants
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>

                                <Link className="nav-link collapsed" to="/admin/AddTeacher">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div>
                                    Ajouter un Ensiegnant
                                    <div className="sb-sidenav-collapse-arrow">
                                    </div>
                                </Link>

                            </nav>
                        </div>
                        {/* ------------------- */}

                        {/* Gestion etudiants------------------------------- */}
                        <Link className="nav-link collapsed" to="/admin/ListStudent" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-mortarboard" viewBox="0 0 16 16">
                                    <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
                                    <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
                                </svg>
                            </div>
                            Etudiants
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <Link className="nav-link collapsed" to="/admin/ListStudent">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div>Liste Etudiants
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>

                                <Link className="nav-link collapsed" to="/admin/AddStudent">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div>Ajouter un etudiant
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>

                            </nav>
                        </div>
                        {/* ------------------- */}

                        <div className="container">
                            <div className="row">
                                <div className="col bg-white" style={{ height: '1px', }}></div>
                            </div>
                        </div>

                        {/* STAGES----------------------- */}
                        <Link className="nav-link collapsed" to="/admin/ListInternship" data-bs-toggle="collapse" data-bs-target="#stage" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon">
                                <MdSchool size={20} fill={colors.sidebaricon} />
                            </div>
                            Stages
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="stage" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <Link className="nav-link collapsed" to="/admin/ListInternship">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div> Liste des stages
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>

                                <Link className="nav-link collapsed" to="/admin/AddInternship">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div>Ajouter un stage
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>

                            </nav>
                        </div>
                        {/* ------------------- */}

                        {/* Companies----------------------- */}
                        <Link className="nav-link collapsed" to="/admin/ListCompanies" data-bs-toggle="collapse" data-bs-target="#company" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-building" viewBox="0 0 16 16">
                                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                                </svg>
                            </div>
                            Entreprises
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="company" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <Link className="nav-link collapsed" to="/admin/ListCompanies">
                                    <div className="sb-nav-link-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                    </div>Liste des Entreprises
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>



                            </nav>
                        </div>
                        {/* ------------------- */}

                        <div className="container">
                            <div className="row">
                                <div className="col bg-white" style={{ height: '1px', }}></div>
                            </div>
                        </div>





                        <div className="sb-sidenav-menu-heading">Contact</div>
                        <Link className="nav-link" to="/admin/chat">
                            <div className="sb-nav-link-icon">
                                <FaComments size={20} fill={colors.sidebaricon} />
                            </div>
                            Contact users
                        </Link>

                        {/*  <Link className="nav-link" to="tables.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables
                    </Link> */}
                    </div>
                </div>
            </div>

        </nav >
    )
}
export default Sidebar;