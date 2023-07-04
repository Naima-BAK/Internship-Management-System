import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AjouterContact from '../frontend/pages/AjouterContact';
import { useEffect } from 'react';
import axios from 'axios';
import view from '../../assets/admin/assets/img/crud_images/view.gif';
import { Link } from 'react-router-dom';



function DashboardS() {
    const [company, setCompany] = useState([]);
    const [teachers, setTeachers] = useState('');
    const [students, setStudents] = useState('');

    useEffect(() => {
        axios.get('/api/student_teacher').then(res => {
            if (res.status === 200) {
                setTeachers(res.data.student);
                setStudents(res.data.teacher);
            }
        })
    }, []);
    useEffect(() => {
        axios.get('/api/view_company').then(res => {
            if (res.data.status === 200) {
                setCompany(res.data.company.length);
            }
        })
    }, []);

    const [supervisor, setSupervisor] = useState([]);

    const id = parseInt(localStorage.getItem('auth_id'));

    useEffect(() => {
        axios.get(`/api/getSupervisor?student=${id}`)
            .then(res => {
                if (res.data.status === 200)
                    setSupervisor(res.data.teacherData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);


    return (
        <>



            <div className="row">

                <div className="col-md-4">
                    <Card style={{ backgroundColor: '#03c3ec', marginLeft: '10px' }}>
                        <CardBody style={{
                            fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Total entreprises</CardTitle>
                            <p>{company}</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody style={{
                            backgroundColor: '#E0B0FF', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Total enseignants </CardTitle>
                            <p>{teachers}</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody style={{
                            backgroundColor: '#ff3e1d', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Total étudiants</CardTitle>
                            <p>{students}</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <hr />
            <div className="row">



                <div className="col-md-6">
                    <Card style={{ marginTop: '40px', marginLeft: '10px' }}>
                        <CardBody style={{
                            fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Votre encadrant </CardTitle>

                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card style={{ marginTop: '40px' }}>
                        <CardBody style={{
                            fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Contacter nous</CardTitle>

                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Card style={{ backgroundColor: 'white', marginTop: '30px', height: '350px', marginLeft: '10px' }} >

                        {supervisor ?
                            (supervisor.map((s, i) => {
                                return (
                                    <CardBody key={i}>
                                        <center>
                                            <CardTitle>
                                                <div className="user-avatar" style={{ marginTop: '40px', marginBottom: '10px' }}>
                                                    <img width={200} src={`../../../profile/${s.image}`} alt="Maxwell Admin" />
                                                </div>
                                            </CardTitle>
                                            <h5 className="user-name">{s.name}</h5>
                                            <h5 className="user-name">{s.email}</h5>

                                            <Link to={`/admin/ShowTeacher/${s.id}`} style={{ marginBottom: '40px' }}>
                                                <img width={24} height={24} src={view} alt="view" title='visualiser son profile' />
                                            </Link>
                                        </center>
                                    </CardBody>
                                )
                            })
                            ) : (
                                <CardBody>
                                    <center>
                                        <CardTitle>
                                        </CardTitle>
                                        <h1 style={{ marginTop: "60px" }}>
                                            pas d'encadrant</h1>
                                    </center>
                                </CardBody>
                            )
                        }
                    </Card>
                </div>

                <div className="col-md-6">


                    <AjouterContact style={{ marginLeft: '20px' }} />

                </div>


            </div >
        </>
    )

}
export default DashboardS;