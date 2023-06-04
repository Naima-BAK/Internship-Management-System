import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../../../../../back_end/public/images'

const AddDocument = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [selectedDoc, setSelectedDoc] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append("selectedFile", selectedFile);
        formData.append("selectedDoc", selectedDoc);
        try {
            const response = await axios({
                method: "post",
                url: "/api/upload",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
    const handleDocSelect = (event) => {
        setSelectedDoc(event.target.files[0])
    }
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios.get('/api/get_images').then(res => {
            if (res.data.status === 200) {
                setImages(res.data.images);
                console.log(res.data.images);
            }

        })

    }, []);


    var viewStudent_HTMLTABLE = [];
    viewStudent_HTMLTABLE =
        images.map((item) => {
            return (

                <div key={item.id} >
                    <img width={200} src={`../../../../documents/${item.demande_stage_name}`} alt="view" />
                    <br />
                    <a href={`../../../../documents/${item.demande_stage_pdf}`} download={item.demande_stage_pdf} >dowload pdf</a>
                    {item.demande_stage_pdf}

                </div >
            )
        })
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect} />
                <input type="file" onChange={handleDocSelect} />
                <input type="submit" value="Upload File" />
            </form>
            <br />
            <br />
            <br />


            {viewStudent_HTMLTABLE}
        </div>
    )
}
export default AddDocument;