import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../../../../../back_end/public/images'

const Test = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("selectedFile", selectedFile);
        console.log(selectedFile);
        try {
            const response = await axios({
                method: "post",
                url: "/api/upload_logo",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} placeholder='ajouter le logo' />
                <input type="submit" value="Upload File" />
            </form>

        </div>
    )
}
export default Test;