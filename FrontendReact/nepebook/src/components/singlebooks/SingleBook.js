import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, CardGroup } from 'react-bootstrap';

export default function SingleBook({ book }) {
    const [value, setValue] = React.useState(2);
    const navigate = useNavigate();
    const bookDetails = () => {
        navigate(`/p-${book?.title}-${book?.id}`)
    }
    return (
        <>
            <Card onClick={bookDetails} style={{
                marginLeft: '20px',
                marginTop: '15px',
                padding: '2px',
                height: '21rem',
                // width: '1rem'
            }}>
                <Card.Img variant="top"
                    src={book?.image}
                    style={{ height: '230px', width: '100%' }} />
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>{book?.title.substr(0, 50)}</Card.Title>
                </Card.Body>
            </Card>
        </>
    )
}
