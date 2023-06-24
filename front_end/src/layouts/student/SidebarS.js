import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdSchool } from 'react-icons/md';
import { FaTachometerAlt } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';
function Sidebar() {
    const [colors, setColors] = useState([]);
    const id = 2;
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
                <div className="nav">
                    {/* <div className="sb-sidenav-menu-heading">Core</div> */}
                    <Link className="nav-link" to="/student/dashboard" style={{ marginBottom: '10px', color: colors.sidebarecolor }}>
                        <div className="sb-nav-link-icon">
                            <FaTachometerAlt size={20} fill={colors.sidebaricon} />
                        </div>
                        Dashboard student
                    </Link>
                    <Link className="nav-link" to="/student/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                        profile student
                    </Link>

                    <div className="sb-sidenav-menu-heading">Contact</div>
                    <Link className="nav-link" to="/student/chat">
                        <div className="sb-nav-link-icon">
                            <FaComments size={20} fill={colors.sidebaricon} />
                        </div>
                        Chat part
                    </Link>
                    {/* <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="layout-static.html">Static Navigation</Link>
                            <Link className="nav-link" to="layout-sidenav-light.html">Light Sidenav</Link>
                        </nav>
                    </div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="login.html">Login</Link>
                                    <Link className="nav-link" to="register.html">Register</Link>
                                    <Link className="nav-link" to="password.html">Forgot Password</Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="401.html">401 Page</Link>
                                    <Link className="nav-link" to="404.html">404 Page</Link>
                                    <Link className="nav-link" to="500.html">500 Page</Link>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <Link className="nav-link" to="charts.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                        Charts
                    </Link>
                    <Link className="nav-link" to="tables.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables
                    </Link> */}
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