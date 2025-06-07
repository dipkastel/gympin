import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {corporatePersonnel_addPersonnelCredit} from "../../../../network/api/corporatePersonnel.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import __SelectPersonnel from "../../../../components/__SelectPersonnel";
import {useNavigate} from "react-router";

const _UserAddGroupCredit = () => {

    const navigate = useNavigate();

    return (
        <>
            <Card sx={{m: 2}}>
                <CardActionArea sx={{p: 2, textAlign: "center"}}  onClick={() => navigate("/sport/gympin/increaseGroups")}>
                    افزایش اعتبار گروهی
                </CardActionArea>
            </Card>
        </>
    );
};

export default _UserAddGroupCredit;
