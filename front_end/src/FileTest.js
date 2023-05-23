import * as React from "react";
import { useEffect, useState } from "react";

const FileTest = () => {
    const [file, setFile] = useState(null);


    useEffect(() => {
        console.log("File has been set.")
    }, [file]);
    function addImage() {
        const formData = new FormData();
        formData.append('file', file);
        axios.put(`/api/edit_logo_company/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                console.log(formData);
                Swal.fire("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                Swal.fire("le champ image est obligatoire", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate('admin/ListCompany');
            }
        });
    }
    return (
        <form onSubmit={addImage}>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                value={""}
            />
            <button type="submit">ok</button>
        </form>

    )
}
export default FileTest;