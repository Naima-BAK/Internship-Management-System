import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';


function AffectSupervisor() {
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    const { id } = useParams();
    const [internshipInput, setInternship] = useState([]);
    const [teacher_it, setTeacher_it] = useState([]);
    const [teacher_jr, setTeacher_jr] = useState([]);
    const [teacher_agro, setTeacher_agro] = useState([]);
    // const [teacher_gc, setTeacher_gc] = useState([]);

    const handlInput = (e) => {
        e.persist();
        setInternship({
            ...internshipInput, [e.target.name]: e.target.value
        });
    }

    useEffect(() => {

        axios.get(`/api/affect_supervisor/${id}`).then(res => {
            if (res.data.status === 200) {
                setInternship(res.data.internship);
                setTeacher_it(res.data.teacher_it);
                setTeacher_jr(res.data.teacher_jr);
                setTeacher_agro(res.data.teacher_agro);
                // setTeacher_gc(res.data.teacher_gc);

            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListInternship');
            }
        });
    }, [id, navigate]);

    const affectSupervisor = (e) => {
        e.preventDefault();
        const data = internshipInput;
        axios.put(`/api/affect_teacher/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("le champ est obligatoire", "", "error");
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#03c3ec" className="bi bi-person-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                        </svg>
                        <br />
                        <b style={mystyle}> Affecter un encdrant</b>
                    </center>
                </h5>


                <div className="card-body" id='test2'>
                    <form onSubmit={affectSupervisor} id='Student_FORM'>

                        <div class="row">
                            <div class="col-sm">
                                <input style={{ width: '400px', height: '40px', marginLeft: '190px' }} type="text" value={internshipInput.student_name} onChange={handlInput} className="form-control" id="student_name" name="student_name" />

                                <input style={{ width: '400px', height: '40px', marginTop: '15px', marginLeft: '190px' }} type="text" value={internshipInput.student_sector} onChange={handlInput} className="form-control" id="student_name" name="student_name" />
                            </div>

                            <div class="col-sm">
                                <select onChange={handlInput} value={internshipInput.university_supervisor} id='university_supervisor' name='university_supervisor' class="selectpicker" style={{
                                    border: '2px solid #dc3545', width: '400px',
                                    display: 'flex',
                                    height: '50px',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <optgroup label="IT">
                                        {
                                            teacher_it.map((it) => {

                                                return (
                                                    <option value={it.name} key={it.id}>{it.name}</option>
                                                )
                                            })
                                        }
                                    </optgroup>



                                    <optgroup label="Journalisme">
                                        {
                                            teacher_agro.map((agro) => {

                                                return (
                                                    <option value={agro.name} key={agro.id}>{agro.name}</option>
                                                )
                                            })
                                        }
                                    </optgroup>
                                    <optgroup label="Agro-al">
                                        {
                                            teacher_jr.map((jr) => {

                                                return (
                                                    <option value={jr.name} key={jr.id}>{jr.name}

                                                    </option>

                                                )
                                            })
                                        }
                                    </optgroup>
                                </select>
                                <small className='text-danger'>{error.university_supervisor}</ small>

                                {/* **************** */}
                                <button type="submit" style={{ width: '400px', height: '40px', marginTop: '5px' }} className="btn btn-block btn-primary">Mettre à  jour</button>


                            </div>





                        </div>


                    </form>
                </div>
            </div >
        </div >
    )
}
export default AffectSupervisor;


