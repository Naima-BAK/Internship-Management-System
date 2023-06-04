import { Link } from 'react-router-dom'
import React from 'react';
import '../../../assets/admin/css/addDoc.css';
import Add_confirmation from './Add_confirmation';

export default function AddDocument() {

    return (
        <div class="container px-4 py-5" id="featured-3">
            <h2 class="pb-2 border-bottom">Ajouter les documents</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3" style={{ marginLeft: '70px' }} >

                <Add_confirmation />
                <Add_confirmation />
                <Add_confirmation />

            </div>
        </div>
    )
}
