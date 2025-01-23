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
                icon={<img alt="icon" src="/assets/images/icons/ic-glass-dir.svg" />}
                title="بلیط‌های هفته"
                color={"secondary"}
                percent={0}
                total={0}
                chart={{
                    categories: [0,0],
                    series: [0,0],
                }}
            />
        </div>
    );
};

export default _PersonnelCount;
