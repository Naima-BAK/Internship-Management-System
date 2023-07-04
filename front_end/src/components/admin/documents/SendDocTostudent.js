import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function SendDocTostudent() {
    const [title, setTitle] = useState('');
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const [error, setError] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('user_id', parseInt(id));
        formData.append('sent_by', localStorage.getItem('auth_id'));

        axios.post('/api/documentsTostudent', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // console.log(response.data);
                if (response.data.status === 200)
                    Swal.fire("Success", response.data.message, "success");
                else if (response.data.status === 400)
                    setError(response.data.errors);

                if (!file) {
                    setErrorMessage('Veuillez sélectionner un fichier à télécharger.');
                    return;
                }
            })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Ajouter un document</h2>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label className="mr-2">Titre</Form.Label>
                            <Form.Control type="text" value={title} onChange={handleTitleChange} placeholder="Saisir le titre du document" className="mr-2" />
                            <small className='text-danger'>{error.title}</small>


                            <Form.Label className="mr-2">Fichier</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                            {errorMessage && <small className='text-danger'>{errorMessage}</small>}

                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={handleDescriptionChange} placeholder="Saisir une description du document" />
                            <small className='text-danger'>{error.description}</small>

                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit" className="ml-3">Ajouter</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SendDocTostudent;