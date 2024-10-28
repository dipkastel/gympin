import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {corporate_getTotalIncreases} from "../../../../../network/api/corporate.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {CorporateContractType} from "../../../../../helper/enums/CorporateContractType";

const CorporateTotalIncreases = ({currentCorporate,financeCorporate}) => {
    const error = useContext(ErrorContext);
    const [totalIncreases, setTotalIncreases] = useState(null);

    useEffect(() => {
        if (!financeCorporate?.Id) return;
        corporate_getTotalIncreases({FinanceCorporateId: financeCorporate.Id}).then(data => {
            setTotalIncreases(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [financeCorporate]);


    return (
        <>
            {totalIncreases && <Portlet>
                <PortletHeader title="مجموع پرداخت شرکت تا کنون"/>
                <PortletBody>

                    <Typography width={"100%"} variant="h4" textAlign={"right"}
                                component="div" sx={{
                        marginY: 1
                    }}>
                        {CorporateContractType[currentCorporate.ContractType]}
                    </Typography>
                    <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                                component="div" sx={{
                        marginY: 1
                    }}>
                        {toPriceWithComma((totalIncreases || 0)) + " تومان"}
                    </Typography>

                </PortletBody>
            </Portlet>
            }
        </>
    );
};

export default CorporateTotalIncreases;
