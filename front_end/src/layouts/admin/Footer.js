import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Footer() {

    const [setting, setSetting] = useState([]);
    const id = 1;
    useEffect(() => {
        axios.get(`/api/view_setting/${id}`).then(res => {
            if (res.data.status === 200) {
                setSetting(res.data.setting);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
            }
        });
    }, [id]);

    return (
        <footer className="py-4 mt-auto" style={{ marginBottom: '30px' }}>

            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small" >
                    <div className="text-muted">
                        {/* &nbsp;&nbsp;Bakenchich Naima */}
                        <Link to="#"> Copyright &copy; {setting.website_name} App 2023</Link>
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
