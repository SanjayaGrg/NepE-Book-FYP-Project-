import { Container } from '@mui/material';
import React from 'react';
import { Card, Row, Col, CardGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Headline from './common/Headline';


const Posts = (props) => {
    const { posts } = props;

    if (!posts || posts.length === 0) return <p> Cannot find any books.</p>;
    return (
        <React.Fragment>
            <Container>
                <Headline title="Latest" subtitle="Releases Books" />
                <div className='Container mx-3 pt-5 px-2 mb-5 custom-scrollbar'
                    style={{
                        overflow: 'auto',
                    }}>

                    <Row xs={1} md={5} className="g-1" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                        {posts.map((post) => {
                            return (
                                <CardGroup>
                                    <Col xs={12} md={3} key={post.id} >
                                        <NavLink to={`/p-${post?.title}-${post?.id}`} style={{ textDecoration: 'none' }}>

                                            <Card style={{ width: '12rem', marginBottom: '15px', height: '22rem' }} className='mx-4'>
                                                <Card.Img variant="top"
                                                    src={post.image}
                                                    style={{ height: '250px', width: '100%' }} />
                                                <Card.Body style={{ textAlign: 'center' }}>
                                                    <Card.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>{post.title.substr(0, 50)}</Card.Title>
                                                </Card.Body>
                                            </Card>

                                        </NavLink>
                                    </Col>
                                </CardGroup>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Posts;