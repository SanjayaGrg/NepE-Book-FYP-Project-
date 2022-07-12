import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';
import NavHeader from './navbar/NavHeader';

var fileDownload = require('js-file-download');

export default function Details() {
    const { slug } = useParams();

    const handlePDFDownload = () => {
        axiosInstance.get(`download/`, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, 'filename.pdf');
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const [data, setData] = useState({ posts: [] });
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {
        axiosInstance.get('post/' + slug).then((res) => {
            setData({ posts: res.data });
            console.log(res.data);
        });
    }, [setData]);

    return (
        <React.Fragment>
            <NavHeader />
            <Container fluid='md' className='pt-5 px-5 mb-5'>

                <Container fluid='sm'>
                    <Row>
                        <Col>
                            <Card.Img src={data.posts.image} title='Image Title' style={{ height: '60%', width: '100%' }} alt='..' />
                            <h6 style={{ alignSelf: "center", color: "#000" }}>
                                {data.posts.author}{''}
                            </h6>{''}
                        </Col>
                        <Col>
                            <h1 style={{ alignSelf: "center", color: "#44bd32" }}>
                                {data.posts.title}{''}
                            </h1>{''}
                            <h6 style={{ alignSelf: "center", color: "#000" }}>
                                {data.posts.excerpt}{''}
                            </h6>{''}
                            <h5 style={{ alignContent: "center", color: "#8e44ad", textAlign: 'justify', fontWeight: 'lighter', fontSize: '12pt' }} >
                                {data.posts.content}{''}
                            </h5>{''}
                            <Button variant="warning" href='#' className='mt-3' style={{ alignItems: 'flex-end', fontWeight: 'bold' }} onClick={handlePDFDownload}>Download PDF</Button>{''}
                        </Col>
                    </Row>

                </Container>
            </Container>
        </React.Fragment>
    );

}