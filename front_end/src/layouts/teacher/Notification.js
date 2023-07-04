import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Notification({ colors }) {


    const [notification, setNotification] = useState([]);
    const id = parseInt(localStorage.getItem('auth_id'));
    useEffect(() => {
        axios.get(`/api/notifications_teacher?id=${id}`).then(res => {
            if (res.data.status === 200) {
                setNotification(res.data.notifications);
            }
        })
    }, []);

    // Get the count of unread notifications

    const unreadCount = notification.filter(notification => notification.read_at === null).length;

    return (
        <>
            <li className="nav-item">
                <Dropdown >
                    <Dropdown.Toggle variant={colors.navbarbackground} id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={colors.navbarbutton} className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>
                        <span style={{ color: colors.navbarcolor }}>{unreadCount}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item eventKey=""></Dropdown.Item>
                        <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                            {notification.slice().reverse().slice(0, 5).map(n => {

                                return (
                                    <>
                                        <Dropdown.Item eventKey={n.id} >

                                            <div className="notification-list notification-list--unread"
                                                style={{ marginRight: '300px', width: '200px' }}>
                                                <div className="notification-list_content">
                                                    <div className="notification-list_img">
                                                        {/* <img src={n.image} alt={n.title} /> */}
                                                    </div>
                                                    <div className="notification-list_detail">
                                                        <p className="notification-list_title"><b>{n.type}</b></p>
                                                        <p className="notification-list_text">{n.notification}</p>
                                                        <p className="notification-list_date">{moment(n.created_at).fromNow()}</p>

                                                    </div>

                                                </div>

                                            </div>
                                            <hr />




                                        </Dropdown.Item>

                                    </>
                                )
                            })}
                        </div>
                        <Dropdown.Item as={Link} to="/teacher/NotifictationList" eventKey="show-all" >Afficher tout</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>

            </li>





        </>
    )
}
