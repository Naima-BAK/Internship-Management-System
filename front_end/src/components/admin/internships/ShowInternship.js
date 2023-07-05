import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../../../assets/admin/css/show.css';

export default function ShowInternship() {


    const navigate = useNavigate();
    const { id } = useParams();
    const [internshipInput, setInternship] = useState([]);





    useEffect(() => {

        axios.get(`/api/show_internship/${id}`).then(res => {

            if (res.data.status === 200) {
                setInternship(res.data.internship);

            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListInternship');
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

                                <div className="user-profile" style={{ marginTop: '70px' }}>
                                    <div className="user-avatar">
                                        <img width={100} src={`../../../../companies_logo/${internshipInput.company_logo}`} alt="Maxwell Admin" />
                                    </div>
                                    <h5 className="user-name">{internshipInput.company_name}</h5>
                                    {/* <div className='col-2 ms-5'>
                                        <Link style={{ marginLeft: '70px' }} to={`/admin/ShowCompany/${internshipInput.company_id}`}>
                                            <img width={30} height={30} src={view} alt="view" />
                                        </Link>
                                    </div> */}
                                    <a href={`/admin/ShowStudent/${internshipInput.company_id}`} >plus d'informations à propos de l'entreprise</a>


                                    <br />

                                    <div className="user-avatar">
                                        <img src={`../../../profile/${internshipInput.image}`} alt="Maxwell Admin" />
                                    </div>
                                    <h5 className="user-name">{internshipInput.student_name}   </h5>
                                    {/* <div className='col-2 ms-5'>
                                        <Link style={{ marginLeft: '70px' }} to={`/admin/ShowStudent/${internshipInput.user_id}`}>
                                            <img width={30} height={30} src={view} alt="view" />
                                        </Link>
                                    </div> */}
                                    <a href={`/admin/ShowStudent/${internshipInput.user_id}`} >plus d'informations à propos de l'étudiant</a>


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
                                    <h6 className="mb-2 text-primary" style={{ marginTop: '15px', color: 'blue', fontSize: '25px' }}>informations du stage</h6>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Thème de stage </label>
                                        <input type="text" className="form-control" id="fullName" value={internshipInput.theme} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >la date de début de stage</label>
                                        <input type="email" className="form-control" id="eMail" value={internshipInput.start_date} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>La date fin de stage</label>
                                        <input type="text" className="form-control" id="phone" value={internshipInput.end_date} readOnly />
                                    </div>
                                </div>



                            </div>

                            {/* ------------- */}


                            <div className="row gutters">

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mt-3 mb-2 text-primary" style={{ color: 'blue', fontSize: '25px' }}>Encadrement

                                    </h6>

                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>L'encadrant de la part de l'university</label>
                                        <input type="name" className="form-control" id="Street" value={internshipInput.university_supervisor} readOnly placeholder="Pas d'enacadrant" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >L'encadrant de l'entreprise</label>
                                        <input type="name" className="form-control" id="ciTy" value={internshipInput.internship_supervisor} readOnly placeholder="Pas d'enacadrant" />
                                    </div>
                                </div>
                            </div>
                            <div className="row gutters">
                                &nbsp; <h5 className='mb-3 mb-md-0'> <Link to={`/admin/AffectSupervisor/${internshipInput.id}`} className='btn btn-info btn-sm'>Affecter un encadrant</Link>
                                </h5></div>

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
