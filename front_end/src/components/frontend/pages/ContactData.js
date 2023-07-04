import React, { useEffect, useState } from "react";
import './contact.css'
import axios from "axios";
import Swal from "sweetalert2";
export default function ContactData() {
    const [setting, setSetting] = useState([]);
    const id = 1;

    //get setting data from database
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
        <div>
            <div className="section-title">
                <h2>Contact</h2>
                <p>
                    Besoin d'aide? <span style={{ color: "blue" }}><b>Nous contacter</b></span>
                </p>
            </div>
            <div className="row gy-4" style={{ marginLeft: '160px' }}>
                <div className="col-md-6">
                    <div className="info-item d-flex align-items-center">
                        <i className="icon bi bi-map flex-shrink-0"></i>
                        <div>
                            <h3>Notre Adresse</h3>
                            <p>{setting.contact_localization}</p>
                        </div>
                    </div>
                </div>
                {/* End Info Item */}

                <div className="col-md-6">
                    <div className="info-item d-flex align-items-center">
                        <i className="icon bi bi-envelope flex-shrink-0"></i>
                        <div>
                            <h3>Envoyez-nous un email</h3>
                            <p>{setting.contact_email}</p>
                        </div>
                    </div>
                </div>
                {/* End Info Item */}

                <div className="col-md-6">
                    <div className="info-item d-flex align-items-center">
                        <i className="icon bi bi-telephone flex-shrink-0"></i>
                        <div>
                            <h3>Appelez-nous</h3>
                            <p>{setting.contact_phone}</p>
                        </div>
                    </div>
                </div>
                {/* End Info Item */}

                <div className="col-md-6">
                    <div className="info-item d-flex align-items-center">
                        <i className="icon bi bi-share flex-shrink-0"></i>
                        <div>
                            <h3>Horaires d'ouverture</h3>
                            <div>
                                <strong>Lun-ven:</strong> 09:00 - 17:00;
                                <strong>sam-Dimanche:</strong> Fermé
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Info Item */}
            </div>
        </div>
    )
}
