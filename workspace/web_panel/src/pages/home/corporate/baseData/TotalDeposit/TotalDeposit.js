import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {corporate_getTotalDeposit} from "../../../../../network/api/corporate.api";

const TotalDeposit = ({currentCorporate}) => {
    console.log("cccc",currentCorporate)
    return (
        <Portlet>
            <PortletHeader title="مجموع شارژ شرکت"/>
            <PortletBody>
                <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                            component="div" sx={{
                    marginY: 1
                }}>
                    {toPriceWithComma((currentCorporate.Balance||0))+" تومان"}
                </Typography>
            </PortletBody>
        </Portlet>
    );
};

export default TotalDeposit;
