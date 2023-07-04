import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import File from '../../../../assets/img/doc/file.png';

function DocSentByStudent({ user_id, user_name }) {


    const [documents, setDocuments] = useState([]);
    const idUser = parseInt(user_id);
    //liste of documents send by student to admin  ------------------------------------
    useEffect(() => {
        axios.get(`/api/documents_student_to_admin?user_id=${idUser}`).then(res => {
            if (res.data.status === 200) {
                setDocuments(res.data.documents);
            }
        })
    }, [idUser]);

    return (

        <div className="container">
            <div className="row">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc.id} className="col-sm-6 col-md-3">
                            <Card className="my-card">
                                <Card.Img variant="top" src={File} />
                                <Card.Body>
                                    <Card.Title>{doc.title}</Card.Title>
                                    <Card.Text>
                                        {doc.description}
                                    </Card.Text>
                                    <Link to={`C:/xampp/htdocs/Internship-Management-System/front_end/public/documents/${doc.file}`}>doanlad</Link>

                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No documents found</p>
                )}
            </div>
        </div>
    );
}

export default DocSentByStudent;