import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../../../assets/admin/css/setting/model.css';
import { BsTrash2Fill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import axios from 'axios';
export default function DeleteAccount() {

    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const currentUser = parseInt(localStorage.getItem('auth_id'));
    //get all users :
    useEffect(() => {
        axios.get('/api/users').then(response => {
            setUsers(response.data);
        });
    }, []);
    //Function delete : delete user from database -------
    const deleteUser = (e, id) => {
        e.preventDefault();

        axios.delete(`/api/delete_User/${currentUser}`).then(res => {
            if (res.data.status === 200) {

                const items = users.filter(itemC => itemC.id !== id);
                setUsers(items);



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
    return (
        <>
            <Button onClick={handleShow} style={{ color: 'white', backgroundColor: '#b22222' }} className="btn btn-danger" >
                <BsTrash2Fill /> Supprimer le compte
            </Button>

            <Modal show={showModal} onHide={handleClose} className="custom-modal">
                <Modal.Header closeButton style={{ backgroundColor: '#ffdead', }}>
                    <Modal.Title>Supprimer le compte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Êtes-vous sûr(e) de vouloir supprimer ce compte ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button onClick={deleteUser} variant="info" style={{ backgroundColor: '#ff7f50', color: 'white', borderColor: '#ff7f50' }}
                    >
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}