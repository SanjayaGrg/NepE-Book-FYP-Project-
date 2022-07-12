import { Grid } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { domain } from '../../env';
import Headline from '../common/Headline';
import SingleBook from '../singlebooks/SingleBook';

export default function TrendingBooks() {
    const [books, setBooks] = useState(null);
    useEffect(() => {
        const getTrendingBooks = async () => {
            await axios({
                url: `${domain}/api/trendingbooks/`,
                method: 'GET'
            }).then(response => {
                setBooks(response.data)
                console.log('Trending Products ====', response.data)
            }).catch(e => {
                console.log("Trending Books ==", e);
            })
        }
        getTrendingBooks()
    }, [])
    return (
        <>
            <Grid container style={{ marginBottom: "20px" }}>
                <Headline title="Trending" subtitle="Books" />
                {
                    books?.map((item, i) => <Grid key={i} md={2} sm={4} item>
                        <SingleBook book={item?.books} />
                    </Grid>)
                }
            </Grid>

        </>
    )
}
