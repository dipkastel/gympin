import React from 'react';
import {Divider, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";

const _LiCreditPersonal = ({credit}) => {

    console.log(credit);
    return (
        <>
            <Grid container sx={{mb: 1}} direction={"column"} alignItems={"center"}
                  justifyContent={"space-between"}>
                <Grid container sx={{mb: 1}} direction={"row"} alignItems={"center"}
                      justifyContent={"space-between"}>
                    <ListItemText primary={"کیف پول شخصی"} />
                    <ListItemText
                        sx={{textAlign:"left"}}
                        primary={toPriceWithComma(credit.CreditAmount) + " تومان"} />
                </Grid>
                <Divider variant="inset" sx={{margin: 0, padding: 0, width: "100%"}}
                         component="div"/>
            </Grid>
        </>
    );
};

export default _LiCreditPersonal;
