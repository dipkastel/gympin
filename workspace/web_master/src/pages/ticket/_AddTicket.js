import React from 'react';
import {Button, Card, CardContent, CardHeader, Typography} from "@mui/material";

const _AddTicket = () => {
    return (
        <>
            <Card elevation={3} sx={{margin:1}}>
                <CardHeader
                    title={"پشتیبانی"}
                    action={(
                        <Button variant={"outlined"}>ایجاد تیکت جدید</Button>
                    )}
                />
                <CardContent>
                    <Typography variant={"body"}>همکاران ما در اسرع وقت پاسخگوی تیکت شما خواهند بود</Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default _AddTicket;
