import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { AppBar, Collapse, IconButton, Toolbar, Button } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link as Scroll } from 'react-scroll'
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    appbar: {
        background: 'none',
    },
    appbarTitle: {
        flexGrow: "1",
    },
    icon: {
        color: "#fff",
        fontSize: '2rem'
    },
    appbarWrapper: {
        width: "80%",
        margin: '0 auto'
    },
    container: {
        textAlign: 'center'
    },
    title: {
        color: '#fff',
        fontSize: '3rem'
    },
    btnName: {
        fontSize: '3rem',
        fontWeight: 'bold'
    },
    arrow: {
        color: '#fff',
        fontSize: '2rem'
    },
    expand: {
        color: '#5aff3d',
        fontSize: '4rem'
    }
}));


export default function () {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}
                style={{ background: "none", flexGrow: '1' }}
                elevation={0}>
                <Toolbar className={classes.appbarWrapper} style={{
                    width: "80%",
                    margin: '0 auto'
                }}>
                    <a href="/" style={{ textDecoration: "none", color: '#fff' }}><h1 className={classes.appbarTitle}>Nep E-Book</h1></a>
                    <IconButton>
                        <SortIcon className={classes.icon} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsesHeight={15}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Welcome To <br /> Nep E-Book Store <br />
                        <Link to='/app'>
                            <Button variant="contained" color="success" className={classes.btnName}>
                                Explore Books
                                <IconButton>
                                    <ArrowRightIcon className={classes.arrow} />
                                </IconButton>
                            </Button>
                        </Link>
                    </h1>
                    <Scroll to="place-to-visit" smooth={true}>

                        <IconButton>
                            <ExpandMoreIcon className={classes.expand} />
                        </IconButton>

                    </Scroll>
                </div>
            </Collapse>
        </div>
    )
}