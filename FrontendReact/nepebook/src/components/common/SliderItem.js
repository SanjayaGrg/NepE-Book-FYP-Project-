import { Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

export default function SliderItem({ item }) {
    return (
        <Paper
            style={{
                height: '600px',
                width: '100%',
                backgroundImage: `url(${item.image})`,
                backgroundSize: '100% 600px'

            }}>
            <Grid style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white'
            }}>
                <Typography variant='h3'>
                    {item?.name}
                </Typography>
                <Typography variant='h6'>
                    {item?.details}
                </Typography>
                <Button color='primary' variant='contained' href='/about'>
                    Learn More
                </Button>
            </Grid>
        </Paper>
    )
}
