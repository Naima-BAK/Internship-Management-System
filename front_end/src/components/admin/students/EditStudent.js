import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
function EditStudent() {

    const [Stage_Status, setStage_Status] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [studentInput, setStudent] = useState([]);


    const handlInput = (e) => {
        e.persist();
        setStudent({ ...studentInput, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get('/api/stage_status').then(res => {
            if (res.data.status === 200) {
                setStage_Status(res.data.stageSts);
            }
        });
    }, []);



    useEffect(() => {

        axios.get(`/api/edit_student/${id}`).then(res => {

            if (res.data.status === 200) {
                setStudent(res.data.student);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListStudent');
            }
        });
    }, [id, navigate]);



    const updateStudent = (e) => {
        e.preventDefault();

        const data = studentInput;
        axios.get(`/api/update_student/${id}`, data).then(res => {
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
                navigate('admin/ListStudent');
            }
        });
    }


    // style css :
    const mystyle = {
        color: "#03c3ec",
        padding: "20",
        fontFamily: "Arial",
    };


    const spanStyle = {
        backgroundColor: "#d7f5fc ",
    }


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
                        <b style={mystyle}> Modifier un étudiant</b>
                    </center>
                </h5>


                <div className="card-body" id='test2'>
                    <form onSubmit={updateStudent} id='Student_FORM'>


                        <div className="mb-3">

                            <div className="input-group input-group-merge">

                                {/* name of student */}
                                <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg>
                                </span>
                                <input type="text" onChange={handlInput} className="form-control" id="name" name="name" value={studentInput.name} />
                                <small className='text-danger'>{error.name}</small>
                                {/* ******** */}

                                &nbsp;
                                &nbsp;

                                {/* email of student */}
                                <span style={spanStyle} id="basic-icon-default-fullname2" className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg>
                                </span>
                                <input type="email" value={studentInput.email} onChange={handlInput} className="form-control" id="email" name="email" />
                                <small className='text-danger'>{error.email}</small>

                                {/* ******** */}

                            </div>

                            <br />

                            <div className="input-group input-group-merge">

                                {/* sector of student */}
                                <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
                                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
                                    </svg>
                                </span>
                                <input type="text" value={studentInput.sector} onChange={handlInput} className="form-control" id="sector" name="sector" />
                                <small className='text-danger'>{error.sector}</small>

                                {/* *************** */}

                                &nbsp;
                                &nbsp;

                                {/* level of student */}
                                <span style={spanStyle} id="basic-icon-default-fullname2" className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                                    </svg>
                                </span>
                                <input type="text" value={studentInput.level} onChange={handlInput} className="form-control" id="level" name="level" />
                                <small className='text-danger'>{error.level}</small>

                                {/* *************** */}
                            </div>

                            <br />

                            <div className="input-group input-group-merge">

                                {/* statue_stage of student */}
                                <select style={{ width: "", backgroundColor: '#212529', color: 'white' }} name="stage_status" onChange={handlInput} value={studentInput.stage_status} className='btn btn-secondary form-control'>
                                    <option >Le statut de stage</option>
                                    {
                                        Stage_Status.map((item) => {
                                            return (
                                                <option value={item.status} key={item.id}>{item.status}</option>
                                            )
                                        })
                                    }

                                </select>
                                &nbsp;
                                &nbsp;
                                <button type="submit" className="btn btn-block btn-primary">Mettre à  jour</button>
                                <small className='text-danger'>{error.stage_status}</small>

                                {/* **************** */}

                            </div>

                            <br />


                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default EditStudent;
