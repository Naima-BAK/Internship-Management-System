import React from 'react'
import Navbar from '../../layouts/frontend/Navbar'
import Pays from '../../Pays'
import logo from './logo.png'
import './nav.css';
import Nav from './Nav';


export default function Home() {
    return (
        <div>
            <Navbar />
            <p className='title'>
                Bonjour.
            </p>

        </div>
    )
}
