import React, { useState, useEffect } from 'react';

import '../../assets/admin/css/show.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Profile() {

    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const [admin, setAdmin] = useState([]);

    // update profile pic :
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const updateProfile = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("selectedFile", selectedFile);
        formData.append("profile_id", localStorage.getItem('auth_id'));
        console.log(selectedFile);
        if (!selectedFile) {
            Swal.fire("Error", "Le champ image est obligatoire !", "error");
        } else {
            axios.post('api/upload_profile_image', formData).then(res => {

                if (res.data.status === 200) {
                    Swal.fire("Success", res.data.message, "success");
                    // resetForm();
                }
            });

        }
    }
    // function resetForm() {
    //     setSelectedFile({
    //         selectedFile: ''
    //     });
    //     document.getElementById('IMAGE_FORM').reset();
    // }
    // ------------------
    const handlInputAdmin = (e) => {
        e.persist();
        setAdmin({ ...admin, [e.target.name]: e.target.value })
    }

    //get admin sata by id :
    useEffect(() => {
        axios.get(`/api/edit_admin_data/${localStorage.getItem('auth_id')}`).then(res => {

            if (res.data.status === 200) {
                setAdmin(res.data.admin);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/profile');
            }
        });
    }, [localStorage.getItem('auth_id'), navigate]);


    const updateAdminData = (e) => {
        e.preventDefault();

        const data = admin;
        console.log(admin.email);
        axios.put(`/api/update_admin_data/${localStorage.getItem('auth_id')}`, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("Tous les champs sont obligatoires", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");

            }
        });
    }

    const spanStyle = {
        backgroundColor: "#d7f5fc ",
    }

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <div className="row gutters">

                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile" style={{ marginTop: '40px' }}>
                                    <div className="user-avatar">
                                        <img src={`../../../profile/${localStorage.getItem('auth_image')}`} alt="Maxwell Admin" />
                                    </div>
                                    <h5 className="user-name">{localStorage.getItem('auth_name')}</h5>
                                    <center> <div className='btn btn-sm btn-info' data-bs-toggle="modal" data-bs-target="#image" data-bs-whatever="@mdo">
                                        Modifier l'image
                                    </div>
                                    </center>
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
                                    <h6 className="mb-2 text-primary">Votre données</h6>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Nom et prénom</label>
                                        <input type="text" className="form-control" id="fullName" value={localStorage.getItem('auth_name')} readOnly />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type="email" className="form-control" id="eMail" value={localStorage.getItem('auth_email')} readOnly />
                                    </div>
                                </div>

                                <br />
                                <div style={{ marginTop: '20px', width: '250px', marginLeft: '550px', color: 'white' }} className='btn btn-sm float-end btn-info' data-bs-toggle="modal" data-bs-target="#info" data-bs-whatever="@mdo">
                                    Modifier votre informations

                                </div>
                            </div>

                            {/* ------------- */}
                        </div>
                    </div>
                </div>

            </div>

            {/* model image */}
            <div className="modal fade" id="image" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <form onSubmit={updateProfile} id='IMAGE_FORM'>

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier votre image </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <label style={{ marginLeft: '100px' }}>Télécharger une image :</label>
                                <input type='hidden' value={localStorage.getItem('auth_id')} name='profile_id' id='profile_id' />
                                <br />
                                <input type="file" onChange={handleFileSelect} style={{ marginLeft: '100px' }} />
                                <br />
                                {/* <small className='text-danger'>{error.image}</ small> */}
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-info" >Mettre à jour</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {/* ---------- */}



            {/* model info */}
            <div className="modal fade" id="info" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <form onSubmit={updateAdminData} id='DATA_FORM'>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier vos informations</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="card-body" id='test2'>



                                    <div className="mb-3">

                                        <div className="input-group input-group-merge">
                                            <input type='hidden' value={localStorage.getItem('auth_id')} />
                                            {/* name of student */}
                                            <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                </svg>
                                            </span>
                                            <input onChange={handlInputAdmin} type="text" className="form-control" id="name" name="name" value={admin.name} />
                                            <small className='text-danger'>{error.name}</small>
                                            {/* ******** */}

                                        </div>
                                        <br />
                                        <div className="input-group input-group-merge">

                                            {/* name of student */}
                                            <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                                </svg>
                                            </span>
                                            <input onChange={handlInputAdmin} type="email" className="form-control" id="email" name="email" value={admin.email} />
                                            <small className='text-danger'>{error.email}</small>
                                            {/* ******** */}

                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-info" >Mettre à jour</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
            {/* ---------- */}


        </div >
    )
}
