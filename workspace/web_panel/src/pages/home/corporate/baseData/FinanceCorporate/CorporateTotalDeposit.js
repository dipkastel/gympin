import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";

const CorporateTotalDeposit = ({financeCorporate}) => {
    return (
            <Portlet>
                <PortletHeader title="مجموع شارژ شرکت"/>
                <PortletBody>
                    <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                                component="div" sx={{color:financeCorporate?.TotalDeposit>0?"#3d3d3d":"#a42626",
                        marginY: 1
                    }}>
                        {financeCorporate?.TotalDeposit<0&&"-"}
                        {toPriceWithComma((financeCorporate?.TotalDeposit || 0)) + " تومان"}
                    </Typography>
                </PortletBody>
            </Portlet>
    );
};

export default CorporateTotalDeposit;
