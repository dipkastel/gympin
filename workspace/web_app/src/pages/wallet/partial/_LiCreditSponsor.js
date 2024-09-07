import React, {useEffect, useState} from 'react';
import {Divider, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {Album, Stars} from "@mui/icons-material";
import {CorporateContractType} from "../../../helper/enums/CorporateContractType";
import "animate.css"

const _LiCreditSponsor = ({credit}) => {


    function getCorportateName(credit) {
        return (<>
            {credit?.Corporate?.Name}
        </>)
    }

    function getCorportateType(credit) {
        return (<Typography variant={"subtitle2"} className={"animate__animated animate__repeat-3 animate__flash"}>
            {"نوع اعتبار : "+CorporateContractType[credit?.Corporate?.ContractType]}
        </Typography>)
    }

    function getExpireDesc(credit) {
        return (<Typography className={"animate__animated animate__repeat-3 animate__flash"} variant={"subtitle2"}>
            {"انقضا : "+new Date(credit.ExpireDate).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
        </Typography>);
    }

    return (
        <>
            <Grid container sx={{mb: 1}} direction={"column"} alignItems={"center"}
                  justifyContent={"space-between"}>
                <Grid container sx={{mb: 1}} direction={"row"} alignItems={"center"}
                      justifyContent={"space-between"}>
                    <ListItemText
                        primary={getCorportateName(credit)}
                        secondary={getCorportateType(credit)}
                    />

                    <ListItemText
                        primary={toPriceWithComma(credit.CreditAmount) + " تومان"}
                        secondary={getExpireDesc(credit)}
                    />


                </Grid>
                <Divider variant="inset" sx={{margin: 0, padding: 0, width: "100%"}}
                         component="div"/>
            </Grid>
        </>
    );
};

export default _LiCreditSponsor;
