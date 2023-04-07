import React from 'react';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import FooterT from './FooterT';
import NavbarT from './NavbarT';
import SidebarT from './SidebarT';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
export default function MasterLayoutT() {
    return (
        <div className="sb-nav-fixed">
            <NavbarT />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <SidebarT />
                </div>
                <div id="layoutSidenav_content">
                    <main>


                        <Outlet />
                    </main>
                    <FooterT />
                </div>


            </div>
        </div>
    )
}
