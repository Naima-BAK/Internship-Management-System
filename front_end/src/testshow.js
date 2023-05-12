import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { MDBContainer, MDBRow, MDBCol, MDBBadge, MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBTypography, MDBCardText } from 'mdb-react-ui-kit';
export default function ShowStudent() {


    // const navigate = useNavigate();
    // const { id } = useParams();
    // const [studentInput, setStudent] = useState([]);


    // const handlInput = (e) => {
    //     e.persist();
    //     setStudent({ ...studentInput, [e.target.name]: e.target.value })
    // }


    // useEffect(() => {

    //     axios.get(`/api/show_student/${id}`).then(res => {

    //         if (res.data.status === 200) {
    //             setStudent(res.data.student);
    //         } else if (res.data.status === 404) {
    //             Swal.fire("Error", res.data.message, "error");
    //             navigate('/admin/ListStudent');
    //         }
    //     });
    // }, [id, navigate]);
    return (
        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="container py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="12" xl="4">
                        <MDBCard style={{ borderRadius: '15px' }}>
                            <MDBCardBody className="text-center">
                                <div className="mt-3 mb-4">
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle" fluid style={{ width: '200px' }} />
                                </div>
                                <MDBTypography tag="h4">le nom </MDBTypography>
                                <MDBCardText className="text-muted mb-4">
                                    filiere de l'étudiant <span className="mx-2">|</span> <a href="#!">email </a>
                                </MDBCardText>

                                <MDBBtn rounded size="lg">
                                    Message now
                                </MDBBtn>
                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <MDBCardText className="mb-1 h5">8471</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">8512</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">4751</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}
