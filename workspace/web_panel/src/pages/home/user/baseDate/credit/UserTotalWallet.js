import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";

const UserTotalWallet = ({userCredits}) => {
    return (
        <>
            {userCredits &&
            <Portlet>
                <PortletHeader title="مجموع اعتبار کاربر"/>
                <PortletBody>
                    <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                                component="div" sx={{marginY: 1}}>
                        {userCredits.CreditDetails && toPriceWithComma(userCredits.CreditDetails.reduce((a, b) => a + b.CreditPayableAmount, 0)) + " تومان"}
                    </Typography>
                </PortletBody>
            </Portlet>
            }
        </>
    );
};

export default UserTotalWallet;
