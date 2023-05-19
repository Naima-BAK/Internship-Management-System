import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';

function ListInternship() {


    const [internship_list, setInternship_list] = useState([]);
    const [user, setUser] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios.get('/api/view_internship').then(res => {
            if (res.data.status === 200) {
                setInternship_list(res.data.internship);
                setUser(res.data.user);
                setCompany(res.data.company);
            }

        })

    }, []);


    const deleteIntership = (e, id) => {
        e.preventDefault();
        axios.delete(`/api/delete_internship/${id}`).then(res => {
            if (res.data.status === 200) {
                const items = internship_list.filter(itemC => itemC.id !== id);
                setInternship_list(items)
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

    // ---------------viewintership_HTMLTABLE : The HTML element represents interships data----------------------------------------------
    var viewInternship_HTMLTABLE = [];
    // viewintership_HTMLTABLE : The HTML element represents interships data
    viewInternship_HTMLTABLE =
        // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
        internship_list.map((item) => {

            return (

                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.theme}</div>

                    <div className='py-3 col-2'>
                        {user.map((user) => {
                            if (item.user_id == user.id) {
                                return user.name;
                            }
                        })
                        }
                    </div>

                    <div className='py-3 col-2'>
                        {company.map((company) => {
                            if (item.company_id == company.id) {
                                return company.name;
                            }
                        })
                        }
                    </div>

                    <div className='py-3 col-2'>{item.university_supervisor}</div>
                    <div className='py-3 col-2 text-center'>
                        <div className='row'>

                            <div className='col-2 ms-5'>
                                <Link to={`/admin/ShowInternship/${item.id}`}>
                                    <img width={24} height={24} src={view} alt="view" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <Link to={`/admin/EditInternship/${item.id}`}>
                                    <img width={24} height={24} src={pencil} alt="pencil" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <a onClick={(e) => deleteIntership(e, item.id)}>
                                    <img width={24} height={24} src={del} alt="del" />
                                </a>
                            </div>

                        </div>
                    </div>
                </div >
            )
        });


    return (
        <div className="container p-5">
            <div className='card shadow'>
                <div className="card-header">

                    <h5 className='mb-3 mb-md-0'>La liste des stages
                        <Link to="/admin/AddInternship" className='btn btn-primary btn-sm float-end'>Ajouter un stage</Link>  &nbsp;&nbsp;&nbsp;&nbsp;
                    </h5>

                </div>
                <div className="p-0 card-body">

                    <div className='mx-0 row text-center'>
                        <div className='col-1 text-start'>ID</div>
                        <div className='col-2'>thème de stage</div>
                        <div className='col-2'>Etudiant</div>
                        <div className='col-2'>Entreprise</div>
                        <div className='col-2'>Encadrant</div>

                        <div className='col-2'>Actions</div>
                    </div>

                    {viewInternship_HTMLTABLE}

                </div>
            </div>
        </div>
    )

}
export default ListInternship;