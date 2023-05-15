// ----------------------------------------------------------
// -------------------Function delete : delete company from database ----------------------------------------
const deleteCompany = (e, id) => {
    e.preventDefault();
}

    //     axios.delete(`/api/delete_company/${id}`).then(res => {
    //         if (res.data.status === 200) {
    //             const items = company_list.filter(itemC => itemC.id !== id);
    //             setCompany_list(items)
    //             Swal.fire("Success", res.data.message, "success");
    //         }
    //         else if (res.data.status === 404) {
    //             Swal.fire("Erreur", res.data.message, "error")
    //         }
    //         else if (res.data.status === 401) {
    //             Swal.fire("Error", res.data.message, "error");
    //         }
    //     })

    // }