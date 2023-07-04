import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import Footer from "../../../layouts/admin/Footer";
import AjouterContact from "./AjouterContact";
import ContactData from "./ContactData";

export default function Contact() {



    return (
        <>
            <Navbar />
            <section id="contact" className="contact">
                <div className="container">
                    <ContactData />
                    <AjouterContact />
                </div>
            </section >
            <Footer />
        </>
    );
}