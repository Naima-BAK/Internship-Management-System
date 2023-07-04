import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../../../assets/chat_part/css/chat.css';
import SendMessage from './SendMessage';
import UsersList from './UsersList';
import Messages from './Messages';

function Chat() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const currentUser = parseInt(localStorage.getItem('auth_id'));

    //get all users :
    useEffect(() => {
        axios.get(`/api/index_get_students?teacher=${currentUser}`).then(response => {
            setUsers(response.data);
        });
    }, []);

    //get messages between selectedUser and currentUser :
    useEffect(() => {
        if (selectedUser === null) {
            setMessages([]);
            return;
        }
        axios.get(`/api/messages?receiver_id=${selectedUser.id}&sender_id=${currentUser}`).then(res => {
            if (res.data.status === 200) {
                setMessages(res.data.messages);
            }
        })
    }, [selectedUser, currentUser]);

    //send message from current user to selectedUser :
    const handleMessageSend = (message) => {
        axios.post('/api/messages', {
            receiver_id: selectedUser.id,
            sender_id: currentUser,
            message: message,
        }).then(response => {
            setMessages([...messages, response.data]);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <main className="content" >
            <div className="container p-0" >
                <h1 className="h3 mb-3" style={{ marginLeft: '20px', marginRight: '20px' }}>Messages</h1>
                <div className="card" style={{ marginLeft: '20px', marginRight: '20px' }}>
                    <div className="row g-0">
                        <UsersList users={users} currentUser={currentUser} onUserSelect={handleUserSelect} />
                        {
                            selectedUser &&
                            (<>
                                <div className="col-12 col-lg-7 col-xl-9">

                                    <Messages currentUser={currentUser} messages={messages} selectedUser={selectedUser} />
                                    <SendMessage onMessageSend={handleMessageSend} />
                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
            </div>
        </main >
    );
}

export default Chat;