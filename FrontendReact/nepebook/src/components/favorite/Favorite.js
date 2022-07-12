import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Headline from '../common/Headline'
import axios from 'axios';
import { domain } from '../../env';
import SingleBook from '../singlebooks/SingleBook';

export default function Favorite() {
    const [books, setBooks] = useState(null);
    useEffect(() => {
        const getFavoriteBooks = async () => {
            await axios({
                url: `${domain}/api/mostviewbooks/`,
                method: 'GET'
            }).then(response => {
                setBooks(response.data)
                console.log("Recommend Books ==", response.data)
            })
        }
        getFavoriteBooks()
    }, [])
    return (
        <>
            <Grid container>
                <Headline title="Favorite" subtitle="Books" />
                {
                    books?.map((item, i) => <Grid key={i} md={2} sm={4} item>
                        <SingleBook book={item?.books} />
                    </Grid>)
                }
            </Grid>
        </>
    )
}
