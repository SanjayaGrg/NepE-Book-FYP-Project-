import { Box, Button, Card, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { domain } from '../../env';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import SingleReview from '../common/SingleReview';
import NavHeader from '../navbar/NavHeader';
import TrendingBooks from '../trendingbooks/TrendingBooks';
import Footer from '../footer/Footer';
import StripeContainer from '../payment/StripeContainer';
import axiosInstance from '../../axios';

var fileDownload = require('js-file-download');

export default function BookDetails() {
    const [showItem, setShowItem] = useState(false);
    function slugify(string) {
        const a =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }
    const [book, setBook] = useState(null);
    const initialFormData = Object.freeze({
        title: '',
    });
    const [addreview, updateFormData] = useState(initialFormData)
    const { id } = useParams();
    const handleChange = (e) => {
        if ([e.target.name] == 'title') {
            updateFormData({
                ...addreview,
                [e.target.name]: e.target.value.trim(),
            });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', addreview.title);
        // formData.append('id' addreview.id)
        // formData.append(axiosInstance.get(`singlepost/${id}/`))
        await axios({
            url: `${domain}/api/addreview/`,
            method: 'POST',
            data: {
                'id': id,
                formData
            }
        })
        // window.location.reload();
        alert("The review is added.");
    }
    useEffect(() => {
        const getBookDetails = async () => {
            await axios({
                url: `${domain}/api/singlepost/${id}/`,
                method: 'GET'
            }).then(response => {
                setBook(response.data[0])
                console.log(response.data[0])
            })
        }
        getBookDetails()
    }, []);
    useEffect(() => {
        const addbookview = async () => {
            await axios({
                url: `${domain}/api/addbookview/`,
                method: 'POST',
                data: {
                    'id': id
                }
            }).then(response => {
                console.log("Book Details ===", response.data);
            })
        }
        addbookview()
    }, []);
    return (
        <div style={{ backgroundColor: "#000" }}>
            <NavHeader />
            <Container style={{
                paddingTop: '10px',
                marginTop: '30px',
                backgroundColor: '#000'
            }} >
                <Card style={{ backgroundColor: "#000", color: "#fff" }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <img style={{
                                width: '80%',
                                height: '80vh'
                            }}
                                src={book?.image} alt={book?.title} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <Grid container style={{
                            }} >
                                <Grid item xs={12} md={6} lg={6}>
                                    <Typography variant='h4' style={{ fontWeight: 'bold', color: "#fff" }}>
                                        {book?.title}
                                    </Typography>
                                    <Typography>
                                        <Typography style={{ fontWeight: 'bold' }}>ISBN Number: {book?.ISBN}</Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography style={{ fontWeight: 'bold' }}>Genre: {book?.genre}</Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography style={{ fontWeight: 'bold' }}>Author: {book?.authorName}</Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography style={{ fontWeight: 'bold' }}>Status: {book?.status}</Typography>
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card style={{
                                        padding: '10px',
                                        margin: '15px 25px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>

                                        <Button endIcon={<VisibilityIcon />} color='primary' size="large">
                                            {book?.view}
                                        </Button>
                                    </Card>
                                </Grid>
                                <Typography style={{ fontWeight: 'bold', marginTop: '30px' }}>About the Author: </Typography>
                                <Typography>
                                    {book?.aboutAuthor}
                                </Typography>
                                <Typography style={{ fontWeight: 'bold', marginTop: '30px' }}>Summary: </Typography>
                                <Typography>
                                    {book?.content}
                                </Typography>
                                <Typography>
                                    <a href={book?.pdf} download blo className='btn btn-primary'>View and Download Book pdf</a>
                                </Typography>
                                {/* <Button href='#' className='mt-3' style={{ alignItems: 'flex-end', fontWeight: 'bold', backgroundColor: '#f32' }} onClick={() => handlePDFDownload()}>Download PDF</Button> */}


                            </Grid>
                            <h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                color: "#fff"
                            }}>Support this Book</h3>
                            {showItem ? <StripeContainer name={book?.title} /> : <><h3 style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color: "#fff"
                            }}>$10.00</h3> <button style={{
                                display: 'block',
                                fontSize: '16px',
                                width: 'calc(100% - 30px)',
                                height: '40px',
                                margin: '20px 15px 0',
                                backgroundColor: '#f6a4eb',
                                boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6',
                                borderRadius: '4px',
                                color: '#fff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 100ms ease-in-out',
                                willChange: 'transform, background-color, box-shadow',
                                border: 'none',
                            }}
                                onClick={() => setShowItem(true)}>
                                    Support Book
                                </button></>}

                            <Typography variant='h3' align='center' style={{ marginTop: '20px', color: "#fff" }}>
                                Review or Comments:
                            </Typography>
                            <Box p={3}>
                                <TextField
                                    label="Add Review....."
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'whitesmoke'
                                    }}
                                    variant="outlined"
                                    id='title'
                                    required
                                    name='title'
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={handleSubmit}>
                                                <SendIcon />
                                            </IconButton>)
                                    }}
                                />
                                {
                                    book?.review?.map((item, i) =>
                                        <SingleReview key={i} item={item} />
                                    )}
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
                <Container style={{ marginTop: '30px' }}>
                    <TrendingBooks />
                </Container>
            </Container>
            <Footer />
        </div>
    )
}
