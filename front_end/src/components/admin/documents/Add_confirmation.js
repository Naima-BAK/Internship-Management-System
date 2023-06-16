import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../assets/admin/css/addDoc.css';

import { NavDropdown } from 'react-bootstrap';
export default function Add_confirmation() {

    const [student_list, setStudent_list] = useState([]);
    const [selectedDoc, setSelectedDoc] = React.useState(null);
    const [user, setUser] = React.useState(null);
    // const [selectedDoc2, setSelectedDoc2] = React.useState(null);

    //list of students :
    useEffect(() => {
        axios.get('/api/view_student').then(res => {
            if (res.data.status === 200) {
                setStudent_list(res.data.student);
            }
        })

    }, []);

    const handlInput = (e) => {
        e.persist();
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    }

    const handleDocSelect2 = (event) => {
        setSelectedDoc(event.target.files[0])
    }

    const handleDocSelect = (event) => {
        setSelectedDoc(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("selectedDoc", selectedDoc);
        axios.post('api/upload_confirmation_all', formData).then(res => {

            if (res.data.status === 200) {
                Swal.fire("Success", res.data.message, "success");
            }
            else if (res.data.status === 204) {
                Swal.fire("Error", res.data.message, "error");
            }

        })

    }


    const handleSubmit2 = async (event) => {
    }
    //     event.preventDefault()
    //     const formData = new FormData();

    //     formData.append("selectedDoc2", selectedDoc2);
    //     formData.append("user", user);

    //     axios.post('api/upload_confirmation_one', formData).then(res => {

    //         if (res.data.status === 200) {
    //             Swal.fire("Success", res.data.message, "success");
    //         }
    //         else if (res.data.status === 204) {
    //             Swal.fire("Error", res.data.message, "error");
    //         }

    //     })

    // }

    return (

        <div class="feature col">
            <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            </div>
            <h3 class="fs-2 text-body-emphasis">

            </h3>
            <a href="#test" class="icon-link">
                <div className='btn btn-sm btn-info' >



                    <NavDropdown eventKey={3} style={{ fontSize: `130%`, marginRight: '0px' }}
                        title={
                            <div>
                                Ajouter une confirmation <br />
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z" />
                                </svg>
                            </div>} >
                        <NavDropdown.Item eventKey="2">
                            <div data-bs-toggle="modal" data-bs-target="#all" data-bs-whatever="@mdo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DA70D6" class="bi bi-people" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                </svg>&nbsp;for all users </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item eventKey="1">
                            <div data-bs-toggle="modal" data-bs-target="#one" data-bs-whatever="@mdo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DA70D6" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>&nbsp;
                                for one user
                            </div>
                        </NavDropdown.Item>


                    </NavDropdown >

                </div>

            </a>


            {/* confirmation model for all students: */}
            <div className="modal fade" id="all" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajouter la confirmation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <img style={{ marginLeft: '200px' }} src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" alt="img" />
                                <br />
                                <input type="file" onChange={handleDocSelect} style={{ marginLeft: '100px' }} />
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-info" >ajouter</button>

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* confirmation model for an individual student: */}
            <div className="modal fade" id="one" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit2}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajouter la confirmation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" style={{ marginLeft: '80px' }}>L'étudiant : </label>
                                    <select onChange={handlInput} className="bg-secondary" style={{ color: 'white', width: '300px', height: '30px', marginLeft: '80px' }}
                                        name="user" id="user">

                                        {
                                            student_list.map((student) => {
                                                return (
                                                    <option key={student.id}>{student.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    {/* <select style={{ width: "", backgroundColor: 'white' }} onChange={handlInput} name="company_id" id="company_id" placeholder="Entrer la ville" className='form-control'>

                                        {
                                            student_list.map((student) => {
                                                return (
                                                    <option value={student.id} key={student.id}>{student.name}</option>
                                                )
                                            })
                                        }

                                    </select> */}

                                    {/* <small className='text-danger'>{internshipInput.errorsList.user_id}</ small> */}
                                </div>
                                <img style={{ marginLeft: '200px' }} src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" alt="img" />
                                <br />
                                <input type="file" onChange={handleDocSelect2} style={{ marginLeft: '100px' }} />
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-info" >ajouter</button>

                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >





    )
}
