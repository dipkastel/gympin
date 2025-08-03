import React, {useContext, useEffect, useState} from 'react';
import DetailsSimpleData from "../../../../components/DetailsSimpleData";
import {CircularProgress} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {service_GetActiveUsersByCorporate} from "../../../../network/api/service.api";


const _SportTicketCount = ({corporate}) => {

    const error = useContext(ErrorContext);
    const [service,SetService] = useState(null)

    useEffect(() => {
        getActivities();
    }, []);


    function getActivities() {
        service_GetActiveUsersByCorporate({
            CorporateId:corporate.Id,
            ToDate: new Date(),
            FromDate: new Date().setMonth(new Date().getMonth()-1)
        }).then((data) => {
            SetService(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <div>
            <DetailsSimpleData
                title="خریدهای ورزشی هفته"
                color={"secondary"}
                percent={0}
                total={service?0:<><CircularProgress size={20} /></>}
            />
        </div>
    );
};

export default _SportTicketCount;
