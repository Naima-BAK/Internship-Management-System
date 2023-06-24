import React, { useState } from 'react'
import ContactData from './ContactData'
import { BsArrowRight } from 'react-icons/bs';
import SocialNetworks from './SocialNetworks';
import UpdateLogo from './UpdateLogo';
import { Button } from 'react-bootstrap';
import UpdateFavcon from './UpdateFavcon';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';



export default function WebSiteData() {

    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px'
    }
    const [setting, setSetting] = useState([]);
    const id = 1;
    const handlSettingInput = (e) => {
        e.persist();
        setSetting({
            ...setting, [e.target.name]: e.target.value
        });
    }
    const [error, setError] = useState([]);

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

    //update website name :
    const updateWebsiteName = (e) => {
        e.preventDefault();
        const data = setting;
        console.log(data);
        axios.put(`/api/update_website_name`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("le champs nom de site web et obligatoire ", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    }

    return (
        <div className="tab-pane active" id="profile">

            <h6 style={style}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-sliders" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                </svg>
                Information du site web
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-browser-chrome" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                </svg></h6>
            <hr />

            {/* website name : */}
            <div className="form-group">
                <div className="row align-items-center">
                    <label>Le nom du site</label>
                    <form onSubmit={updateWebsiteName}>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                id="website_name"
                                name='website_name'
                                value={setting.website_name}
                                onChange={handlSettingInput}
                                style={{ width: '300px' }}
                            />
                        </div>
                        <div className="col">
                            <Button variant='info' type='submit' className="btn btn-outline btn-info  dim"  >
                                Mettre a jour le nom
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
            {/* ------- */}


            <div className="form-group small text-muted">
                Le nom est Dans le pied de page
            </div>
            <br />
            <p style={style}>Modifier le logo
                <span>
                    <UpdateLogo setting={setting} />
                </span>
                &nbsp;&nbsp;
                <span className="vertical-line" style={{ borderLeft: '1px solid black', height: '20px', width: '10px' }}></span>
                &nbsp;&nbsp;
                Modifier le favicon
                <span>
                    <UpdateFavcon setting={setting} />
                </span>
            </p>
            <br />

            <h6 style={style}>Modifier les information de contact
                <span>
                    <BsArrowRight size={32} style={{ width: '120px' }} color="black" />
                    <ContactData setting={setting} handlSettingInput={handlSettingInput} setSetting={setSetting} />
                </span>
            </h6>
            <hr />


            <br />
            <br />

            <h6 style={style}>Modifiler les liens Réseaux sociaux
                <span>
                    <BsArrowRight size={32} style={{ width: '120px' }} color="black" />
                    <SocialNetworks setting={setting} handlSettingInput={handlSettingInput} setSetting={setSetting} />
                </span>

            </h6>
            <hr />
            <br />


        </div >
    )
}
