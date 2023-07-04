import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import File from '../../../assets/img/doc/file-removebg-preview.png';
import PdfViewer from '../../admin/documents/view_docs/PdfViewer';
import { useParams } from 'react-router-dom';

export default function ListRapports() {

    const [documents, setDocuments] = useState([]);
    const [pdfFiles, setPdfFiles] = useState([]);

    const student = parseInt(localStorage.getItem('auth_id'));
    const { id } = useParams();
    //get files sent by teacher 
    useEffect(() => {
        axios.get(`/api/Rapports_teacher?student=${student}&teacher=${id}`).then(res => {
            if (res.data.status === 200) {
                setDocuments(res.data.documents);
            }
        })
    }, [id, student]);
    useEffect(() => {
        const promises = documents.map((doc) => {
            return import(`C:/xampp/htdocs/Internship-Management-System/front_end/public/Rapports/${doc.file}`).then((module) => {
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
    // --------------------------


    //get files sent by student
    const [docs, setDocs] = useState([]);
    const [files, setFiles] = useState([]);
    //liste of documents send by student to admin  ------------------------------------
    useEffect(() => {
        axios.get(`/api/Rapport_student?student=${student}`).then(res => {
            if (res.data.status === 200) {
                setDocs(res.data.documents);
            }
        })
    }, [student]);

    useEffect(() => {
        const promises2 = docs.map((document) => {
            return import(`C:/xampp/htdocs/Internship-Management-System/front_end/public/Rapports/${document.file}`)
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
    // end files sent by student

    const style = {
        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px'
    }
    return (
        <div className="container">

            <h6 style={style}> Mes fichiers</h6>
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

            <h6 style={style}> Documents envoyés par l'encadrant</h6>
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

        </div >
    );
}
