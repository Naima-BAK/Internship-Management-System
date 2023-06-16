// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
// import axios from 'axios';
// import logo from './logo.png';
// import swal from 'sweetalert';
// import { Img } from 'react-image';
// import { NavDropdown } from 'react-bootstrap';
// function BasicExample() {

//     const navigate = useNavigate();
//     const logoutSubmit = (e) => {
//         e.preventDefault();

//         axios.post('/api/logout').then(res => {
//             if (res.data.status === 200) {
//                 localStorage.removeItem('auth_token');
//                 localStorage.removeItem('auth_name');
//                 swal("Success", res.data.message, "success");
//                 navigate('/');
//             }
//         });

//     }


//     var AuthLi = '';

//     if (!localStorage.getItem('auth_token')) {
//         // navigate(/)
//         <Navigate to="/Login" />
//     } else {
//         AuthLi = (
//             <Dropdown.Item className="nav-item bg-warning" onClick={logoutSubmit}>Se déconnecter</Dropdown.Item >
//         );
//     }


//     return (
//         <>

//             <NavDropdown eventKey={3} style={{ fontSize: `130%`, marginRight: '0px' }}
//                 title={
//                     <div>
//                         <Img src={logo} alt="UserName profile image" roundedCircle style={{ width: '40px' }} />
//                         <span style={{ fontSize: `70%` }}>naima</span>
//                     </div>} >
//                 <NavDropdown.Item eventKey="2">
//                     <Link className="dropdown-item" to="login">
//                         Votre profile
//                     </Link>
//                 </NavDropdown.Item>
//                 <NavDropdown.Item eventKey="1">Paramètres</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 {AuthLi}

//             </NavDropdown >

//         </>
//     );
// }

// export default BasicExample;


import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import logo from './logo.png';
import swal from 'sweetalert'
export default function DropdownExample() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };

    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                navigate('/');
            }
        });

    }


    var AuthLi = '';

    if (!localStorage.getItem('auth_token')) {
        // navigate(/)
        <Navigate to="/Login" />
    } else {
        AuthLi = (
            <Dropdown.Item className="nav-item bg-warning" onClick={logoutSubmit}>Se déconnecter</Dropdown.Item >
        );
    }

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img width={50} src={logo} alt="" style={{ marginRight: 10 }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="">-- Please Select --</Dropdown.Item>
                <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
                <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
                <Dropdown.Item eventKey="option3">Option 3</Dropdown.Item>
                <Dropdown.Divider />
                {AuthLi}
            </Dropdown.Menu>

        </Dropdown>
    );
}