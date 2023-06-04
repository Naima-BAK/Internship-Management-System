import React from 'react'
// import Navbar from '../../layouts/frontend/Navbar'
// import Pays from '../../Pays'
// import logo from './logo.png'
// import './nav.css';
// import Nav from './Nav';
// import AddDocument from '../admin/documents/AddDocument';
import BasicExample from './BasicExample';
import Test from '../admin/Test';
export default function Home() {
    console.log(localStorage.getItem('auth_image'))
    return (
        <div>
            {/* <Navbar /> */}
            {/* <p className='title'>
                Bonjour...
            </p> */}
            {/* <AddDocument /> */}

            {/* <BasicExample /> */}
            {/* <Test /> */}

            <img width={50} src={`../../../profile/${localStorage.getItem('auth_image')}`} alt="Maxwell Admin" />



        </div>
    )
}
