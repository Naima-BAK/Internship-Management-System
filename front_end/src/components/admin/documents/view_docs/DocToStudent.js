import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import File from '../../../../assets/img/doc/file-removebg-preview.png';
import PdfViewer from './PdfViewer';

function DocToStudent() {
    const [documents, setDocuments] = useState([]);
    const [pdfFiles, setPdfFiles] = useState([]);
    const { id, name } = useParams(); const idUser = parseInt(id);
    const idAdmin = parseInt(localStorage.getItem('auth_id'));

    //get files sent to student
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
                    file: module.default,
                    description: doc.description
                };
            });
        });

        Promise.all(promises).then((pdfFiles) => {
            setPdfFiles(pdfFiles);
        });
    }, [documents]);
    // end files sent to student





    //get files sent by student
    const [docs, setDocs] = useState([]);
    const [files, setFiles] = useState([]);
    //liste of documents send by student to admin  ------------------------------------
    useEffect(() => {
        axios.get(`/api/documents_student_to_admin?user_id=${idUser}`).then(res => {
            if (res.data.status === 200) {
                setDocs(res.data.docs);
            }
        })
    }, [idUser]);

    useEffect(() => {
        const promises2 = docs.map((document) => {
            return import(`C:/xampp/htdocs/Internship-Management-System/front_end/public/documents/${document.file}`)
                .then((module) => {
                    return {
                        title: document.title,
                        file: module.default,
                        description: document.description
                    };
                });
        });

        Promise.all(promises2).then((files) => {
            setFiles(files);
        });
    }, [docs]);

    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px'
    }
    return (
        <div className="container">
            <h6 style={style}> Documents sent by admin</h6>
            <hr />
            <div className="row">
                {pdfFiles.length > 0 ? (
                    pdfFiles.map((pdfFile, index) => (
                        <div key={index} className="col-sm-6 col-md-3" style={{ backgroundColor: 'transparent' }}>
                            <Card className="my-card" style={{ backgroundColor: 'transparent' }}>
                                <Card.Img variant="top" src={File} />
                                <Card.Body>
                                    <Card.Title>{pdfFile.title}</Card.Title>

                                    <PdfViewer pdfFile={pdfFile} />

                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>Pas de documents </p>
                )}
            </div>


            <h6 style={style}> Documents sent by {name}</h6>
            <hr />
            <div className="row">
                {files.length > 0 ? (
                    files.map((pdfFile, index) => (
                        <div key={index} className="col-sm-6 col-md-3" style={{ backgroundColor: 'transparent' }}>
                            <Card className="my-card" style={{ backgroundColor: 'transparent' }}>
                                <Card.Img variant="top" src={File} />
                                <Card.Body>
                                    <Card.Title>{pdfFile.title}</Card.Title>

                                    <PdfViewer pdfFile={pdfFile} />

                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>Pas de documents </p>
                )}
            </div>
        </div >
    );
}

export default DocToStudent;
