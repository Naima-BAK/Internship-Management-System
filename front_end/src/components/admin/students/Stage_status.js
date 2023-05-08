import React, { useEffect } from 'react';
import axios from 'axios';
export default function Stage_status() {

    useEffect(() => {
        axios.get('/api/stage_status').then(res => {
            if (res.data.status === 200) {
                setStage_Status(res.data.stageSts);
            }

        })

    }, []);

    var viewStatusStage_HTMLTABLE = [];
    viewStatusStage_HTMLTABLE =
        // La méthode map() vous permet d'exécuter une fonction sur chaque élément du tableau, renvoyant un nouveau tableau comme résultat.
        Stage_Status.map((item) => {
            setStudent({
                stage_status: item.id
            });
            return (
                <div>
                    {/* <select key={item.id} id="defaultSelect" name="stage_status" class="form-select" value={studentInput.stage_status} onChange={handlInput}> */}
                    <option >Le statut de stage</option>
                    <option value={item.id}>{item.status}</option>
                    <option value={item.id}>{item.status}</option>
                    <option value={item.id}>{item.status}</option>
                    {/* </select> */}
                </div>
            )

        });
    return (
        <div>

        </div>
    )
}
