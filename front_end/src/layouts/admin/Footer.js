import React from 'react'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="py-4 bg-light mt-auto" style={{ marginBottom: '30px' }}>

            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">
                        {/* &nbsp;&nbsp;Bakenchich Naima */}
                        Copyright &copy; Internship Management App 2023
                    </div>
                    <div>
                        <Link to="#">Privacy Policy</Link>
                        &middot;
                        <Link to="#">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
