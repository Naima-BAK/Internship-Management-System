import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AjouterContact from '../frontend/pages/AjouterContact';
import { useEffect } from 'react';
import axios from 'axios';
import set from '../admin/settings.gif';
import view from '../../assets/admin/assets/img/crud_images/view.gif';
import { Link } from 'react-router-dom';


function DashboardT() {
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


    const [student_with, setStudentWith] = useState('');
    const [student_without, setSstudentWithout] = useState('');
    useEffect(() => {
        axios.get('/api/student_status').then(res => {
            if (res.status === 200) {
                setStudentWith(res.data.student_with);
                setSstudentWithout(res.data.student_without + res.data.student_project);
            }

        })
    }, []);
    const [studentsData, setStudentsData] = useState([]);

    const id = parseInt(localStorage.getItem('auth_id'));

    useEffect(() => {
        axios.get(`/api/getStudens_supervisor?teacher=${id}`)
            .then(res => {
                if (res.data.status === 200)
                    setStudentsData(res.data.studentsData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);
    return (
        <>



            <div className="row">


                <div className="col-md-3">
                    <Card style={{ backgroundColor: '#ffab00', marginLeft: '10px' }}>
                        <CardBody style={{
                            fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle >Total stagiares</CardTitle>
                            <p>{student_with}</p>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card style={{ backgroundColor: '#03c3ec' }}>
                        <CardBody style={{
                            fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle >Total étudiants sans stage</CardTitle>
                            <p>{student_without}</p>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-3">
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
                <div className="col-md-3">
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

            <div className="row">
                <div className="col-md-6">
                    <h3 style={{ marginTop: '10px' }}> La liste des étudiants que vous allez encadrer  </h3>
                    <Card style={{ backgroundColor: 'white', marginTop: '30px', height: '350px', marginLeft: '10px' }} >
                        <CardBody>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '20px', marginTop: '30px' }}>





                                {students ?
                                    (studentsData.map((s, i) => {
                                        return (
                                            <div key={i}>
                                                <center>
                                                    <div className="user-avatar" style={{ marginTop: '40px', marginBottom: '10px' }}>
                                                        <img style={{
                                                            width: '90px', height: '90px', borderRadius: '100px'
                                                        }} src={`../../../profile/${s.image}`} alt="Maxwell Admin" />
                                                    </div>
                                                    <h5 className="user-name">{s.name}</h5>

                                                    <Link to={`/admin/ShowStudent/${s.id}`} style={{ marginBottom: '40px' }}>
                                                        <img width={24} height={24} src={view} alt="view" title='visualiser son profile' />
                                                    </Link>
                                                </center>
                                            </div>
                                        )
                                    })) : (
                                        <>
                                            pas d'étudiant pour le moment
                                        </>
                                    )
                                }


                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-6" >

                    <h3 style={{ marginTop: '10px' }}> Contact us</h3>

                    <AjouterContact style={{ marginLeft: '20px' }} />

                </div>


            </div >
        </>
    )

}
export default DashboardT;











