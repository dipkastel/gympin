import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";

const CorporateTotalCredit = ({financeCorporate}) => {
    return (
        <Portlet>
            <PortletHeader title="مجموع اعتبار کارکنان شرکت"/>
            <PortletBody>
                <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                            component="div" sx={{
                    marginY: 1
                }}>
                    {toPriceWithComma((financeCorporate?.TotalCredits || 0)) + " تومان"}
                </Typography>
            </PortletBody>
        </Portlet>
    );
};

export default CorporateTotalCredit;
