import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import batiment from '../../../assets/admin/assets/img/company/batiment.png';

function AddInternship() {

    const [internshipInput, setInternship] = useState({
        theme: '',
        user_id: '',
        company_id: '',
        university_supervisor_id: '',
        internship_supervisor: '',
        start_date: '',
        end_date: '',
        errorsList: [],
    });

    const handlInput = (e) => {
        e.persist();
        setInternship({
            ...internshipInput, [e.target.name]: e.target.value
        });
    }

    const [student_list, setStudent_list] = useState([]);
    const [company_list, setCompany_list] = useState([]);
    useEffect(() => {
        axios.get('/api/view_student').then(res => {
            if (res.data.status === 200) {
                setStudent_list(res.data.student);
            }
        })

    }, []);
    useEffect(() => {
        axios.get('/api/view_company').then(res => {
            if (res.data.status === 200) {
                setCompany_list(res.data.company);
            }
        })

    }, []);

    const submitInternship = (e) => {
        e.preventDefault();
        const data = {
            theme: internshipInput.theme,
            user_id: internshipInput.user_id,
            company_id: internshipInput.company_id,
            start_date: internshipInput.start_date,
            end_date: internshipInput.end_date,
            university_supervisor: internshipInput.university_supervisor,
            internship_supervisor: internshipInput.internship_supervisor,
        }
        console.log(data);
        axios.post('api/add_internship', data).then(res => {
            if (res.data.status === 200) {
                Swal.fire("Success", res.data.message, "success");
                resetForm();
            }
            else if (res.data.status === 400) {
                setInternship({ ...internshipInput, errorsList: res.data.errors });
            }
        });

        const resetForm = () => {
            setInternship({
                theme: '',
                user_id: '',
                company_id: '',
                university_supervisor_id: '',
                internship_supervisor: '',
                start_date: '',
                end_date: '',
                errorsList: [],
            });
        };
    };
    // const submitInternship = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         theme: internshipInput.theme,
    //         user_id: internshipInput.user_id,
    //         company_id: internshipInput.company_id,
    //         start_date: internshipInput.start_date,
    //         end_date: internshipInput.end_date,
    //         university_supervisor: internshipInput.university_supervisor,
    //         internship_supervisor: internshipInput.internship_supervisor,

    //     }
    //     console.log(data);
    //     axios.post('api/add_internship', data).then(res => {
    //         if (res.data.status === 200) {
    //             Swal.fire("Success", res.data.message, "success");

    //         }
    //         else if (res.data.status === 400) {
    //             setInternship({ ...internshipInput, errorsList: res.data.errors });
    //         }
    //     })
    // }

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
                            Ajouter un stage</ b>
                    </ center>
                </ h5>


                <div className="card-body" id='test2'>
                    <form onSubmit={submitInternship} id='Internship_FORM'>

                        <div class="container">


                            <div class="row">

                                {/* student */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >L'étudiant</label>
                                    <select style={{ width: "", backgroundColor: 'white' }} onChange={handlInput} value={internshipInput.user_id} name="user_id" id="user_id" placeholder="Entrer la ville" className='form-control'>

                                        {
                                            student_list.map((student) => {
                                                return (
                                                    <option value={student.id} key={student.id}>{student.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <small className='text-danger'>{internshipInput.errorsList.user_id}</ small>
                                </div>
                                {/* company */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >L'entreprise</label>
                                    <select style={{ width: "", backgroundColor: 'white' }} onChange={handlInput} value={internshipInput.company_id} name="company_id" id="company_id" placeholder="Entrer la ville" className='form-control'>

                                        {
                                            company_list.map((company) => {
                                                return (
                                                    <option value={company.id} key={company.id}>{company.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <small className='text-danger'>{internshipInput.errorsList.company_id}</ small>
                                </div>
                            </div>

                            <br />

                            <div class="row">
                                {/* activity */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >thème</label>
                                    <input type="text" value={internshipInput.theme} onChange={handlInput} className="form-control" id="theme" name="theme" />
                                    <small className='text-danger'>{internshipInput.errorsList.theme}</small>
                                </div>
                                {/* date debut */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Date début</label>
                                    <input type="text" value={internshipInput.start_date} onChange={handlInput} className="form-control" id="start_date" name="start_date" />
                                    <small className='text-danger'>{internshipInput.errorsList.start_date}</ small>
                                </div>
                                {/* date fin */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >date fin</label>
                                    <input type="text" value={internshipInput.end_date} onChange={handlInput} className="form-control" id="end_date" name="end_date" />
                                    <small className='text-danger'>{internshipInput.errorsList.end_date}</ small>
                                </div>
                            </div>

                            <br />

                            <div class="row">
                                {/* Encadrant université */}
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Encadrant de l'université</label>
                                    <input type="text" value={internshipInput.university_supervisor} onChange={handlInput} className="form-control" id="university_supervisor" name="university_supervisor" />
                                    <small className='text-danger'>{internshipInput.errorsList.university_supervisor}</ small>
                                </div>

                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Encadrant de l'entreeprise</label>
                                    <input type="text" value={internshipInput.internship_supervisor} onChange={handlInput} className="form-control" id="internship_supervisor" name="internship_supervisor" />
                                    <small className='text-danger'>{internshipInput.errorsList.internship_supervisor}</ small>
                                </div>


                            </div>
                        </div>

                        <br />

                        <button type="submit" className="btn btn-block btn-primary float-end"> Ajouter</ button>



                    </form>
                </div>
            </div >
        </div >
    )
}
export default AddInternship;
