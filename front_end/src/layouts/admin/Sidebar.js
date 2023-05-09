import React from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>

                    {/* Dashboard---------------- */}
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    {/* -------------------------- */}

                    {/* Profile-------------------- */}
                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        profile
                    </Link>
                    {/* ----------------------------- */}





                    {/* Ensiegnants----------------------- */}
                    <Link className="nav-link collapsed" to="/admin/ListTeacher" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Ensiegnants
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to="/admin/ListTeacher">
                                Liste des Ensiegnants
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>

                            <Link className="nav-link collapsed" to="/admin/AddTeacher">
                                Ajouter un Ensiegnant
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>

                        </nav>
                    </div>
                    {/* ------------------- */}


                    {/* Gestion etudiants------------------------------- */}
                    <Link className="nav-link collapsed" to="/admin/ListStudent" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Etudiants
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to="/admin/ListStudent">
                                Liste Etudiants
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>

                            <Link className="nav-link collapsed" to="/admin/AddStudent">
                                Add etudiants
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>

                        </nav>
                    </div>
                    {/* ------------------- */}



                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <Link className="nav-link" to="charts.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                        Charts
                    </Link>
                    <Link className="nav-link" to="tables.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables
                    </Link>
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    )
}
export default Sidebar;