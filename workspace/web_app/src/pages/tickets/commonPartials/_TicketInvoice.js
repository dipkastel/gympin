import React, {useContext, useEffect, useState} from 'react';
import _ScannerCore from "../../qrCode/scanner/_ScannerCore";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    TextField,
    Typography
} from "@mui/material";
import {CropFree, Info} from "@mui/icons-material";
import {link_getByCode} from "../../../network/api/link.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {purchasedSubscribe_addEnterToSubscribe, purchasedSubscribe_enterRequest} from "../../../network/api/purchasedSubscribe.api";
import {useSelector} from "react-redux";
import Lottie from "react-lottie";
import splash from "../../splash/splash.json";

const _ScanQrCode = ({ticket}) => {

    const [paymentSerial, SetpaymentSerial] = useState(ticket?.Serial?.filter(s=>s.ProcessType=="TRA_USE_TICKET")[0]);

    return (
        <div>
            <Alert sx={{mt:1,"& .MuiAlert-message": {
                    width: "100%",
                }}} severity={"success"} variant={"outlined"} >
                {"کد پیگیری پرداخت : "}
                <Typography variant={"h3"} sx={{mt:1,width:"100%",textAlign:"center",fontWeight: 900}} >{paymentSerial?.Serial?.split('-')[paymentSerial.Serial.split('-').length-1]}</Typography>
            </Alert>
        </div>
    );
};

export default _ScanQrCode;
