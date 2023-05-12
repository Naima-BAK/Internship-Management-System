import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import del from '../../../assets/admin/assets/img/crud_images/trash.gif';
import pencil from '../../../assets/admin/assets/img/crud_images/pencil.gif';
import view from '../../../assets/admin/assets/img/crud_images/view.gif';
function ListTeachers() {
    const [loading, setLoading] = useState(true);
    const [teacher_list, setTeacher_list] = useState([]);

    useEffect(() => {
        axios.get('/api/view_teacher').then(res => {
            if (res.data.status === 200) {
                setTeacher_list(res.data.teacher);
            }
            setLoading(false);
        })

    }, []);

    // -------------------Function delete : delete teacher from database ----------------------------------------
    const deleteTeacher = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete_teacher/${id}`).then(res => {
            if (res.data.status === 200) {
                const items = teacher_list.filter(itemC => itemC.id !== id);
                setTeacher_list(items)
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
    // ---------------viewteacher_HTMLTABLE : The HTML element represents teachers data----------------------------------------------
    var viewTeacher_HTMLTABLE = [];

    if (loading) {
        return (
            <h2>Loading ... </h2>
        )
    }
    else {
        // viewteacher_HTMLTABLE : The HTML element represents teachers data
        viewTeacher_HTMLTABLE =
            // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
            teacher_list.map((item) => {
                return (

                    <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                        <div className='py-3 col-1 text-start'>{item.id}</div>
                        <div className='py-3 col-2'>{item.name}</div>
                        <div className='py-3 col-2'>{item.email}</div>
                        <div className='py-3 col-2'>{item.job}</div>
                        <div className='py-3 col-2 text-center'>
                            <div className='row'>

                                <div className='col-2 ms-5'>
                                    <Link to={`/admin/ShowTeacher/${item.id}`}>
                                        <img width={24} height={24} src={view} alt="view" />
                                    </Link>
                                </div>

                                <div className='col-2'>
                                    <Link to={`/admin/EditTeacher/${item.id}`}>
                                        <img width={24} height={24} src={pencil} alt="pencil" />
                                    </Link>
                                </div>

                                <div className='col-2'>
                                    <a onClick={(e) => deleteTeacher(e, item.id)}>
                                        <img width={24} height={24} src={del} alt="del" />
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div >
                )
            })
    }

    return (
        <div className="container p-5">
            <div className='card shadow'>
                <div className="card-header">

                    <h5 className='mb-3 mb-md-0'>La liste des enseignant
                        <Link to="/admin/AddTeacher" className='btn btn-primary btn-sm float-end'>Ajouter un enseaignant</Link>
                    </h5>

                </div>
                <div className="p-0 card-body">

                    <div className='mx-0 row text-center'>
                        <div className='col-1 text-start'>ID</div>
                        <div className='col-2'>Nom</div>
                        <div className='col-2'>Email</div>
                        <div className='col-2'>Filière</div>
                        <div className='col-2'>Actions</div>
                    </div>

                    {viewTeacher_HTMLTABLE}

                </div>
            </div>
        </div>
    )
}
export default ListTeachers;