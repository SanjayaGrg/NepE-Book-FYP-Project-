import React from "react";
import { makeStyles } from '@mui/styles';
import { CssBaseline } from '@mui/material';
import Header from '../../components/landingcomponent/Header';
import Book from "../../components/landingcomponent/Book";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + "/images/cover.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
}));


export default function () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            {/* <Book /> */}
        </div>
    )
}