import React, {useEffect} from 'react';
import {account_requestRegisterAdvise} from "../../network/api/account.api";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";

const Redirect = () => {


    const {TO} = useParams();
    const {US} = useParams();

    useEffect(() => {

        var postData = {
            PhoneNumber: "000",
            FullName: US,
            Text: "US"
        }
        if (TO == "x")
            account_requestRegisterAdvise(postData).then(result => {
                window.location.href = "https://gympin.ir/blog-detail/191211343/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%AB%D8%A8%D8%AA-%D9%88%D8%B1%D9%88%D8%AF-%D9%88-%D8%A7%D8%B3%DA%A9%D9%86-%D8%A8%D9%84%DB%8C%D8%B7-%DA%A9%D8%A7%D8%B1%D8%A8%D8%B1%D8%A7%D9%86"
            })
    }, []);


    return (
        <Grid sx={{textAlign: "center", py: "40vh"}}>
            در حال انتقال .... لطفا صبر نمایید

        </Grid>
    );
};

export default Redirect;
