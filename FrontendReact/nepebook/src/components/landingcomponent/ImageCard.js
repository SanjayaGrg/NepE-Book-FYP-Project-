import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'rgb(0,0,0,0.5)',
        maxWidth: 545,
        margin: '20px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '2rem'
    },
    desc: {
        fontSize: '1.1rem',
        color: '#ddd',
    }
}));

export default function ImageCard({ place }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                component="img"
                height="440"
                image={process.env.PUBLIC_URL + '/images/cover.jpeg'}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className={classes.title}>
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary" className={classes.desc}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
        </Card>
    );
}