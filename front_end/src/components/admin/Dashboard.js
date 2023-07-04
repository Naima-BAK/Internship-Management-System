import React from "react";
import BarChart from "./BarChart";
import CircleChart from "./CircleChart";
import { Card, CardBody, CardTitle } from 'reactstrap';
import dash from './settings.gif';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
    // ...
    const [teachers, setTeachers] = useState('');
    const [students, setStudents] = useState('');
    const [student_with, setStudentWith] = useState('');
    const [student_without, setSstudentWithout] = useState('');

    useEffect(() => {
        axios.get('/api/student_teacher').then(res => {
            if (res.status === 200) {
                setTeachers(res.data.student);
                setStudents(res.data.teacher);
            }
        })
    }, []);

    useEffect(() => {
        axios.get('/api/student_status').then(res => {
            if (res.status === 200) {
                setStudentWith(res.data.student_with);
                setSstudentWithout(res.data.student_without + res.data.student_project);
            }

        })
    }, []);

    const [internship, setInternship] = useState([]);
    useEffect(() => {
        axios.get('/api/view_internship').then(res => {
            if (res.data.status === 200) {
                setInternship(res.data.internship.length);
            }
        })

    }, []);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios.get('/api/view_company').then(res => {
            if (res.data.status === 200) {
                setCompany(res.data.company.length);
            }
        })

    }, []);
    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '30px'
    }
    return (
        <div>
            <h1 style={style}>Dashboard</h1>
            <br />
            <div className="row">
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
                            backgroundColor: '#ffab00', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle >Total stagiares</CardTitle>
                            <p>{student_with}</p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Card>
                        <CardBody style={{
                            backgroundColor: '#87AE73', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle >Total étudiants sans stage</CardTitle>
                            <p>{student_without}</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody style={{
                            backgroundColor: '#71dd37', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Toal  stages</CardTitle>
                            <p>{internship}</p>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <CardBody style={{
                            backgroundColor: '#03c3ec', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Total entreprises</CardTitle>
                            <p>{company}</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">

                <div className="col-md-4">
                    <Card >
                        <CardBody style={{
                            backgroundColor: '#e9ecef', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Les étudiant selon leur statut de stage</CardTitle>
                            <BarChart />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card >
                        <CardBody style={{
                            backgroundColor: '#dee2e6', fontFamily: 'Bangers, cursive',
                            fontWeight: 'bold',
                        }}>
                            <CardTitle>Total étudiant et enseignants </CardTitle>
                            <CircleChart />
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card >
                        <CardBody >
                            <img src={dash} width={300} />
                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    );
}
export default Dashboard;
