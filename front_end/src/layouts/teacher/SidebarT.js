import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdSchool } from 'react-icons/md';
import { FaTachometerAlt } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';

import { AiFillFileAdd } from 'react-icons/ai';
import { MdDescription } from 'react-icons/md';
import { BsList } from 'react-icons/bs';
function SidebarT() {

    const [colors, setColors] = useState([]);
    const id = 3;
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
                    <Link className="nav-link" to="/teacher/dashboard" style={{ marginBottom: '10px', color: colors.sidebarecolor }}>
                        <div className="sb-nav-link-icon">
                            <FaTachometerAlt size={20} fill={colors.sidebaricon} />
                        </div>
                        Dashboard teacher
                    </Link>
                    <Link className="nav-link" to="/teacher/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.sidebaricon} className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                        profile teacher
                    </Link>


                    <div className="sb-sidenav-menu-heading">Suivi</div>


                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#suivi" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon">
                            <MdDescription size={20} fill={colors.sidebaricon} />
                        </div>
                        <span>Espace Suivi</span>
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="suivi" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link className="nav-link collapsed" to="/teacher/chat">
                                <div className="sb-nav-link-icon">
                                    <FaComments size={20} fill={colors.sidebaricon} />
                                </div>
                                Contact
                            </Link>



                        </nav>
                    </div>

                    <div className="sb-sidenav-menu-heading">Contact</div>


                </div>
            </div>

        </nav>
    )
}
export default SidebarT;