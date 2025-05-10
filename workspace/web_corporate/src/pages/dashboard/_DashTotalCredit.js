import React from 'react';
import AnalyticsBox from "../../components/AnalyticsBox";
import {toPriceWithComma} from "../../helper/utils";

const _DashTotalCredit = ({totalCredit,navigate}) => {
    return (

        <AnalyticsBox
            icon={<img alt="icon" src="/assets/images/icons/ic-glass-mob.svg" />}
            title="مجموع اعتبارها"
            color={"tertiary"}
            onClick={()=>navigate("/personnel/increaseGroups")}
            total={toPriceWithComma(totalCredit||0) + " تومان"}

        />
    );
};

export default _DashTotalCredit;
