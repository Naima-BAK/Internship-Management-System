import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../assets/admin/css/show.css';

export default function ShowTeacher() {


    const navigate = useNavigate();
    const { id } = useParams();
    const [teacherInput, setTeacher] = useState([]);





    useEffect(() => {

        axios.get(`/api/show_teacher/${id}`).then(res => {

            if (res.data.status === 200) {
                setTeacher(res.data.teacher);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListTeacher');
            }
        });
    }, [id, navigate]);
    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                                    </div>
                                    <h5 className="user-name">{teacherInput.name}</h5>
                                </div>
                                <div className="about">
                                    <h5>About</h5>
                                    <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="row gutters" style={{ marginTop: '50px' }}>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                                    <h6 className="mb-2 text-primary">Données de l'enseignant</h6>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Nom et prénom</label>
                                        <input type="text" className="form-control" id="fullName" value={teacherInput.name} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type="email" className="form-control" id="eMail" value={teacherInput.email} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Filière</label>
                                        <input type="text" className="form-control" id="phone" value={teacherInput.job} readOnly />
                                    </div>
                                </div>



                            </div>

                            {/* ------------- */}


                            <div className="row gutters">

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mt-3 mb-2 text-primary">Addresse de l'enseignant</h6>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Rue</label>
                                        <input type="name" className="form-control" id="Street" placeholder="Enter Street" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Ville</label>
                                        <input type="name" className="form-control" id="ciTy" placeholder="Enter City" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >pays</label>
                                        <input type="text" className="form-control" id="sTate" placeholder="Enter State" />
                                    </div>
                                </div>

                            </div>




                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
