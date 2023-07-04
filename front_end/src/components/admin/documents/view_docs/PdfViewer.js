import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

function PdfViewer({ pdfFile }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Télecharger
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{pdfFile.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{pdfFile.description}</p>
                    <iframe
                        src={pdfFile.file}
                        width="100%"
                        height="400px"
                        title={`PDF Viewer - ${pdfFile.title}`}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <a href={pdfFile.file} onClick={handleClose}>
                        <Button variant="primary" >  Télécharger</Button>

                    </a>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PdfViewer;