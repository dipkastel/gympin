import React, {useState} from 'react';
import QRScan from "./myScanner";
import {Avatar, Button, Card, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import {Formik} from "formik";
import _ScanUser from "./_ScanUser";
import _ByCode from "./_ByCode";

const user = {
    userId: 1,
    gateName: "ورودی بدنسازی",
    sportName: "بدنسازی",
    image: "/assets/images/1.jpg",
    userName: "ابراهیم گلستان",
    enterCode: "55826654"
}

const Nqrscan = (props) => {
    const [LoginComplete, SetLoginComplete] = useState(false)
    const onFind = (value) => {
        console.log(value)
        if (value === user.enterCode) {
            SetLoginComplete(true)
        }
    }
    return (
        <>
            <_ScanUser  user={user} LoginComplete={LoginComplete}/>
            <QRScan onFind={onFind}/>
            <_ByCode/>
        </>
    );
};

export default Nqrscan;
