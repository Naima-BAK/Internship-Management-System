import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';
import generate from '../../../assets/admin/assets/img/crud_images/generate.gif';

import { Img } from 'react-image';
import { NavDropdown } from 'react-bootstrap';

function ListDocument() {


    const [document_list, setDocument_list] = useState([]);
    const [user, setUser] = useState([]);


    useEffect(() => {
        axios.get('/api/view_document').then(res => {
            if (res.data.status === 200) {
                setDocument_list(res.data.document);
                setUser(res.data.user);
            }
        })

    }, []);


    const deleteDocument = (e, id) => {
        e.preventDefault();
        // axios.delete(`/api/delete_document/${id}`).then(res => {
        //     if (res.data.status === 200) {
        //         const items = document_list.filter(itemC => itemC.id !== id);
        //         setDocument_list(items)
        //         Swal.fire("Success", res.data.message, "success");
        //     }
        //     else if (res.data.status === 404) {
        //         Swal.fire("Erreur", res.data.message, "error")
        //     }
        //     else if (res.data.status === 401) {
        //         Swal.fire("Error", res.data.message, "error");
        //     }
        // })
    }

    var viewDocument_HTMLTABLE = [];
    viewDocument_HTMLTABLE =
        document_list.map((item) => {

            return (

                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>
                        {user.map((user, index) => {
                            if (item.user_id === user.id) {

                                return <span key={index}>{user.name}</span>

                            }
                        })
                        }
                    </div>
                    <div className='py-3 col-2'>{item.confirmation}</div>
                    <div className='py-3 col-2'>{item.convention}</div>

                    <div className='py-3 col-2 text-center'>
                        <div className='row'>

                            <div className='col-2 ms-5'>
                                <Link to={`/admin/ShowDocument/${item.id}`}>
                                    <img width={24} height={24} src={view} alt="view" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <Link to={`/admin/EditDocument/${item.id}`}>
                                    <img width={24} height={24} src={pencil} alt="pencil" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <span onClick={(e) => deleteDocument(e, item.id)}>
                                    <img width={24} height={24} src={del} alt="del" />
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className='py-3 col-2 text-center'>



                        <NavDropdown eventKey={3} style={{ fontSize: `130%`, marginRight: '0px' }}
                            title={

                                <Img src={generate} alt="UserName profile image" roundedCircle style={{ width: '40px' }} />
                            } >
                            <NavDropdown.Item eventKey="2">
                                <Link to={`/admin/DemandeStage/${item.user_id}`}>demande de stage </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item eventKey="1">
                                <Link to={`/admin/Convention/${item.user_id}`}>la convention </Link>
                            </NavDropdown.Item>


                        </NavDropdown >



                    </div>
                </div >
            )
        });

    const stylediv1 = {
        display: 'flex',
        marginLeft: '40px',
        marginTop: '40px'
    }
    return (
        <div className="container p-5">
            <div className='card shadow'>
                <div className="card-header">

                    <h5 className='mb-3 mb-md-0' style={{ backgroundColor: ' white !important' }}>
                        <div className="div1" style={stylediv1}>
                            <div className="div0">
                                <b>
                                    <span style={{ backgroundColor: '#e8fadf !important', fontSize: '20px' }}>
                                        La liste des étudiants
                                    </span>
                                </b>
                            </div>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <div className="div2">
                                <div className="mb-3">
                                    <div className="input-group input-group-merge">
                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="chercher par id" style={{ width: '220px' }} />
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
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                            <div className="div3">
                                <Link to="/admin/AddDocument" className='btn btn-sm float-end'>
                                    <svg data-toggle="modal" data-target="#add" style={{ marginLeft: '100px important' }} xmlns="http://www.w3.org/2000/svg" width="35" height="30" fill="#58D3F7" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <br />



                        <div className="div1" style={stylediv1}>


                            {/* <div className="div2">
                                <div className="mb-3">
                                    <div className="input-group input-group-merge">
                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="chercher par id" />
                                                <button className="btn btn-black bg-black" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div> */}


                            {/* &emsp;&emsp;&emsp;&emsp; */}


                            {/* <div className="div3">
                                <div className="mb-3">
                                    <div className="input-group input-group-merge">
                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="chercher par nom" />
                                                <button className="btn btn-black bg-black" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div> */}

                            {/* &emsp;&emsp;&emsp;&emsp; */}


                            {/* <div className="div3">
                                <div className="mb-3">
                                    <div className="input-group input-group-merge">


                                        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="chercher par status" />
                                                <button className="btn btn-black bg-black" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </h5>
                </div>
                <div className="p-0 card-body">

                    <div className='mx-0 row text-center'>
                        <div className='col-1 text-start'>#</div>
                        <div className='col-2'>étudiant</div>
                        <div className='col-2'>confirmation</div>
                        <div className='col-2'>Convention</div>
                        <div className='col-2'>Actions</div>
                        <div className='col-2'>Autre actions</div>


                    </div>

                    {viewDocument_HTMLTABLE}

                </div>
            </div>
        </div>
    )

}
export default ListDocument;