import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdatePassword() {

    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordChange = (event) => {
        setShowPassword(event.target.checked);
    }

    const currentUser = parseInt(localStorage.getItem('auth_id'));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/user/update-password?current_user=${currentUser}`, formData)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    Swal.fire('Success', response.data.message, 'success').then(() => {
                        resetForm();
                    });
                }

            })
            .catch(error => {
                if (error.response.status === 422) {
                    const errors = error.response.data.errors;
                    setFormErrors(errors);
                } else {
                    console.log(error.response.data);
                }
            });
    };

    const resetForm = () => {
        setFormData({
            current_password: '',
            new_password: '',
            new_password_confirmation: ''
        });
    };

    return (
        <div className="container px-4 py-5" id="featured-3">
            <h2 className="pb-2 border-bottom">Modifier votre mot de passe</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3" style={{ marginLeft: '300px' }} >
                <form onSubmit={handleSubmit}>

                    {/* current_password */}
                    <div className="mb-3">
                        <input
                            name="current_password"
                            className="form-control"
                            style={{ width: '400px', height: '40px' }}
                            onChange={handleChange}
                            placeholder="Entrez votre Mot de passe actuel"
                            type={showPassword ? "text" : "password"}
                        />
                    </div>

                    {/* new_password */}
                    <div className="mb-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="new_password"
                            className="form-control"
                            style={{ width: '400px', height: '40px' }}
                            onChange={handleChange}
                            placeholder="Entrez votre nouveau mot de passe"
                        />
                    </div>

                    {/* new_password_confirmation */}
                    <div className="mb-3">
                        <input type={showPassword ? "text" : "password"}
                            className="form-control"
                            style={{ width: '400px', height: '40px' }}
                            name="new_password_confirmation"
                            onChange={handleChange}
                            placeholder="Confirmez votre nouveau mot de passe"
                        />
                    </div>

                    {/* show password */}
                    <label>
                        Afficher le mot de passe
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={handleShowPasswordChange}
                        />
                    </label>

                    {/* form errors */}
                    {Object.keys(formErrors).length > 0 && (
                        <small className='text-danger '
                        >
                            <ul>
                                {Object.values(formErrors).map((error, index) => (
                                    <li key={index} style={{ width: '400px', height: '40px' }}>{error[0]}</li>
                                ))}
                            </ul>
                        </small>
                    )}

                    <br />
                    <button style={{ width: '400px' }} type="submit" className="btn btn-info w-200">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;