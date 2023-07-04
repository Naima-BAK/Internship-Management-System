import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import File from '../../../../assets/img/doc/file.png';
import PdfViewer from '../view_docs/PdfViewer';
// import PdfViewer from './PdfViewer';

function DocSentToStudent({ user_id, user_name }) {
    const [documents, setDocuments] = useState([]);
    const [pdfFiles, setPdfFiles] = useState([]); // State variable to hold the loaded PDF files
    const idUser = parseInt(user_id);
    const idAdmin = parseInt(localStorage.getItem('auth_id'));

    useEffect(() => {
        axios.get(`/api/documents?user_id=${idUser}&sent_by=${idAdmin}`).then(res => {
            if (res.data.status === 200) {
                setDocuments(res.data.documents);
            }
        })
    }, [idUser, idAdmin]);

    useEffect(() => {
        const promises = documents.map((doc) => {
            return import(`C:/xampp/htdocs/Internship-Management-System/front_end/public/documents/${doc.file}`).then((module) => {
                return {
                    title: doc.title,
                    file: module.default
                };
            });
        });

        Promise.all(promises).then((pdfFiles) => {
            setPdfFiles(pdfFiles);
        });
    }, [documents]);

    return (
        <div className="container">
            <div className="row">
                {pdfFiles.length > 0 ? (
                    pdfFiles.map((pdfFile, index) => (
                        <div key={index} className="col-sm-6 col-md-3" style={{ width: '200px', height: '300px', backgroundColor: 'transparent' }}>
                            <Card className="my-card" >
                                <Card.Img variant="top" src={File} />
                                <Card.Body>
                                    <Card.Title>{pdfFile.title}</Card.Title>

                                    <PdfViewer />
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

export default DocSentToStudent;