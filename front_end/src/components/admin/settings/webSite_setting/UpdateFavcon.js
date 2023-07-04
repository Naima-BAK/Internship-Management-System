import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../../../assets/admin/css/setting/model.css';
import { BsPenFill } from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo from '../Logo';
export default function UpdateFavcon({ setting }) {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const id = 1;
    const updateWebSiteFavicon = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("selectedFile", selectedFile);
        formData.append("setting_id", id);
        if (!selectedFile) {
            Swal.fire("Error", "Le champ favicon est obligatoire !", "error");
        } else {
            axios.post('api/upload_website_favicon', formData).then(res => {

                if (res.data.status === 200) {
                    Swal.fire("Success", res.data.message, "success");
                }
            });

        }
    }
    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        color: 'white',
        fontSize: '25px'
    }
    return (
        <>
            <Button onClick={handleShow} style={{ backgroundColor: 'white', color: 'black', borderColor: ' #007bff', width: '60px', height: '30px' }}>
                <BsPenFill color=" #007bff" />
            </Button>

            <Modal show={showModal} onHide={handleClose} className="custom-modal">
                <Modal.Header closeButton style={{ backgroundColor: '#ffdead', }}>
                    <Modal.Title style={style}>Modifier le Favicon</Modal.Title>
                </Modal.Header>
                <form onSubmit={updateWebSiteFavicon}>
                    <Modal.Body>
                        <Logo />

                        <br />
                        <br />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="file-input"
                        />
                        <br />
                        <br />

                        <p>Charger une image</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fermer
                        </Button>
                        <Button type='submit' variant="info" style={{ backgroundColor: '#ff7f50', color: 'white', borderColor: '#ff8c00' }} onClick={handleClose}>
                            Enregistrer
                        </Button>
                    </Modal.Footer>
                </form>

            </Modal>
        </>
    );
}