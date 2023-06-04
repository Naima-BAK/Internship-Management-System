import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../assets/admin/css/st.css';

export default function EditLogo() {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const { id } = useParams();

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const updateLogo = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("selectedFile", selectedFile);
        formData.append("idCompany", id);
        console.log(selectedFile);
        try {
            const response = await axios({
                method: "post",
                url: "/api/upload_logo",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },

            });
            Swal.fire("Success", "", "success");
        } catch (error) {
            console.log(error);
        }
    }


    // style css :
    const mystyle = {
        color: "#03c3ec",
        padding: "20",
        fontFamily: "Arial",
    };
    return (

        <form onSubmit={updateLogo} id='Company_FORM'>


            <div class="frame">
                <div class="center">
                    <div class="title">
                        <h1>Déposer le logo à télécharger</h1>
                    </div>

                    <div class="dropzone">
                        <input type='hidden' value={id} name='idCompany' />
                        <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
                        <input type="file" class="upload-input" onChange={handleFileSelect} />
                    </div>

                    <input type="submit" class="btn btnx" name="uploadbutton" value="Upload file" />

                </div>
            </div>
            <br />





        </form>


    )
}
