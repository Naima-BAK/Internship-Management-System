import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import DocSentByStudent from './doc_student/DocSentByStudent';
import DocSentToStudent from './doc_student/DocSentToStudent';
function ShowDocStudent({ user_id, user_name }) {
    const [showModal, setShowModal] = useState(false);
    const [showOffcanvas1, setShowOffcanvas1] = useState(false);
    const [showOffcanvas2, setShowOffcanvas2] = useState(false);

    console.log(user_id);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Define a callback function that toggles the offcanvas display
    const handleShowOffcanvas1 = () => {
        setShowOffcanvas1(true);
        handleClose();
    }
    const handleShowOffcanvas2 = () => {
        setShowOffcanvas2(true);
        handleClose();
    }
    return (
        <>
            <Button variant="info" onClick={handleShow}>Afficher les documents de {user_name}</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Documents de {user_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='text-center'>

                        <Col>
                            <Button as={Link} to={`/admin/docs_to_student/${user_id}/${user_name}`}>Documents de l'étudiant {user_name}</Button>
                        </Col>
                        <Col>
                            <Button onClick={handleShowOffcanvas2} >Documents de l'étudiant {user_name}</Button>

                        </Col>


                    </Row>
                </Modal.Body>
            </Modal >
            <Offcanvas style={{ height: '550px' }} show={showOffcanvas1} onHide={() => setShowOffcanvas1(false)} placement='top'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Documents Enovyés à {user_name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DocSentToStudent user_id={user_id} user_name={user_name} />
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas style={{ height: '550px' }} show={showOffcanvas2} onHide={() => setShowOffcanvas2(false)} placement='top'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Documents Enovyés par {user_name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DocSentByStudent user_id={user_id} user_name={user_name} />
                </Offcanvas.Body>
            </Offcanvas>


        </>
    );

}
export default ShowDocStudent;