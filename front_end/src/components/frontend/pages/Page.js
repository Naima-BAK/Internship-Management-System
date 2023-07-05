import React, { useEffect, useState } from "react";
import './page.css';
import Footer from "../../../layouts/admin/Footer";
import { TiArrowRight } from 'react-icons/ti';
import axios from "axios";
import Swal from "sweetalert2";
import { BsPhone } from 'react-icons/bs';
import { BsEnvelope } from 'react-icons/bs';
import { BsGlobe } from 'react-icons/bs';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import home from './home.png';
import { Link } from "react-router-dom";
export default function Page() {
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


            <section data-bs-version="5" class="header2 cid-sHbQ0iVJVb" id="header02-1">
                <div class="container">
                    <div class="row row-bg justify-content-center">
                        <div class="col-12 md-pb col-md-12 col-lg-6">
                            <div class="text-wrapper align-left">
                                <h1 class="mbr-section-title align-left mbr-fonts-style mb-4 display-1">Système de gestion des stages</h1>
                                <p class="mbr-text align-left mbr-fonts-style display-5">
                                    Système de gestion des stages.&nbsp;</p>
                                <div class="mbr-section-btn mt-4"><Link to="/login">
                                    <a class="btn btn-white display-7" href="https://mobiri.se">

                                        <TiArrowRight class="mobi-mbri mobi-mbri-arrow-next mbr-iconfont mbr-iconfont-btn" />
                                        Démarrer</a></Link></div>
                            </div>
                        </div>
                        <div class="col-12 col-md-12 col-lg-6 image-wrapper">
                            <img class="w-100" src={home} alt="Mobirise" />
                        </div>
                    </div>
                </div>
            </section>


            <section data-bs-version="5" class="contacts1 cid-sHbV4Rux6E" id="contacts01-i">
                <div class="container">
                    <div class="mbr-section-head pb-4">
                        <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">Contacts
                        </h3>
                        <h4 class="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-7">Système de gestion des stages
                            .</h4>
                    </div>

                    <div class="row justify-content-center mt-4">
                        {/* phone */}
                        <div class="card col-12 col-md-6">
                            <div class="card-wrapper">
                                <div class="image-wrapper">
                                    <BsPhone class="mbr-iconfont mobi-mbri-phone mobi-mbri" />
                                </div>
                                <div class="text-wrapper">
                                    <h6 class="card-title mbr-fonts-style mb-1 display-5">
                                        Appelez-nous
                                        <p></p>
                                    </h6>
                                    <p class="mbr-text mbr-fonts-style display-7">
                                        <a href="tel:+12345678910" class="text-black">{setting.contact_phone}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* email */}
                        <div class="card col-12 col-md-6">
                            <div class="card-wrapper">
                                <div class="image-wrapper">
                                    <BsEnvelope class="mbr-iconfont mobi-mbri-letter mobi-mbri" />
                                </div>
                                <div class="text-wrapper">
                                    <h6 class="card-title mbr-fonts-style mb-1 display-5">
                                        Envoyez-nous un email

                                    </h6>
                                    <p class="mbr-text mbr-fonts-style display-7">
                                        <a href="mailto:info@site.com" class="text-black">{setting.contact_email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* adress */}
                        <div class="card col-12 col-md-6">
                            <div class="card-wrapper">
                                <div class="image-wrapper">
                                    <BsGlobe class="mbr-iconfont mobi-mbri-globe mobi-mbri" />
                                </div>
                                <div class="text-wrapper">
                                    <h6 class="card-title mbr-fonts-style mb-1 display-5">
                                        Notre Adresse


                                    </h6>
                                    <p class="mbr-text mbr-fonts-style display-7">
                                        {setting.contact_localization}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div class="card col-12 col-md-6">
                            <div class="card-wrapper">
                                <div class="image-wrapper">
                                    <RiCheckboxBlankCircleLine class="mbr-iconfont mobi-mbri-bulleted-list mobi-mbri" />
                                </div>
                                <div class="text-wrapper">
                                    <h6 class="card-title mbr-fonts-style mb-1 display-5">
                                        Horaires d'ouverture
                                    </h6>

                                    <p class="mbr-text mbr-fonts-style display-7">
                                        9:00 - 18:00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section data-bs-version="5" class="footer1 cid-sHbV2lXHiy" once="footers" id="footer01-h">


                <div class="container">
                    <div class="media-container-row align-center mbr-white">
                        <div class="col-12">
                            <Footer />
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
