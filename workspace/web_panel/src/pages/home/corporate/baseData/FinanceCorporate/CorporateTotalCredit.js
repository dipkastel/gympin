import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {corporatePersonnel_getTotalUserCredits} from "../../../../../network/api/CorporatePersonnel.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const CorporateTotalCredit = ({ currentCorporate,financeCorporate}) => {

    const error = useContext(ErrorContext);
    const [currentCredit,setCurrentCredit] = useState(null);

    useEffect(() => {
        getCurrentTotalCredit();
    }, []);

    function getCurrentTotalCredit(){
        corporatePersonnel_getTotalUserCredits({id:currentCorporate.Id})
            .then((data) => {
                setCurrentCredit(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

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
                <Typography width={"100%"} variant="h6" noWrap={true} textAlign={"center"}
                            component="div" sx={{
                    marginY: 1
                }}>
                    {"چک : "+toPriceWithComma((currentCredit || 0)) + " تومان"}
                </Typography>
            </PortletBody>
        </Portlet>
    );
};

export default CorporateTotalCredit;
