import { Link, Navigate, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import logo from './logo.png';
import swal from 'sweetalert';
import { Img } from 'react-image';
import { NavDropdown } from 'react-bootstrap';
function BasicExample() {

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
    var naima = "naima";
    if (!localStorage.getItem('auth_token')) {
        // navigate(/)
        <Navigate to="/Login" />
    } else {
        AuthLi = (
            <Dropdown.Item className="nav-item bg-warning" onClick={logoutSubmit}>Se déconnecter</Dropdown.Item >
        );
    }


    return (
        <>

            <NavDropdown eventKey={3} style={{ fontSize: `130%`, marginRight: '0px' }}
                title={
                    <div>
                        <Img src={logo} alt="UserName profile image" roundedCircle style={{ width: '40px' }} />
                        <span style={{ fontSize: `70%` }}>naima</span>
                    </div>} >
                <NavDropdown.Item eventKey="2">
                    <Link className="dropdown-item" to="login">
                        Votre profile
                    </Link>
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="1">Paramètres</NavDropdown.Item>
                <NavDropdown.Divider />
                {AuthLi}

            </NavDropdown >

        </>
    );
}

export default BasicExample;