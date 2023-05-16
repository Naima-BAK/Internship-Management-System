import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';

function ListInternship() {


    const [intership_list, setIntership_list] = useState([]);

    useEffect(() => {
        axios.get('/api/view_intership').then(res => {
            if (res.data.status === 200) {
                setIntership_list(res.data.intership);
            }
            setLoading(false);
        })

    }, []);


    const deleteIntership = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete_intership/${id}`).then(res => {
            if (res.data.status === 200) {
                const items = intership_list.filter(itemC => itemC.id !== id);
                setIntership_list(items)
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
    var viewIntership_HTMLTABLE = [];
    // viewintership_HTMLTABLE : The HTML element represents interships data
    viewIntership_HTMLTABLE =
        // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
        intership_list.map((item) => {
            return (

                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.name}</div>
                    <div className='py-3 col-2'>{item.email}</div>
                    <div className='py-3 col-3'>{item.stage_status}</div>
                    <div className='py-3 col-2'>{item.sector}</div>
                    {/* <div className='py-3 col-3'>{item.level}</div> */}
                    <div className='py-3 col-2 text-center'>
                        <div className='row'>

                            <div className='col-2 ms-5'>
                                <Link to={`/admin/ShowIntership/${item.id}`}>
                                    <img width={24} height={24} src={view} alt="view" />
                                </Link>
                            </div>

                            <div className='col-2'>
                                <Link to={`/admin/EditIntership/${item.id}`}>
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

                    <h5 className='mb-3 mb-md-0'>La liste des étudiants
                        <Link to="/admin/AddIntership" className='btn btn-primary btn-sm float-end'>Ajouter un étudiant</Link>
                    </h5>

                </div>
                <div className="p-0 card-body">

                    <div className='mx-0 row text-center'>
                        <div className='col-1 text-start'>ID</div>
                        <div className='col-2'>Nom</div>
                        <div className='col-2'>Email</div>
                        <div className='col-2'>statut de stage</div>
                        <div className='col-3'>Filiere</div>

                        <div className='col-2'>Actions</div>
                    </div>

                    {viewIntership_HTMLTABLE}

                </div>
            </div>
        </div>
    )

}
export default ListInternship;