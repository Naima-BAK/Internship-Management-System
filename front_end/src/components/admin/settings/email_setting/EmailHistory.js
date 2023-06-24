import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
export default function EmailHistory() {

    const [emails, setEmailsHistory] = useState([]);
    useEffect(() => {
        axios.get('/api/view_emails').then(res => {
            if (res.data.status === 200) {
                setEmailsHistory(res.data.emails);
            }
        })

    }, []);
    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px'
    }
    return (
        <div className="tab-pane" id="email">
            <h6 style={style}>

                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                Historique des emails <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg></h6>
            <hr />

            <Container>

                <Row>
                    <Col>
                        <ListGroup>
                            {emails.map((email, i) => (
                                <ListGroup.Item key={i}>
                                    <Card>
                                        <Card.Header>

                                            <h5>{email.subject}</h5>
                                            <span>{email.created_at}</span>

                                            <h6 className="text-muted">  {email.user_email}</h6>

                                        </Card.Header>
                                        <Card.Body>
                                            <p>{email.body}</p>
                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
