import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import teacher from '../../../assets/admin/assets/img/crud_images/teach.gif';
function AddTeacher() {

    const [pass, setPass] = useState();
    const [teacherInput, setTeacher] = useState({
        name: '',
        email: '',
        password: '',
        job: '',
        errorsList: [],
    });
    const form = useRef();

    const handlInput = (e) => {
        e.persist();
        setTeacher({ ...teacherInput, [e.target.name]: e.target.value });
    }

    //function pour générer le password :
    const generatePwd = () => {
        let pass = '';
        let i = 1;
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "azertyuiopqsdfghjklmwcxvbn1234567890#&@";

        for (i = 1; i <= 8; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            setPass(
                pass += str.charAt(char)
            );
        }

        teacherInput.password = pass;
        console.log(pass);
        console.log(teacherInput.password);
    }

    //envoyé les données de formulaire via axios
    const submitteacher = (e) => {
        e.preventDefault();

        const data = {
            name: teacherInput.name,
            email: teacherInput.email,
            password: teacherInput.password,
            job: teacherInput.job,
        }

        console.log(data);

        axios.post('api/add_teacher', data).then(res => {

            if (res.data.status === 200) {
                Swal.fire("Success", res.data.message, "success");
            }
            else if (res.data.status === 400) {
                setTeacher({ ...teacherInput, errorsList: res.data.errors });
            }

        })

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
    const styleButton = {
        width: "260px"
    }
    const styleinp = {
        width: "200px !important"
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y" style={{ marginTop: "200px !important" }} id='test'>

            <div className="card mt-4">

                <h5 className="card-title mt-4 px-2">
                    <center>
                        <img width={200} height={200} src={teacher} alt="del" />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#03c3ec" className="bi bi-person-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                        </svg> */}
                        <br />
                        <b style={mystyle}> Ajouter un enseignant</b>
                    </center>
                </h5>



                <div className="card-body" id='test2'>
                    <form onSubmit={submitteacher} id='Teacher_FORM'>

                        <div className="mb-3">

                            <div className="input-group input-group-merge">

                                {/* name of teacher */}
                                <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg>
                                </span>
                                <input type="text" onChange={handlInput} className="form-control" id="name" name="name" value={teacherInput.name} placeholder="Entrez le nom de l'enseignant" />
                                {/* ******** */}

                                &nbsp;
                                &nbsp;

                                {/* email of teacher */}
                                <span style={spanStyle} id="basic-icon-default-fullname2" className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg>
                                </span>
                                <input type="email" value={teacherInput.email} onChange={handlInput} className="form-control" id="email" name="email" placeholder="Entrez l'email de l'enseignant" />

                                {/* ******** */}

                            </div>
                            <div className="input-group input-group-merge">
                                <small className='text-danger'>{teacherInput.errorsList.name}</small>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




                                <small className='text-danger'>{teacherInput.errorsList.email}</small>

                            </div>

                            {/* password of teacher */}
                            <div ref={form} className="input-group input-group-merge">
                                <span style={spanStyle} id="basic-icon-default-fullname2" className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                    </svg>
                                </span>

                                <input type="password" readOnly value={pass} onChange={handlInput} className="form-control" id="password" name="password" placeholder="génerez le mot de passe de l'enseignant" />

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <button style={{ flex: '0 1 260px' }} onClick={generatePwd} type="button" className="btn btn-info" >génerer un mot de passe</button>
                            </div>
                            {/* ***************** */}
                            <div className="input-group input-group-merge">
                                <small className='text-danger'>{teacherInput.errorsList.password}</small>

                            </div>

                            <br />

                            <div className="input-group input-group-merge">

                                {/* job of teacher */}
                                <span id="basic-icon-default-fullname2" className="input-group-text" style={spanStyle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
                                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
                                    </svg>
                                </span>

                                <input type="text" value={teacherInput.job} onChange={handlInput} className="form-control" id="job" name="job" placeholder="Entrez la filière" />

                                {/* -------------------------------- */}

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <button style={{ flex: '0 1 260px' }} type="submit" className="btn btn-block btn-primary">Ajouter</button>
                            </div>

                            <div className="input-group input-group-merge">
                                <small className='text-danger'>{teacherInput.errorsList.job}</small>
                            </div>

                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default AddTeacher;