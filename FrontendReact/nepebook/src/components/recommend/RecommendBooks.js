import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from '../../env';
import Headline from '../common/Headline';
import SingleBook from '../singlebooks/SingleBook';
import { Grid } from '@mui/material';

export default function RecommendBooks() {
    const [books, setBooks] = useState(null);

    useEffect(() => {
        const getRecommendBooks = async () => {
            await axios({
                url: `${domain}/api/mostviewbooks/`,
                method: 'GET'
            }).then(response => {
                setBooks(response.data)
                console.log("Recommend Books ==", response.data)
            })
        }
        getRecommendBooks()
    }, [])
    return (
        <>

            <Grid container style={{ marginBottom: "40px" }}>
                <Headline title="Recommended" subtitle="Books" />
                {
                    books?.map((item, i) => <Grid key={i} md={2} sm={4} item>
                        <SingleBook book={item?.books} />
                    </Grid>)
                }
            </Grid>
        </>
    )
}
