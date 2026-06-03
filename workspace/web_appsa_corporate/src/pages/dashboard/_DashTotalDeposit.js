import React from 'react';
import {toPriceWithComma} from "../../helper/utils";
import AnalyticsBox from "../../components/AnalyticsBox";

const _DashTotalDeposit = ({totalDeposit,navigate}) => {
    return (
        <AnalyticsBox
            icon={<img alt="icon" src="/assets/images/icons/ic-glass-bag3.svg" />}
            title="شارژ باقی مانده"
            onClick={()=>navigate("/finance")}
            color={"quaternary"}
            total={toPriceWithComma(totalDeposit || 0) + " تومان"}
        />
    );
};

export default _DashTotalDeposit;
