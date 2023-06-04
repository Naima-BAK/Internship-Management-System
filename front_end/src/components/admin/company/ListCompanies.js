import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';
import data from '../../../data_country.json';
import data_city from '../../../data_city.json';

function ListCompanies() {

    const [company_list, setCompany_list] = useState([]);
    const [companyInput, setCompany] = useState({
        name: '',
        email: '',
        activity: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        country: '',
        errorsList: [],
    });

    const handlInput = (e) => {
        e.persist();
        setCompany({ ...companyInput, [e.target.name]: e.target.value })
    }
    // get all data from companies table
    useEffect(() => {
        axios.get('/api/view_company').then(res => {
            if (res.data.status === 200) {
                setCompany_list(res.data.company);
            }

        })

    }, []);
    // add data to companies table :----------------------------
    const submitCompany = (e) => {

        e.preventDefault();

        const data = {
            name: companyInput.name,
            email: companyInput.email,
            activity: companyInput.activity,
            website: companyInput.website,
            phone: companyInput.phone,
            address: companyInput.address,
            city: companyInput.city,
            country: companyInput.country,
        }

        axios.post('api/add_company', data).then(res => {
            if (res.data.status === 200) {
                Swal.fire("Success", res.data.message, "success");
            }
            else if (res.data.status === 400) {
                setCompany({ ...companyInput, errorsList: res.data.errors });
            }
        });

    }

    // ----------------------------------------------------------
    // -------------------Function delete : delete company from database ----------------------------------------
    const deleteCompany = (e, id) => {
        e.preventDefault();


        axios.delete(`/api/delete_company/${id}`).then(res => {
            if (res.data.status === 200) {
                const items = company_list.filter(itemC => itemC.id !== id);
                setCompany_list(items)
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
    // ---------------viewCompany_HTMLTABLE : The HTML element represents companies data----------------------------------------------
    // viewCompany_HTMLTABLE : The HTML element represents companies data
    var viewCompany_HTMLTABLE = [];
    viewCompany_HTMLTABLE =
        // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
        company_list.map((item) => {
            return (
                <div key={item.id} className="mx-0 row border-bottom border-200">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-3'>{item.name}</div>
                    <div className='py-3 col-2'>{item.email}</div>
                    {/* <div className='py-3 col-3'>{item.activiy}</div> */}
                    <div className='py-3 col-3'>{item.phone}</div>
                    {/* <div className='py-3 col-2'>{item.address}, {item.city}, {item.country}</div> */}
                    <div className='py-3 col-2 '>
                        <div className='row'>
                            <div className='col-2 ms-5'>
                                <Link to={`/admin/ShowCompany/${item.id}`}>
                                    <img width={24} height={24} src={view} alt="view" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <Link to={`/admin/EditCompany/${item.id}`}>
                                    <img width={24} height={24} src={pencil} alt="pencil" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <a onClick={(e) => deleteCompany(e, item.id)}>
                                    <img width={24} height={24} src={del} alt="del" />
                                </a>
                            </div>

                        </div>
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
        <div>
            <div className="container p-5">
                <div className='card shadow'>
                    <div className="card-header">
                        <h5 className='mb-3 mb-md-0'>
                            <b>
                                <span style={{ fontSize: '22px' }}>
                                    La liste des entreprises
                                </span>
                            </b>

                            &nbsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <Link to="/admin/AddCompany" className='btn btn-sm float-end' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
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
                                                    <input className="form-control" type="text" placeholder="chercher par id" style={{ width: '300px' }} />
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
                                                    <input className="form-control" type="text" placeholder="chercher par nom" style={{ width: '300px' }} />
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
                    <div className="p-0 card-body" style={{ overflowY: 'auto' }}>

                        <div className='mx-0 row ' style={{ backgroundColor: '#03c3ec', color: 'white' }} >
                            <div className='col-1 text-start'>#</div>
                            <div className='col-3'>Nom</div>
                            <div className='col-2'>Email</div>
                            {/* <div className='col-2'>Activité</div> */}
                            <div className='col-3'>Contact</div>
                            {/* <div className='col-2'>Adresse</div> */}
                            <div className='col-2 text-center' style={{ marginLeft: '10px' }}>Actions</div>
                        </div>
                        {viewCompany_HTMLTABLE}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <form onSubmit={submitCompany} id='Company_FORM'>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Nouvelle entreprise</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                {/* <form onSubmit={submitCompany} id='Company_FORM'> */}
                                <div className="mb-3">
                                    <label className="col-form-label">Nom de l'entreprise</label>
                                    <input type="text" className="form-control" onChange={handlInput} value={companyInput.name} name="name" id="name" placeholder="Entrer le nom" />
                                    <small className='text-danger'>{companyInput.errorsList.name}</small>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Email de l'entreprise</label>
                                    <input type="email" className="form-control" onChange={handlInput} value={companyInput.email} name="email" id="email" placeholder="Entrer le l'email" />
                                    <small className='text-danger'>{companyInput.errorsList.email}</small>
                                </div>

                                <div className="mb-3">
                                    <label className="col-form-label">activité de l'entreprise</label>
                                    <input type="text" className="form-control" onChange={handlInput} value={companyInput.activity} name="activity" id="activity" placeholder="Entrer le l'activité" />
                                    <small className='text-danger'>{companyInput.errorsList.activity}</small>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">site web </label>
                                    <input type="text" className="form-control" onChange={handlInput} value={companyInput.website} name="website" id="website" placeholder="Entrer le site web " />
                                    {/* <small className='text-danger'>{companyInput.errorsList.website}</small> */}
                                </div>

                                <label className="col-form-label">Contact :</label>
                                <div className="input-group input-group-merge">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handlInput} value={companyInput.phone} name="phone" id="phone" placeholder="Entrer le numero de telephone" />
                                        <small className='text-danger'>{companyInput.errorsList.phone}</small>
                                    </div> &nbsp;&nbsp;&nbsp;&nbsp;


                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handlInput} value={companyInput.address} name="address" id="address" placeholder="Entrer le l'adresse" />
                                        <small className='text-danger'>{companyInput.errorsList.address}</small>
                                    </div>
                                </div>
                                <div className="input-group input-group-merge">
                                    <div className="mb-3">
                                        <select style={{ width: "", backgroundColor: 'white' }} onChange={handlInput} value={companyInput.city} name="city" id="city" placeholder="Entrer la ville" className='form-control'>
                                            <option >Ville</option>
                                            {
                                                data_city.map((data_city) => {
                                                    return (
                                                        <option value={data_city.name} key={data_city.id}>{data_city.name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        <small className='text-danger'>{companyInput.errorsList.city}</small>
                                    </div>


                                    <div className="mb-3">
                                        <select style={{ width: "", backgroundColor: 'white' }} onChange={handlInput} value={companyInput.country} name="country" id="country" placeholder="Entrer le pays" className='form-control'>
                                            <option >pays</option>
                                            {
                                                data.map((data) => {
                                                    return (
                                                        <option value={data.name} key={data.id}>{data.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <small className='text-danger'>{companyInput.errorsList.country}</small>
                                    </div>
                                </div>


                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ListCompanies;