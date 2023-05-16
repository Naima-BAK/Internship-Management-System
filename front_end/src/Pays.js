import React, { useState } from 'react';
import data2 from './data_city.json';
import data from './data_country.json';


export default function Pays() {

    return (
        <div>


            <select style={{ width: "", backgroundColor: '#212529' }} name="stage_status" className='btn btn-secondary form-control'>
                <option >lespays</option>
                {
                    data.map((data, i) => {
                        return (
                            <option value={data.name} key={data.id}>{data.name}</option>
                        )
                    })
                }

            </select>


            <select style={{ width: "", backgroundColor: '#212529' }} name="cityi" className='btn btn-secondary form-control'>
                <option >les villes</option>
                {
                    data.map((data2) => {
                        return (
                            <option value={data2.ville} key={data2.id}>{data2.ville}</option>
                        )
                    })
                }

            </select>

        </div>
    )
}
