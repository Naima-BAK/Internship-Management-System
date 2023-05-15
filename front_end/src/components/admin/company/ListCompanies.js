import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';

function ListCompanies() {

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
    const [company_list, setCompany_list] = useState([]);
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
    }

    //     axios.delete(`/api/delete_company/${id}`).then(res => {
    //         if (res.data.status === 200) {
    //             const items = company_list.filter(itemC => itemC.id !== id);
    //             setCompany_list(items)
    //             Swal.fire("Success", res.data.message, "success");
    //         }
    //         else if (res.data.status === 404) {
    //             Swal.fire("Erreur", res.data.message, "error")
    //         }
    //         else if (res.data.status === 401) {
    //             Swal.fire("Error", res.data.message, "error");
    //         }
    //     })

    // }



    // ---------------viewCompany_HTMLTABLE : The HTML element represents companies data----------------------------------------------
    var viewCompany_HTMLTABLE = [];

    // viewCompany_HTMLTABLE : The HTML element represents companies data
    viewCompany_HTMLTABLE =
        // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
        company_list.map((item) => {
            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.name}</div>
                    <div className='py-3 col-2'>{item.email}</div>
                    {/* <div className='py-3 col-3'>{item.activiy}</div> */}
                    <div className='py-3 col-3'>{item.phone}</div>
                    {/* <div className='py-3 col-2'>{item.address}, {item.city}, {item.country}</div> */}
                    <div className='py-3 col-2 text-center'>
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


    return (
        <div>
            <div className="container p-5">
                <div className='card shadow'>
                    <div className="card-header">
                        <h5 className='mb-3 mb-md-0'>La liste des entreprises
                            <Link to="/admin/AddCompany" className='btn btn-primary btn-sm float-end' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ajouter une entreprises</Link>
                        </h5>
                    </div>
                    <div className="p-0 card-body">
                        <div className='mx-0 row text-center'>
                            <div className='col-1 text-start'>ID</div>
                            <div className='col-2'>Nom</div>
                            <div className='col-2'>Email</div>
                            {/* <div className='col-2'>Activité</div> */}
                            <div className='col-3'>Contact</div>
                            {/* <div className='col-2'>Adresse</div> */}
                            <div className='col-2'>Actions</div>
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
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Email de l'entreprise</label>
                                    <input type="email" className="form-control" onChange={handlInput} value={companyInput.email} name="email" id="email" placeholder="Entrer le l'email" />
                                </div>

                                <div className="mb-3">
                                    <label className="col-form-label">activité de l'entreprise</label>
                                    <input type="text" className="form-control" onChange={handlInput} value={companyInput.activity} name="activity" id="activity" placeholder="Entrer le l'activité" />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">site web </label>
                                    <input type="text" className="form-control" onChange={handlInput} value={companyInput.website} name="website" id="website" placeholder="Entrer le site web " />
                                </div>

                                <label className="col-form-label">Contact :</label>
                                <div className="input-group input-group-merge">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handlInput} value={companyInput.phone} name="phone" id="phone" placeholder="Entrer le numero de telephone" />
                                    </div> &nbsp;&nbsp;&nbsp;&nbsp;


                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handlInput} value={companyInput.address} name="address" id="address" placeholder="Entrer le l'adresse" />
                                    </div>
                                </div>
                                <div className="input-group input-group-merge">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handlInput} value={companyInput.city} name="city" id="city" placeholder="Entrer la ville" />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;
                                    &nbsp;

                                    <div className="mb-3">
                                        <input type="text" className="form-control" onChange={handlInput} value={companyInput.country} name="country" id="country" placeholder="Entrer le pays" />
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