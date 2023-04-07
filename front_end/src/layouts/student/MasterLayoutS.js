import React from 'react';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import FooterS from './FooterS';
import NavbarS from './NavbarS';
import SidebarS from './SidebarS';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
