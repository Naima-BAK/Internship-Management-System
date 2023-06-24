import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Logo() {
    const [setting, setSetting] = useState([]);
    const id = 1;
    //get setting data from database
    useEffect(() => {

        axios.get(`/api/view_setting/${id}`).then(res => {
            if (res.data.status === 200) {
                setSetting(res.data.setting);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
            }
        });
    }, [id]);

    return (
        <div>
            <img width={100} src={`../../../../website_logo/${setting.website_logo}`} className="logo" alt="logo" />

        </div>
    )
}
