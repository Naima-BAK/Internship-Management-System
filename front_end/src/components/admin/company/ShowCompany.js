import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../assets/admin/css/show.css';

export default function ShowCompany() {


    const navigate = useNavigate();
    const { id } = useParams();
    const [companyInput, setCompany] = useState([]);




    useEffect(() => {

        axios.get(`/api/show_company/${id}`).then(res => {

            if (res.data.status === 200) {
                setCompany(res.data.company);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListCompany');
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
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                                    </div>
                                    <h5 className="user-name">{companyInput.name}</h5>
                                    <a href="{companyInput.website}">site web</a>
                                    <br /><br />
                                    <div className="row gutters" >

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-primary" style={{ color: 'red', fontSize: '15px' }}>Contact :</h6>
                                        </div>
                                        <div className="form-group">
                                            <label >{companyInput.phone} </label>
                                            <br />
                                            <label >{companyInput.email} </label>
                                        </div>
                                    </div>
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
                                    <h6 className="mb-2 text-primary" style={{ marginTop: '15px', color: 'blue', fontSize: '25px' }}>information de la société</h6>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Nom </label>
                                        <input type="text" className="form-control" id="fullName" value={companyInput.name} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >l'activité</label>
                                        <input type="email" className="form-control" id="eMail" value={companyInput.activity} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>site web </label>
                                        <input type="text" className="form-control" id="phone" value={companyInput.website} readOnly />
                                    </div>
                                </div>



                            </div>

                            {/* ------------- */}


                            <div className="row gutters">

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mt-3 mb-2 text-primary" style={{ color: 'blue', fontSize: '25px' }}>Localisation</h6>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Rue</label>
                                        <input type="name" className="form-control" id="Street" value={companyInput.address} readOnly placeholder="Enter Street" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Ville</label>
                                        <input type="name" className="form-control" id="ciTy" value={companyInput.city} readOnly placeholder="Enter City" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >pays</label>
                                        <input type="text" className="form-control" id="sTate" value={companyInput.country} readOnly placeholder="Enter State" />
                                    </div>
                                </div>

                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
