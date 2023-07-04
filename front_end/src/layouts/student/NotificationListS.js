import React from 'react'
import '../../components/notification/notification.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';
export default function NotificationListS() {


    const [notification, setNotification] = useState([]);
    const id = parseInt(localStorage.getItem('auth_id'));
    useEffect(() => {
        axios.get(`/api/notifications_student?id=${id}`).then(res => {
            if (res.data.status === 200) {
                setNotification(res.data.notifications);
            }
        })
    }, []);
    return (

        <section className="section-50" >
            <div className="container" >
                <center>
                    <div>
                        <h2>Notifications <i className="fa fa-bell text-muted"></i></h2>
                    </div>
                </center>
                <hr />
                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    {notification.map((n, i) => (
                        <div key={i} className="notification-list notification-list--unread" style={{ width: '600px', marginLeft: '250px' }}>
                            <div className="notification-list_content">
                                <div className="notification-list_img">
                                    {/* <img src={n.image} alt={n.title} /> */}
                                </div>
                                <div className="notification-list_detail">
                                    <p className="notification-list_title"><b>{n.type}</b></p>
                                    <p className="notification-list_text">{n.notification}</p>
                                </div>
                            </div>
                            <div className="notification-list_feature-img">
                                <p className="notification-list_time">{moment(n.created_at).fromNow()}</p>                                </div>
                        </div>
                    ))}
                </div>
            </div>



        </section>
    )
}
