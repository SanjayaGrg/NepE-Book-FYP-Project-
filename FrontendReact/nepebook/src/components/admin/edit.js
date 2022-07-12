import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
//MaterialUI
import { Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles(() => ({
    paper: {
        // marginTop: theme.spacing(8),
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(3),
        marginTop: 10,
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
        margin: 10
    },
}));

export default function Create() {
    const navigate = useNavigate();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        id: '',
        title: '',
        ISBN: '',
        authorName: '',
        aboutAuthor: '',
        slug: '',
        excerpt: '',
        content: '',

    });

    const [formData, updateFormData] = useState(initialFormData);
    const classes = useStyles();

    useEffect(() => {
        axiosInstance.get('admin/edit/postdetail/' + id).then((res) => {
            updateFormData({
                ...formData,
                ['title']: res.data.title,
                ['ISBN']: res.data.ISBN,
                ['authorName']: res.data.authorName,
                ['aboutAuthor']: res.data.aboutAuthor,
                ['excerpt']: res.data.excerpt,
                ['slug']: res.data.slug,
                ['content']: res.data.content,
            });
            console.log(res.data);
        });
    }, [updateFormData]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.put(`admin/edit/` + id + '/', {
            title: formData.title,
            ISBN: formData.ISBN,
            authorName: formData.authorName,
            aboutAuthor: formData.aboutAuthor,
            slug: formData.slug,
            author: 1,
            excerpt: formData.excerpt,
            content: formData.content,
        });
        navigate({
            pathname: '/admin/',
        });
        toast.success("Book added Successfully!");
        // window.location.reload();
    };



    return (
        <>
            <ToastContainer position="top-center" />

            <Container component="main" maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left', marginTop: '20px' }}>
                <CssBaseline />
                <div className={classes.paper}>

                    <form className={classes.form} noValidate
                        style={{
                            width: '550px',
                            margin: 'auto',
                            background: '#ffffff',
                            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
                            padding: '40px 50px 45px 50px',
                            borderRadius: '15px',
                            transition: 'all o.3s'

                        }}>
                        <Typography>
                            <a href="/admin" style={{ color: 'red', textDecoration: 'underline' }}><ArrowBackIcon />Go back</a>
                        </Typography>
                        <div style={{
                            textAlign: 'center',
                            margin: '0',
                            lineHeight: '1',
                            paddingBottom: '20px'
                        }}>
                            <Typography component="h1" variant="h5">
                                Update Book
                            </Typography>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Book Name"
                                    name="title"
                                    autoComplete="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="ISBN"
                                    label="ISBN Number"
                                    name="ISBN"
                                    autoComplete="ISBN"
                                    value={formData.ISBN}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="authorName"
                                    label="Author Name"
                                    name="authorName"
                                    autoComplete="authorName"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="aboutAuthor"
                                    label="About Author"
                                    name="aboutAuthor"
                                    autoComplete="aboutAuthor"
                                    value={formData.aboutAuthor}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="excerpt"
                                    label="Post Excerpt"
                                    name="excerpt"
                                    autoComplete="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="slug"
                                    label="slug"
                                    name="slug"
                                    autoComplete="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="content"
                                    label="content"
                                    name="content"
                                    autoComplete="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    multiline
                                    rows={8}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Update Post
                        </Button>
                    </form>
                </div>
            </Container>

        </>
    );
}