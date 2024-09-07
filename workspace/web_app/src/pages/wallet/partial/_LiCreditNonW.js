import React from 'react';
import {Divider, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";

const _LiCreditNonW = (credit) => {
    return (
        <>
            <Grid container sx={{mb: 1}} direction={"column"} alignItems={"center"}
                  justifyContent={"space-between"}>
                <Grid container sx={{mb: 1}} direction={"row"} alignItems={"center"}
                      justifyContent={"space-between"}>
                    <ListItemText
                        primary={"asdasdasd"}
                        secondary={<Typography
                            component="p"
                            variant="body2"
                            color={"green"}
                        >
                            {" قابل پرداخت : " + toPriceWithComma(credit.CreditPayableAmount)}

                        </Typography>}
                    />

                    <ListItemText
                        primary={<Typography
                            component="p"
                            variant={"caption"}
                            color="text.primary"
                        >
                            {toPriceWithComma(credit.CreditAmount) + " تومان"}
                        </Typography>}
                        secondary={<Typography
                            component="p"
                            variant="body2"
                            color={"green"}
                        >
                            {" قابل پرداخت : " + toPriceWithComma(credit.CreditPayableAmount)}

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
