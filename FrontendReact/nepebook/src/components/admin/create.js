import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles(() => ({

    paper: {
        // marginTop: theme.spacing(8),
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        // margin: theme.spacing(1),
        // backgroundColor: theme.palette.secondary.main,
        margin: 1,
        backgroundColor: '#0a0'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(3),
        marginTop: 3,
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
        marginTop: 4
    },
}));


export default function Create() {
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

    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        title: '',
        ISBN: '',
        authorName: '',
        aboutAuthor: '',
        slug: '',
        excerpt: '',
        content: '',
    });

    const [postData, updateFormData] = useState(initialFormData);
    const [postimage, setPostImage] = useState(null);
    const [postPDF, setPostPDF] = useState(null);

    const classes = useStyles();

    const handleChange = (e) => {
        if ([e.target.name] == 'image') {
            setPostImage({
                image: e.target.files,
            });
            console.log(e.target.files);
        }
        if ([e.target.name] == 'pdf') {
            setPostPDF({
                pdf: e.target.files,
            });
            console.log(e.target.files);
        }
        if ([e.target.name] == 'title') {
            updateFormData({
                ...postData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
                ['slug']: slugify(e.target.value.trim()),
            });
        } else {
            updateFormData({
                ...postData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', postData.title);
        formData.append('ISBN', postData.ISBN);
        formData.append('authorName', postData.authorName);
        formData.append('aboutAuthor', postData.aboutAuthor);
        formData.append('slug', postData.slug);
        formData.append('author', 1);
        formData.append('excerpt', postData.excerpt);
        formData.append('content', postData.content);
        formData.append('image', postimage.image[0]);
        formData.append('pdf', postPDF.pdf[0]);
        axiosInstance.post(`admin/create/`, formData);
        navigate({
            pathname: '/admin/',
        });
        toast.success("Book added Successfully!");
        // window.location.reload();
        // e.preventDefault();
        // axiosInstance
        //     .post(`admin/create/`, {
        //         title: formData.title,
        //         slug: formData.slug,
        //         author: 1,
        //         excerpt: formData.excerpt,
        //         content: formData.content,
        //     })
        //     .then((res) => {
        //         navigate('/admin/');
        //     });
    };



    return (
        <>
            <ToastContainer position="top-center" />

            <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left', marginTop: '20px' }}>
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
                            <Avatar style={{ alignSelf: 'center', marginLeft: '200px' }} className={classes.avatar}></Avatar>
                            <Typography component="h1" variant="h5">
                                Add Book
                            </Typography>
                        </div>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Book Title"
                                    name="title"
                                    autoComplete="title"
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
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="aboutAuthor"
                                    label="About Author"
                                    name="aboutAuthor"
                                    autoComplete="aboutAuthor"
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Add Image</Typography>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="post-image"
                                    onChange={handleChange}
                                    name="image"
                                    type="file"
                                    required
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
                                    value={postData.slug}
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
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>Add PDF</Typography>
                                <input
                                    accept="file/*"
                                    className={classes.input}
                                    id="post-pdf"
                                    onChange={handleChange}
                                    name="pdf"
                                    type="file"
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
                            Create Book
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}