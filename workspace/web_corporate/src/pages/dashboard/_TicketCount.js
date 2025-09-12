import React, {useContext, useEffect, useState} from 'react';
import AnalyticsBox from "../../components/AnalyticsBox";
import {corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Report_ticketBuyCountThisWeek} from "../../network/api/report.api";
import {CircularProgress} from "@mui/material";

const _PersonnelCount = ({corporate}) => {

    const error = useContext(ErrorContext);
    const [service,SetService] = useState(null)

    useEffect(() => {
        getweekTickets();
    }, []);


    function getweekTickets() {
        Report_ticketBuyCountThisWeek({
            id:corporate?.Id
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
            <AnalyticsBox
                icon={<img alt="icon" src="/assets/images/icons/ic-glass-ticket.svg" />}
                title="خریدهای هفته"
                color={"secondary"}
                percent={0}
                total={service!=null?service:<><CircularProgress size={20} /></>}
            />
        </div>
    );
};

export default _PersonnelCount;
