import React, {useContext, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Grid, TextField,
    Typography
} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../../helper/utils";
import {corporatePersonnel_addPersonnelCredit} from "../../../network/api/corporatePersonnel.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _UserBaseData = ({corporatePersonnel,getCorporatePerson}) => {


    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                {corporatePersonnel.User && <CardContent>
                    <Grid container alignItems={"center"}
                          direction="column"
                          justifyContent={"center"}>
                        <Avatar alt={"userImage"}
                                src={(corporatePersonnel.User.Avatar) ? (corporatePersonnel.User.Avatar.Url || "") : ""}
                                sx={{width: 150, height: 150}}/>

                    </Grid>
                </CardContent>}
            </Card>
        </>
    );
};

export default _UserBaseData;
