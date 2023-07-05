import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import Footer from "../../../layouts/admin/Footer";
import AjouterContact from "./AjouterContact";
import Title from "./Title";


export default function Contact() {



    return (
        <>
            <Navbar />
            <section id="contact" className="contact" style={{ backgroundColor: 'transparent' }}>
                <div className="container">
                    <Title />
                    <AjouterContact />
                </div>
            </section >
            <section style={{ marginTop: '250px' }} data-bs-version="5" class="footer1 cid-sHbV2lXHiy" once="footers" id="footer01-h">


                <div class="container">
                    <div class="media-container-row align-center mbr-white">
                        <div class="col-12">
                            <Footer />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}