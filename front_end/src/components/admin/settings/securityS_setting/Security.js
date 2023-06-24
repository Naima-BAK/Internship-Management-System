import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { BsPenFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Security() {
    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px'
    }

    const devices = JSON.parse(localStorage.getItem('devices')) || [];



    return (
        <div className="tab-pane" id="security">
            <h6 style={style}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-lock-fill" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                Les paramètres de sécurité</h6>
            <hr />
            <form>
                <div className="form-group">
                    <label className="d-block" style={style}>Mot de Passe</label>
                    <br />
                    <Button variant='info' className="btn btn-outline btn-info  dim" >
                        <BsPenFill color="black" />&nbsp;
                        <Dropdown.Item as={Link} to="/admin/UpdatePassword"><h6 >Changer votre mot de passe</h6></Dropdown.Item>
                    </Button>
                </div>
            </form>
            <hr />

            <form>
                <div className="form-group mb-0">
                    <label className="d-block" style={style}>Sessions</label>

                    <p className="font-size-sm text-secondary">This is a list of devices that have logged
                        into your account. Revoke any sessions that you do not recognize.</p>
                    <ul className="list-group list-group-sm">







                        {devices.map((device, i) => {
                            const os = device.name.substring(device.name.indexOf("(") + 1, device.name.indexOf(";"));
                            const browser = device.name.substring(device.name.indexOf("Chrome"), device.name.length);

                            return (
                                <li className="list-group-item has-icon" key={i}>
                                    <div>
                                        <h6 className="mb-0">
                                            {os},  {browser}
                                        </h6>
                                        <small className="text-muted"><b>IP : </b>{device.ip_address + ' '}</small>
                                        <small className="text-muted"><b>AT : </b>{' ' + device.connection_date}</small>
                                    </div>
                                </li>
                            );
                        })}


                    </ul>
                </div>
            </form>
            <hr />
        </div>
    )
}
