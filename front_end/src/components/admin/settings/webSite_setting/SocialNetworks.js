import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { BsPencilFill } from 'react-icons/bs';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';

import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
export default function SocialNetworks({ setting, handlSettingInput, setSetting }) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const updateSocialNetworksLinks = (e) => {
        e.preventDefault();
        const data = setting;
        axios.put(`/api/update_SocialNetworksLinks`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("les champs sont obligatoires ", "", "error");
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
        color: 'blue',
        fontSize: '25px'
    }
    return (
        <>
            <Button variant='info' className="btn btn-outline btn-info  dim" onClick={handleShow} >
                <BsPencilFill color="black" />&nbsp;
                <h6 >Mettre a jour les liens</h6>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="bottom">

                <Offcanvas.Header closeButton >
                    <Offcanvas.Title style={style}>
                        Réseaux sociaux
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body >
                    <form onSubmit={updateSocialNetworksLinks}>
                        <div className="row align-items-center">
                            {/* <div className="col">
                               
                            </div> */}
                            <div className="col">
                                <FaFacebook size={32} color='blue' />
                                <input
                                    type="text"
                                    id='facebook'
                                    name='facebook'
                                    className="form-control"
                                    onChange={handlSettingInput}
                                    value={setting.facebook}
                                />
                                <small className='text-danger'>{error.facebook}</small>
                            </div>
                            <div className="col">

                            </div>
                            <div className="col">
                                <FaLinkedin color='#17a2b8' size={32} />
                                <input
                                    type="text"
                                    id='linkedin'
                                    name='linkedin'
                                    className="form-control"
                                    onChange={handlSettingInput}
                                    value={setting.linkedin}
                                />
                                <small className='text-danger'>{error.linkedin}</small>
                            </div>
                            <div className="col">

                            </div>
                            <div className="col">
                                <FaInstagram color='pink' size={32} />
                                <input
                                    type="text"
                                    id='instagram'
                                    name='instagram'
                                    className="form-control"
                                    onChange={handlSettingInput}
                                    value={setting.instagram}
                                />
                                <small className='text-danger'>{error.instagram}</small>
                            </div>
                            <div className="col">
                                <Button type='submit' variant='info' className="btn btn-outline btn-info dim" >
                                    Mettre à jour
                                </Button>
                            </div>
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}