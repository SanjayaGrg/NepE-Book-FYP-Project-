import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import { useTheme } from '@mui/material/styles';

// const theme = useTheme();
const useStyles = makeStyles(() => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        // margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor: '#000'
        // theme.palette.type == 'light'
        //     ? theme.palette.grey[200]
        //     : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        // marginBottom: theme.spacing(2),
    },
}));

const Posts = (props) => {
    const { posts } = props;
    const classes = useStyles();
    if (!posts || posts.length === 0) return <p>Can not find any books, sorry</p>;
    return (
        <>
            <Container maxWidth="md" component="main">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="left">Genre</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => {
                                    return (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {post.id}
                                            </TableCell>
                                            <TableCell align="left">{post.genre}</TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    color="textPrimary"
                                                    href={`/p-${post?.title}-${post?.id}`}
                                                    className={classes.link}
                                                >
                                                    {post.title}
                                                </Link>
                                            </TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    color="textPrimary"
                                                    href={'/admin/edit/' + post.id}
                                                    className={classes.link}
                                                >
                                                    <EditIcon></EditIcon>
                                                </Link>
                                                <Link
                                                    color="textPrimary"
                                                    href={'/admin/delete/' + post.id}
                                                    className={classes.link}
                                                >
                                                    <DeleteIcon></DeleteIcon>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow>
                                    <TableCell colSpan={4} align="right">
                                        <Button
                                            href={'/admin/create'}
                                            variant="contained"
                                            color="primary"
                                        >
                                            New Post
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    );
};
export default Posts;