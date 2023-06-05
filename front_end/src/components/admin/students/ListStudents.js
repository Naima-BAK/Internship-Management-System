import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';
import { getValue } from '@testing-library/user-event/dist/utils';

function ListStudents() {

    const [loading, setLoading] = useState(true);
    const [student_list, setStudent_list] = useState([]);
    const [search, setSearch] = useState([]);

    //liste of student ------------------------------------
    useEffect(() => {
        axios.get('/api/view_student').then(res => {
            if (res.data.status === 200) {
                setStudent_list(res.data.student);
                setSearch(res.data.student);
            }
            setLoading(false);
        })

    }, []);


    // search by id :

    // const searchById = (e) => {
    //     const id_search = document.getElementById('id_search').value;
    //     setSearch(student_list.filter(f => f.id == id_search));
    // }
    // search by internship status :
    const searchByStatus = (e) => {
        setSearch(student_list.filter(f => f.stage_status.toLowerCase().includes(e.target.value)));
    }
    // search by internship name :
    const searchByName = (e) => {
        setSearch(student_list.filter(f => f.name.toLowerCase().includes(e.target.value)));
    }

    //Function delete : delete student from database -------
    const deleteStudent = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete_student/${id}`).then(res => {
            if (res.data.status === 200) {
                const items = student_list.filter(itemC => itemC.id !== id);
                setStudent_list(items)
                Swal.fire("Success", res.data.message, "success");
            }
            else if (res.data.status === 404) {
                Swal.fire("Erreur", res.data.message, "error")
            }
            else if (res.data.status === 401) {
                Swal.fire("Error", res.data.message, "error");
            }
        })

    }
    // ---------------viewStudent_HTMLTABLE : The HTML element represents students data----------------------------------------------
    var viewStudent_HTMLTABLE = [];

    if (loading) {
        return (
            <h2>Loading ... </h2>
        )
    }
    else {
        // viewStudent_HTMLTABLE : The HTML element represents students data
        viewStudent_HTMLTABLE =
            // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
            search.map((item) => {
                return (

                    <div key={item.id} className="mx-0 row border-bottom border-200">
                        <div className='py-3 col-1 text-start'>{item.id}</div>
                        <div className='py-3 col-3'>{item.name}</div>
                        {/* <div className='py-3 col-2'>{item.email}</div> */}
                        <div className='py-3 col-2'>{item.stage_status}</div>
                        <div className='py-3 col-3'>{item.sector}</div>
                        {/* <div className='py-3 col-3'>{item.level}</div> */}
                        <div className='py-3 col-2'>
                            <div className='row'>

                                <div className='col-2 ms-5 text-start'>
                                    <Link to={`/admin/ShowStudent/${item.id}`}>
                                        <img width={24} height={24} src={view} alt="view" />
                                    </Link>
                                </div>

                                <div className='col-2'>
                                    <Link to={`/admin/EditStudent/${item.id}`}>
                                        <img width={24} height={24} src={pencil} alt="pencil" />
                                    </Link>
                                </div>

                                <div className='col-2'>
                                    <a onClick={(e) => deleteStudent(e, item.id)}>
                                        <img width={24} height={24} src={del} alt="del" />
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div >
                )
            })
    }
    const stylediv1 = {
        display: 'flex',
        marginLeft: '40px',
        marginTop: '40px'
    }
    return (
        <div className="container p-5">
            <div className='card shadow'>
                <div className="card-header">

                    {/* <h5 className='mb-3 mb-md-0'>La liste des étudiants
                        <Link to="/admin/AddStudent" className='btn btn-primary btn-sm float-end'>Ajouter un étudiant</Link>
                    </h5> */}

                    <h5 className='mb-3 mb-md-0' style={{ backgroundColor: ' white !important' }}>
                        <b>
                            <span style={{ backgroundColor: '#e8fadf !important', fontSize: '22px' }}>
                                La liste des étudiants
                            </span>
                        </b>
                        &nbsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <Link to="/admin/AddStudent" className='btn btn-sm float-end'>
                            <svg data-toggle="modal" data-target="#add" style={{ marginLeft: '100px important' }} xmlns="http://www.w3.org/2000/svg" width="35" height="30" fill="#58D3F7" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg>
                        </Link>
                        <br />
                        <div className="div1" style={stylediv1}>


                            <div className="div2">
                                <div className="mb-3">
                                    <div className="input-group input-group-merge">


                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="chercher par nom de étudiant" id='id_search' onChange={searchByName} style={{ width: '300px' }} />
                                                <button className="btn btn-black bg-black" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>


                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;


                            <div className="div3">
                                <div className="mb-3">
                                    <div className="input-group input-group-merge">


                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="chercher par statut de stage" onChange={searchByStatus} style={{ width: '300px' }} />
                                                <button className="btn btn-black bg-black" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>




                        </div>


                    </h5>

                </div>
                <input type='text' className='form-controll' onChange={searchByName} placeholder='search..name........' />
                <div className="p-0 card-body" style={{ overflowY: 'auto' }}>

                    <div className='mx-0 row' style={{ backgroundColor: '#03c3ec', color: 'white' }}  >
                        <div className='col-1 text-start'>ID</div>
                        <div className='col-3' >Nom</div>
                        {/* <div className='col-2'>Email</div> */}
                        <div className='col-2'>statut de stage</div>
                        <div className='col-3'>Filiere</div>
                        {/* <div className='col-2'>Niveau</div> */}
                        <div className='col-2 text-center'>Actions</div>
                    </div>

                    {viewStudent_HTMLTABLE}

                </div>
            </div>
        </div >
    )
}
export default ListStudents;