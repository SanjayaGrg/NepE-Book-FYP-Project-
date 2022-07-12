import React from "react";
import { makeStyles } from '@mui/styles';
import ImageCard from "./ImageCard";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    }
}));

export default function () {
    const classes = useStyles();
    return (
        <div className={classes.root} id="place-to-visit">
            <ImageCard />
            <ImageCard />
        </div>
    )
}
