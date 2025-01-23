import React, {useContext, useEffect, useState} from 'react';
import AnalyticsBox from "../../components/AnalyticsBox";
import {corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const _PersonnelCount = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [personnel, setPersonnel] = useState(null);

    useEffect(() => {
        getPersonnel();
    }, []);



    function getPersonnel() {
        if(!corporate)return;
        setPersonnel({});
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate?.Id,
            paging: {Page:0, Size: 1, Desc: true}
        }).then(result => {
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

            <AnalyticsBox
                icon={<img alt="icon" src="/assets/images/icons/ic-glass-users.svg" />}
                title="تعداد کارمندان"
                color={"quinary"}
                total={personnel?.totalElements}
                onClick={()=>navigate("/personnel/list")}
            />
        </div>
    );
};

export default _PersonnelCount;
