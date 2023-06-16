import React from 'react';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import FooterS from '../admin/Footer';
import NavbarS from '../admin/Navbar';
import SidebarS from './SidebarS';
import { Outlet } from 'react-router-dom';
export default function MasterLayoutS() {
    return (
        <div className="sb-nav-fixed">
            <NavbarS />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <SidebarS />
                </div>
                <div id="layoutSidenav_content">
                    <main>


                        <Outlet />
                    </main>
                    <FooterS />
                </div>


            </div>
        </div>
    )
}
