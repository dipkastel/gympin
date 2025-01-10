import React from 'react';
import {Divider, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";

const _LiCreditNonW = ({credit}) => {
    return (
        <>
            <Grid container sx={{mb: 1}} direction={"column"} alignItems={"center"}
                  justifyContent={"space-between"}>
                <Grid container sx={{mb: 1}} direction={"row"} alignItems={"center"}
                      justifyContent={"space-between"}>
                    <ListItemText
                        primary={"اعتبار خرید"}
                        secondary={<Typography
                            variant="subtitle2"
                        >
                            {"نوع اعتبار : فقط خرید"}
                        </Typography>}
                    />

                    <ListItemText
                        primary={<Typography
                            variant="subtitle2"
                            sx={{textAlign:"left"}}
                        >

                            {toPriceWithComma(credit.CreditAmount) + " تومان"}
                        </Typography>}
                    />


                </Grid>
                <Divider variant="inset" sx={{margin: 0, padding: 0, width: "100%"}}
                         component="div"/>
            </Grid>
        </>
    );
};

export default _LiCreditNonW;
