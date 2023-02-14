import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {corporatePersonnel_getTotalUserCredits} from "../../../../../network/api/CorporatePersonnel.api";
import {Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";

const TotalCredit = ({currentCorporate}) => {
    const [totalCredit, SetTotalCredit] = useState(0);
    useEffect(() => {
        corporatePersonnel_getTotalUserCredits({CorporateId: currentCorporate.Id}).then(result => {
            SetTotalCredit(result.data.Data);
        }).catch(e => console.log(e));
    }, []);

    return (
        <Portlet>
            <PortletHeader title="مجموع اعتبار کارکنان"/>
            <PortletBody>
                <Typography width={"100%"} variant="h4" noWrap={true} textAlign={"center"}
                            component="div" sx={{
                    marginY: 1
                }}>
                    {toPriceWithComma(totalCredit+"")+" تومان"}
                </Typography>
            </PortletBody>
        </Portlet>
    );
};

export default TotalCredit;
