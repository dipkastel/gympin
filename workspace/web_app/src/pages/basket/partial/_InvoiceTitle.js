import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";

const _InvoiceTitle = () => {
    return (
        <Card elevation={3} sx={{m: 1,backgroundColor:"#489391"}}>
            <CardContent sx={{m: 0, pt: 1, pb:"8px !important"}}>
                <Typography variant={"h4"} color={"#ffffff"} >
                    {"بلیط ها"}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default _InvoiceTitle;
