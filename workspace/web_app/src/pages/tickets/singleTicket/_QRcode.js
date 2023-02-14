import React, {useEffect, useState} from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import QRCode from "react-qr-code";
import {generateTicketCode, getTicketIdByQr} from "../../../helper/utils";

const _QRcode = ({ticket}) => {
    const [code, SetCode] = useState(8);
    useEffect(() => {
        setInterval(function () {
            SetCode(Math.round(Math.random() * 999));
        }, 2*60 * 1000)
    }, []);
    return (
        <>
            {code && <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <Grid
                        container
                        direction={"column"}
                        justifyContent="center"
                        alignItems="center">
                        <QRCode className={"qrCode"} value={generateTicketCode("1"+ticket.Id)}/>
                        <Typography variant={"h1"} sx={{margin: 1}}>{generateTicketCode("1"+ticket.Id)}</Typography>
                    </Grid>
                </CardContent>
            </Card>}
        </>
    );
};

export default _QRcode;
