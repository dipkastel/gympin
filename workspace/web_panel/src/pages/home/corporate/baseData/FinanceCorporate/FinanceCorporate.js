import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {corporate_getFinanceCorporate, corporate_getTotalDeposit} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {user_getFinanceUser} from "../../../../../network/api/user.api";

const FinanceCorporate = ({currentCorporate}) => {
    const error = useContext(ErrorContext);
    const [totalCredit, SetTotalCredit] = useState(0);
    useEffect(() => {
        console.log(currentCorporate.Id)
        corporate_getFinanceCorporate({id: currentCorporate.Id}).then(result => {
            console.log(result)
            SetTotalCredit(result.data.Data);

        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    return (
        <>
            <Portlet>
                <PortletHeader title="مجموع شارژ شرکت"/>
                <PortletBody>
                    <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                                component="div" sx={{
                        marginY: 1
                    }}>
                        {toPriceWithComma((totalCredit.TotalDeposit||0))+" تومان"}
                    </Typography>
                </PortletBody>
            </Portlet>
            <Portlet>
                <PortletHeader title="مجموع اعتبار کارکنان شرکت"/>
                <PortletBody>
                    <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                                component="div" sx={{
                        marginY: 1
                    }}>
                        {toPriceWithComma((totalCredit.TotalCredits||0))+" تومان"}
                    </Typography>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default FinanceCorporate;
