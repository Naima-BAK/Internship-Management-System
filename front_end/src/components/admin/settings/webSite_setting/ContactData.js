import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { BsGeoAltFill, BsEnvelopeFill, BsPhone, BsPencilFill } from 'react-icons/bs';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

export default function ContactData({ setting, handlSettingInput, setSetting }) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const spanStyle = {
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,.125)',
        borderTopLeftRadius: '.25rem',
        borderBottomLeftRadius: '.25rem',
    };

    const updateContactData = (e) => {
        e.preventDefault();
        const data = setting;
        axios.put(`/api/update_contactData`, data).then(res => {
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
    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        color: '#17a2b8',
        fontSize: '25px',
        marginTop: '30px',

    }


    return (
        <>
            <Button variant='info' className="btn btn-outline btn-info  dim" onClick={handleShow} >
                <BsPencilFill color="black" />&nbsp;
                <h6 >Mettre a jour contact</h6>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={style}>Information de contact</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ marginTop: '40px' }}>
                    <form onSubmit={updateContactData}>

                        {/* email */}
                        <div className="form-group">
                            <div className="input-group">
                                <span id="basic-icon-default-email" className="input-group-text" style={spanStyle}>
                                    <BsEnvelopeFill />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="contact_email"
                                    name='contact_email'
                                    onChange={handlSettingInput}
                                    value={setting.contact_email}

                                />

                            </div>
                        </div>
                        <small className='text-danger'>{error.contact_email}</small>
                        {/* ------ */}

                        <br />

                        {/* phone */}
                        <div className="form-group">
                            <label htmlFor="phone" style={{ display: "none" }}>
                                Phone Number:
                            </label>
                            <div className="input-group">
                                <span id="basic-icon-default-phone" className="input-group-text" style={spanStyle}>
                                    <BsPhone />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact_phone"
                                    name='contact_phone'
                                    onChange={handlSettingInput}
                                    value={setting.contact_phone}
                                />

                            </div>
                        </div>
                        <small className='text-danger'>{error.contact_phone}</small>

                        {/* -------- */}

                        <br />

                        {/* location */}
                        <div className="form-group">
                            <label htmlFor="name" style={{ display: "none" }}>
                                Loaction
                            </label>
                            <div className="input-group">
                                <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                    <BsGeoAltFill />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contact_localization"
                                    name="contact_localization"
                                    onChange={handlSettingInput}
                                    value={setting.contact_localization}

                                />

                            </div>
                        </div>
                        <small className='text-danger'>{error.contact_localization}</small>

                        {/* ------- */}

                        <br />

                        <Button
                            variant="info"
                            type="submit"
                            className="float-end"
                            style={{ marginTop: "20px" }}
                        >
                            Mettre à jour
                        </Button>

                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}