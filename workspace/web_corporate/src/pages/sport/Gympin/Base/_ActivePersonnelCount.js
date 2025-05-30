import React, {useContext, useEffect, useState} from 'react';
import AnalyticsBox from "../../../../components/AnalyticsBox";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {corporatePersonnel_query} from "../../../../network/api/corporatePersonnel.api";
import DetailsSimpleData from "../../../../components/DetailsSimpleData";

const _ActivePersonnelCount = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [personnel, setPersonnel] = useState(null);

    useEffect(() => {
        getPersonnel();
    }, [corporate]);



    function getPersonnel() {
        if(!corporate)return;
        setPersonnel({});
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate?.Id,
            paging: {Page:0, Size: 1, Desc: true}
        }).then(result => {
            console.log(result.data.Data)
            setPersonnel(result.data.Data);
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
                total={0}
            />
        </div>
    );
};

export default _ActivePersonnelCount;
