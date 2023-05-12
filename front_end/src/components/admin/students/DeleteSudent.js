

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import dele from './throwing-trash (1).png';
function DeleteStudent() {

    // const { idDelete } = props;
    const { id } = useParams();
    const navigate = useNavigate();
    const [student_list, setStudent_list] = useState([]);


    const [studentInput, setStudent] = useState([]);




    useEffect(() => {

        axios.get(`/api/show_student/${id}`).then(res => {

            if (res.data.status === 200) {
                setStudent(res.data.student);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListStudent');

            }
        });
    }, [id, navigate]);
    // -------------------Function delete : delete student from database ----------------------------------------
    const deleteStudent = (e, id) => {

        if (!id || id != 0) {
            e.preventDefault();

            axios.delete(`/api/delete_student/${id}`).then(res => {
                if (res.data.status === 200) {
                    const items = student_list.filter(itemC => itemC.id !== id);
                    setStudent_list(items);
                    Swal.fire("Success", res.data.message, "success");
                    window.location.reload();
                }
                else if (res.data.status === 404) {
                    Swal.fire("Erreur", res.data.message, "error")
                }
                else if (res.data.status === 401) {
                    Swal.fire("Error", res.data.message, "error");
                }


            });
        } else {
            navigate('/admin/ListStudent');
        }

    }
    return (
        <div>


            <form onSubmit={deleteStudent}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel"> {studentInput.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Voulez vous vraiment supprimer cet étudiant
                            <br />
                            <center>
                                <img width={150} height={150} src={dele} alt="del" />
                            </center>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">delete</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}
export default DeleteStudent;