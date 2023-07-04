import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddRapport() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [version, setVersion] = useState(null);
    const { id } = useParams();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const handleVersionChange = (event) => {
        setVersion(event.target.value);
    }
    const [error, setError] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorVersion, setErrorVersion] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('version', version);
        formData.append('file', file);
        formData.append('teacher', id);

        formData.append('user_id', parseInt(localStorage.getItem('auth_id')));
        axios.post('/api/senDocToTeacher', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {

                if (response.data.status === 200) {
                    Swal.fire("Success", response.data.message, "success");
                    resetForm();
                }

                else if (response.data.status === 400)
                    setError(response.data.errors);
                else if (response.data.status === 240)
                    Swal.fire("Error", response.data.message, "error");
                if (!file) {
                    setErrorMessage('Veuillez sélectionner un fichier à télécharger.');
                    return;
                }
                if (!version) {
                    setErrorVersion('le champ version est obligatoire.');
                    return;
                }
            })
    }

    const resetForm = () => {
        setFile('');
        setDescription('');
        setTitle('');
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Ajouter un Rapport</h2>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label className="mr-2">Titre</Form.Label>
                            <Form.Control type="text" value={title} onChange={handleTitleChange} placeholder="Saisir le titre du document" className="mr-2" />
                            <small className='text-danger'>{error.title}</small>

                            <Form.Label className="mr-2">Fichier</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                            {errorMessage && <small className='text-danger'>{errorMessage}</small>}

                            <Form.Label className="mr-2">Version</Form.Label>
                            <Form.Control type="text" value={version} onChange={handleVersionChange} placeholder="Saisir la version du document" className="mr-2" />
                            <small className='text-danger'>{errorVersion ? errorVersion : null}</small>

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
    )
}

export default AddRapport;