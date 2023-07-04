import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function PdfViewerS({ doc }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch modal
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{doc.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{doc.description}</p>
                    <iframe
                        src={doc.file}
                        width="100%"
                        height="400px"
                        title={`PDF Viewer - ${doc.title}`}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <a href={doc.file} onClick={handleClose}>
                        <Button variant="primary" >  Télécharger</Button>

                    </a>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PdfViewerS;