import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Companies() {
    const [users, setCompanies] = useState([])

    useEffect(() => {
        axios.get('/api/view_company').then(res => {
            if (res.data.status === 200) {
                setCompanies(res.data.company);
            }

        })

    }, []);

    function chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    const userChunks = chunk(users, 5);
    return (
        <div>
            <main>
                {userChunks.map((chunk, index) => (
                    <div className="row row-cols-1 row-cols-md-5 mb-3 text-center" key={index}>
                        {chunk.map(user => (
                            <div className="col" key={user.id}>
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3" style={{ backgroundColor: '#B0E0E6' }}>
                                        <h4 className="my-0 fw-normal" style={{ fontSize: '12px', color: 'white' }}><b>{user.name}</b></h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">
                                            <img width={100} src={`../../../companies_logo/${user.logo}`} alt={user.name} />
                                        </h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>{user.sector}</li>
                                            <li>{user.level}</li>
                                        </ul>
                                        <button style={{ fontSize: '10px' }} type="button" className="w-100 btn btn-lg btn-outline-info">Afficher le profile</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </main>
        </div>
    )
}