import moment from 'moment';
import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import { AiFillFile } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Messages({ messages, currentUser, selectedUser }) {

    return (
        <>
            {/* user info */}
            <div className="py-2 px-4 border-bottom d-none d-lg-block">
                <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                        <img src={`../../../profile/${selectedUser.image}`} className="rounded-circle mr-1" alt="user" width="40" height="40" />
                    </div>
                    <div className="flex-grow-1 pl-3">
                        <strong>{selectedUser.name}</strong>
                        {/* <h2>{selectedUser.id}</h2> */}
                        {/* <div className="text-muted small"><em>Typing...</em></div> */}
                    </div>
                    <div>
                        <NavDropdown className="btn  btn-lg mr-1 px-3" eventKey={3}
                            style={{ fontSize: `130%`, marginRight: '0px' }}
                            title={
                                <AiFillFile size={40} />} >
                            <NavDropdown.Item eventKey="2">
                                <Link className="nav-link collapsed" to={`/student/AddRapport/${selectedUser.id}`}>
                                    <div className="sb-nav-link-icon" title='Ajouter un document'>
                                        Ajout un fichier
                                    </div>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={`/student/ListRapport/${selectedUser.id}`} eventKey="1">
                                List des fichiers
                            </NavDropdown.Item>
                        </NavDropdown>
                        <button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                        <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                        <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                    </div>
                </div>
            </div>
            {/* --------- */}

            {/* chat part */}
            <div className="position-relative">
                <div className="chat-messages p-4">
                    {
                        messages.map(message => (
                            <React.Fragment key={message.id}>
                                {message.sender_id == currentUser ? (
                                    <div className="chat-message-right pb-4" key={message.id}>
                                        <div>
                                            <img src={`../../../profile/${localStorage.getItem('auth_image')}`} className="rounded-circle mr-1" alt="user" width="40" height="40" />
                                            <div className="text-muted small text-nowrap mt-2">{moment(message.created_at).fromNow()}</div>
                                        </div>
                                        <div className="flex-shrink-1 rounded py-2 px-3 mr-3" style={{ backgroundColor: 'd7f5fc' }}>
                                            <div className="font-weight-bold mb-1">{localStorage.getItem('auth_name')}</div>
                                            {message.message}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="chat-message-left pb-4" key={message.id}>
                                        <div>
                                            <img src={`../../../profile/${selectedUser.image}`} className="rounded-circle mr-1" alt="user" width="40" height="40" />
                                            <div className="text-muted small text-nowrap mt-2">{moment(message.created_at).fromNow()}</div>
                                        </div>
                                        <div className="flex-shrink-1 rounded py-2 px-3 mr-3" style={{ backgroundColor: '#e8fadf ' }}>
                                            <div className="font-weight-bold mb-1">{selectedUser.name}</div>
                                            {message.message}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    }

                </div>
            </div>
            {/* end chat part */}
        </>
    )
}
export default Messages;