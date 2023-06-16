import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useNavigate, Link, useParams } from 'react-router-dom';
import batiment from '../../../assets/admin/assets/img/company/batiment.png';
import data from '../../../data_country.json';
import data_city from '../../../data_city.json';

function EditCompany() {
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [companyInput, setCompany] = useState([]);

    const handlInput = (e) => {
        e.persist();
        setCompany({
            ...companyInput, [e.target.name]: e.target.value
        });
    }

    useEffect(() => {

        axios.get(`/api/edit_company/${id}`).then(res => {

            if (res.data.status === 200) {
                setCompany(res.data.company);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('/admin/ListCompany');
            }
        });
    }, [id, navigate]);


    const updateCompany = (e) => {
        e.preventDefault();
        const data = companyInput;
        axios.put(`/api/update_company/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("Tous les champs sont obligatoires", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('admin/ListCompany');
            }
        });
    }

    // style css :
    const mystyle = {
        color: "#03c3ec",
        padding: "20",
        fontFamily: "Arial",
    };


    return (
        <div className="container-xxl flex-grow-1 container-p-y" style={{ marginTop: "200px !important" }} id='test'>

            <div className="card mt-4">

                {/* Title */}
                <h5 className="card-title mt-4 px-2">
                    <center>
                        <img width={100} height={100} src={batiment} alt="view" />

                        <br />

                        <b style={mystyle}>
                            Modifier une entreprise</ b>
                    </ center>
                </ h5>


                <div className="card-body" id='test2'>
                    <form onSubmit={updateCompany} id='Company_FORM'>

                        <div class="container">


                            <div class="row">
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Nom de l'entreprise</label>
                                    <input type="text" value={companyInput.name} onChange={handlInput} className="form-control" id="name" name="name" />
                                    <small className='text-danger'>{error.name}</small>
                                </div>
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >email de l'entreprise</label>
                                    <input type="email" value={companyInput.email} onChange={handlInput} className="form-control" id="email" name="email" />
                                    <small className='text-danger'>{error.email}</ small>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Activité</label>
                                    <input type="text" value={companyInput.activity} onChange={handlInput} className="form-control" id="activity" name="activity" />
                                    <small className='text-danger'>{error.activity}</small>
                                </div>
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Télephone</label>
                                    <input type="text" value={companyInput.phone} onChange={handlInput} className="form-control" id="phone" name="phone" />
                                    <small className='text-danger'>{error.phone}</ small>
                                </div>
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >site web</label>
                                    <input type="text" value={companyInput.website} onChange={handlInput} className="form-control" id="website" name="website" />
                                    <small className='text-danger'>{error.website}</ small>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Adresse</label>
                                    <input type="text" value={companyInput.address} onChange={handlInput} className="form-control" id="address" name="address" />
                                    <small className='text-danger'>{error.address}</ small>
                                </div>
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Ville</label>
                                    <select style={{ width: "", backgroundColor: 'white' }} onChange={handlInput} value={companyInput.city} name="city" id="city" placeholder="Entrer la ville" className='form-control'>

                                        {
                                            data_city.map((data_city) => {
                                                return (
                                                    <option value={data_city.name} key={data_city.id}>{data_city.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <small className='text-danger'>{error.city}</ small>
                                </div>
                                <div class="col-sm">
                                    <label class="col-md-4 control-label" >Pays</label>
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
                                    <small className='text-danger'>{error.country}</ small>
                                </div>
                            </div>
                        </div>
                        <br />

                        <Link to={`/admin/EditLogo/${companyInput.id}`}>
                            <button style={{ marginLeft: '800px' }} type="button" className="btn btn-block btn-primary">Modifier le logo</ button>
                        </Link>
                        <button type="submit" className="btn btn-block btn-primary float-end"> Mettre à jour </ button>



                    </form>
                </div>
            </div >
        </div >

    )




}
export default EditCompany;
