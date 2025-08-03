import React, {useContext, useEffect, useState} from 'react';
import AnalyticsBox from "../../../../components/AnalyticsBox";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {corporatePersonnel_query} from "../../../../network/api/corporatePersonnel.api";
import DetailsSimpleData from "../../../../components/DetailsSimpleData";
import {service_GetActiveUsersByCorporate} from "../../../../network/api/service.api";
import {CircularProgress} from "@mui/material";

const _ActivePersonnelCount = ({corporate}) => {

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
                title="تعداد ورزشکاران فعال این ماه"
                color={"quinary"}
                total={service?service?.length:<><CircularProgress size={20} /></>}
            />
        </div>
    );
};

export default _ActivePersonnelCount;
