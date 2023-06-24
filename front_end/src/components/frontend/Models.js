import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
export default function Models() {
    const [showModal, setShowModal] = useState(false);
    const [fileInputValue, setFileInputValue] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleFileInputChange = (event) => {
        setFileInputValue(event.target.value);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ backgroundColor: '#ff8c00', color: 'white', borderColor: '#ff8c00' }}>
                Modifier le logo du site
            </Button>

            <Modal show={showModal} onHide={handleClose} className="custom-modal">
                <Modal.Header closeButton style={{ backgroundColor: '#FFEDCC', }}>
                    <Modal.Title>Modifier le logo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src="/logo.png" alt="Logo" width={100} className="logo" />
                    <br />
                    <br />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        value={fileInputValue}
                        className="file-input"
                    />
                    <br />
                    <br />

                    <p>Charger une image pour modifier le logo</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="info" style={{ backgroundColor: '#ff8c00', color: 'white', borderColor: '#ff8c00' }} onClick={handleClose}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}