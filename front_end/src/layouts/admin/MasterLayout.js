import React from 'react';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
export default function MasterLayout() {
    return (
        <div className="sb-nav-fixed" style={{ overflow: 'hidden' }}>
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
