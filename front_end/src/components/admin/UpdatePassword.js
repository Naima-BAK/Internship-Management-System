import React from 'react'
// import { useState } from 'react';
// import Test_password from './Test_password';
// import axios from 'axios';
// import Swal from 'sweetalert2';

export default function UpdatePassword() {
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };
    // const handleConfirmPasswordChange = (event) => {
    //     setConfirmPassword(event.target.value);
    // };

    // const [showPassword, setShowPassword] = useState(false);



    // const handleShowPasswordChange = (event) => {
    //     setShowPassword(event.target.checked);
    // }

    // const styles = {

    //     btnInfo: {
    //         borderColor: '#007bff'
    //     },
    //     btnPrimaryHover: {
    //         backgroundColor: '#0069d9',
    //         borderColor: '#0062cc'
    //     },
    // };
    // const [error, setError] = useState([]);

    // const updatePassword = (e) => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     data.append('password', password);
    //     console.log(password);
    //     console.log(confirmPassword);

    //     if (confirmPassword == password) {
    //         axios.put(`/api/update_admin_password/${localStorage.getItem('auth_id')}`, data).then(res => {

    //             if (res.data.status === 200) {
    //                 Swal.fire("Success", res.data.message, "success");
    //             }

    //             else if (res.data.status === 404) {
    //                 Swal.fire("Error", res.data.message, "error");
    //             }

    //         });
    //     } else {
    //         Swal.fire("Error", "les mots de passes ne corespond pas", "error");

    //     }

    //     // }
    // }
    return (
        <div className="container px-4 py-5" id="featured-3">
            <h2 className="pb-2 border-bottom">Modifier votre mot de passe</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3" style={{ marginLeft: '300px' }} >


                {/* 
                <form onSubmit={updatePassword}> */}
                {/* <div className="mb-3">
                        <label for="newPassword" className="form-label">Nouveau mot de passe</label>
                        <input
                            style={{ width: '400px', height: '40px' }}

                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Entrez votre nouveau mot de passe"
                            type={showPassword ? "text" : "password"}
                            onChange={handlePasswordChange}
                        />
                    </div> */}
                {/* <small className='text-danger'>{error.password}</small> */}

                {/* <div className="mb-3">
                        <label for="confirmPassword" className="form-label">Confirmer nouveau mot de passe</label>
                        <input
                            style={{ width: '400px', height: '40px' }}
                            className="form-control"
                            id="confirmPassword"
                            name='confirmPassword'
                            placeholder="Confirmez votre nouveau mot de passe"
                            type={showPassword ? "text" : "password"}
                            onChange={handleConfirmPasswordChange}

                        />
                    </div> */}
                {/* <small className='text-danger'>{error.confirmPassword}</small> */}

                {/* <div className="mb-3">
                        <label>
                            Show Password
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={handleShowPasswordChange}
                            />
                        </label>
                    </div>
                    <button style={{ width: '400px' }} type="submit" className="btn btn-info w-200">Submit</button>
                </form> */}



            </div><div>


            </div>
        </div >
    )
}
