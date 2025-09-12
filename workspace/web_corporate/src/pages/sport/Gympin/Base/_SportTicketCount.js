import React, {useContext, useEffect, useState} from 'react';
import DetailsSimpleData from "../../../../components/DetailsSimpleData";
import {CircularProgress} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {service_GetActiveUsersByCorporate} from "../../../../network/api/service.api";
import {Report_ticketBuyCountThisWeek} from "../../../../network/api/report.api";


const _SportTicketCount = ({corporate}) => {

    const error = useContext(ErrorContext);
    const [service,SetService] = useState(null)

    useEffect(() => {
        getweekTickets();
    }, []);


    function getweekTickets() {
        Report_ticketBuyCountThisWeek({
            id:corporate.Id
        }).then((data) => {
            console.log(data)
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
                total={service!=null?service:<><CircularProgress size={20} /></>}
            />
        </div>
    );
};

export default _SportTicketCount;
