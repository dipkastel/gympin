import React, {useState} from 'react';
import QRScan from "./myScanner";
import {Avatar, Button, Card, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import {Formik} from "formik";
import _ScanUser from "./_ScanUser";
import _ByCode from "./_ByCode";


const Nqrscan = (props) => {
    const [user,setUser] = useState(props.user)
    const [LoginComplete, SetLoginComplete] = useState(false)
    const onFind = (value) => {
        console.log(value)
        if (value === "eg-48465") {
            setUser({
                userId: 1,
                gateName: "ورودی بدنسازی",
                sportName: "بدنسازی",
                image: "/assets/images/1.jpg",
                userName: "ابراهیم گلستان",
                enterCode: "eg-48465"
            })
        }
    }
    return (
        <>
            {user&&<_ScanUser  user={user} LoginComplete={LoginComplete}/>}
            <QRScan onFind={onFind} setUser={setUser}/>
            <_ByCode/>
        </>
    );
};

export default Nqrscan;
