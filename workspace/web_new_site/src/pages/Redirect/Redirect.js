import React, {useEffect, useState} from 'react';
import {account_requestRegisterAdvise} from "../../network/api/account.api";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {link_getByCode} from "../../network/api/link.api";

const Redirect = () => {


    const {code} = useParams();
    const [codeData,setCodeData]= useState(null)

    useEffect(() => {
        link_getByCode({code}).then(result => {
            console.log(result);
            setCodeData(result.data.Data);
            window.location.href = result.data.Data.Url;
        }).catch(e => {

        });
    }, []);


    return (
        <Grid sx={{textAlign: "center", py: "40vh"}}>
            در حال انتقال .... لطفا صبر نمایید
        </Grid>
    );
};

export default Redirect;
