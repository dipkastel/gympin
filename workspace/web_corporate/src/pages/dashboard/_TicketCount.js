import React, {useContext, useEffect, useState} from 'react';
import AnalyticsBox from "../../components/AnalyticsBox";
import {corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const _PersonnelCount = () => {

    return (
        <div>
            <AnalyticsBox
                icon={<img alt="icon" src="/assets/images/icons/ic-glass-ticket.svg" />}
                title="خریدهای هفته"
                color={"secondary"}
                percent={0}
                total={0}
            />
        </div>
    );
};

export default _PersonnelCount;
