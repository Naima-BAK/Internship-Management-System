import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useNavigate, Link, useParams } from 'react-router-dom';
import batiment from '../../../assets/admin/assets/img/company/batiment.png';


function EditInternship() {
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [internshipInput, setInternship] = useState([]);

    const handlInput = (e) => {
        e.persist();
        setInternship({
            ...internshipInput, [e.target.name]: e.target.value
        });
    }

    useEffect(() => {

        axios.get(`/api/edit_internship/${id}`).then(res => {

            if (res.data.status === 200) {
                setInternship(res.data.internship);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListInternship');
            }
        });
    }, [id, navigate]);


    const updateInternship = (e) => {
        e.preventDefault();
        const data = internshipInput;
        axios.put(`/api/update_internship/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("Tous les champs sont obligatoires", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('admin/ListInternship');
            }
        });
    }

    // style css :
    const mystyle = {
        color: "#03c3ec",
        padding: "20",
        fontFamily: "Arial",
    };

    return (
        <div className="container-xxl flex-grow-1 container-p-y" style={{ marginTop: "200px !important" }} id='test'>

            <div className="card mt-4">

                {/* Title */}
                <h5 className="card-title mt-4 px-2">
                    <center>
                        <img width={100} height={100} src={batiment} alt="view" />

                        <br />

                        <b style={mystyle}>
                            Modifier un stage</ b>
                    </ center>
                </ h5>


                <div className="card-body" id='test2'>
                    <form onSubmit={updateInternship} id='Internship_FORM'>

                        <div class="container">


                            <div class="row">

                                {/* student */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >L'étudiant</label>
                                    <input type="hidden" value={internshipInput.user_id} onChange={handlInput} />
                                    <input type="text" value={internshipInput.student_name} onChange={handlInput} className="form-control" id="student_name" name="student_name" />
                                    <small className='text-danger'>{error.student_name}</ small>
                                </div>
                                {/* company */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >L'entreprise</label>
                                    <input type="hidden" value={internshipInput.company_id} onChange={handlInput} />
                                    <input type="text" value={internshipInput.company_name} onChange={handlInput} className="form-control" id="company_name" name="company_name" />
                                    <small className='text-danger'>{error.company_name}</ small>
                                </div>
                            </div>

                            <br />

                            <div class="row">
                                {/* activity */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Activité</label>
                                    <input type="text" value={internshipInput.theme} onChange={handlInput} className="form-control" id="theme" name="theme" />
                                    <small className='text-danger'>{error.theme}</small>
                                </div>
                                {/* date debut */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Date début</label>
                                    <input type="text" value={internshipInput.start_date} onChange={handlInput} className="form-control" id="start_date" name="start_date" />
                                    <small className='text-danger'>{error.start_date}</ small>
                                </div>
                                {/* date fin */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >date fin</label>
                                    <input type="text" value={internshipInput.end_date} onChange={handlInput} className="form-control" id="end_date" name="end_date" />
                                    <small className='text-danger'>{error.end_date}</ small>
                                </div>
                            </div>

                            <br />

                            <div class="row">
                                {/* Encadrant université */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Encadrant de l'université</label>
                                    <input type="text" value={internshipInput.university_supervisor} onChange={handlInput} className="form-control" id="university_supervisor" name="university_supervisor" />
                                    <small className='text-danger'>{error.university_supervisor}</ small>
                                </div>

                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Encadrant de l'entreeprise</label>
                                    <input type="text" value={internshipInput.internship_supervisor} onChange={handlInput} className="form-control" id="internship_supervisor" name="internship_supervisor" />
                                    <small className='text-danger'>{error.internship_supervisor}</ small>
                                </div>


                            </div>
                        </div>

                        <br />

                        {/* <Link to={`/admin/EditLogo/${internshipInput.id}`}>
                            <button style={{ marginLeft: '950px' }} type="button" className="btn btn-block btn-primary">Modifier le logo</ button>
                        </Link> */}
                        <button type="submit" className="btn btn-block btn-primary float-end"> Mettre à jour </ button>



                    </form>
                </div>
            </div >
        </div >
    )
}
export default EditInternship;
