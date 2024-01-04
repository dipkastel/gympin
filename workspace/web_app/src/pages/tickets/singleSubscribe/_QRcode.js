import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import QRCode from "react-qr-code";
import {qrCode_getCode} from "../../../network/api/qrCode.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _QRcode = ({subscribe}) => {

    const error = useContext(ErrorContext);
    const [code, SetCode] = useState(null);
    let lock = false;

    useEffect(() => {
        getCodeOfSubscribe();
        setInterval(function () {
            getCodeOfSubscribe();
        }, 2 * 60 * 1000)
    }, []);

    function getCodeOfSubscribe() {
        console.log("called code",lock)
        if(lock)return;
        lock = true;

        {console.log("single ------")}
        qrCode_getCode({
            Type:"SUBSCRIBE",
            ReferenceId:subscribe.Id,
        }).then(result => {
            lock =false;
            SetCode(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <Grid
                        container
                        direction={"column"}
                        justifyContent="center"
                        alignItems="center">
                        {code?.QrCode ?
                            <>
                                <QRCode className={"qrCode"} value={code.QrCode}/>
                                <Typography variant={"h1"} sx={{margin: 1}}>{code.QrCode}</Typography>
                            </> :
                                <CircularProgress/>

                        }
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
};

export default _QRcode;
