import { Avatar, Card, CardHeader } from '@mui/material'
import React from 'react';

export default function SingleReview({ item }) {
    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar style={{ backgroundColor: 'blue' }}>
                            {item?.customer?.user_name?.[0]}
                        </Avatar>
                    }
                    title={item?.title}
                    subheader={item?.customer?.user_name}
                />
            </Card>
        </>
    )
}
