import React from "react";
import './contact.css';
export default function AjouterContact() {

    return (


        <form
            style={{
                padding: "30px",
                width: "100%",
                marginTop: "30px",
                background: "#fff",
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.08)",
            }}
            action="contact.php"
            method="post"
        >
            <div className="row">
                <div style={{ paddingBottom: "20px" }} className="col-xl-6 form-group">
                    <input
                        style={{
                            height: "48px",
                            borderRadius: "0",
                            fontSize: "14px",
                        }}
                        type="text"
                        name="nom"
                        className="form-control"
                        placeholder="Votre nom"
                        required
                    />
                </div>
                <div style={{ paddingBottom: "20px" }} className="col-xl-6 form-group">
                    <input
                        style={{
                            height: "48px",
                            borderRadius: "0",
                            fontSize: "14px",
                        }}
                        type="email"
                        className="form-control"
                        name="mail"
                        placeholder="Votre Email"
                        required
                    />
                </div>
            </div>

            <div style={{ paddingBottom: "20px" }} className="form-group">
                <textarea
                    style={{
                        padding: "10px 12px",
                        borderRadius: "0",
                        fontSize: "14px",
                    }}
                    className="form-control"
                    name="messag"
                    rows="5"
                    placeholder="Message"
                    required
                ></textarea>
            </div>
            <br />


            <div className="text-center">
                <button
                    className="btn btn-info"
                    style={{
                        padding: "12px 40px",
                        color: "#fff",
                        transition: "0.4s",
                        borderRadius: "50px",
                    }}
                    name="btn-add"
                    type="submit"
                >
                    Envoyer
                </button>
            </div>
        </form>

    )
}
