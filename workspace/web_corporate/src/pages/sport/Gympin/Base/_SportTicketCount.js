import React from 'react';
import AnalyticsBox from "../../../../components/AnalyticsBox";
import DetailsSimpleData from "../../../../components/DetailsSimpleData";


const _SportTicketCount = () => {

    return (
        <div>
            <DetailsSimpleData
                title="خریدهای ورزشی هفته"
                color={"secondary"}
                percent={0}
                total={0}
            />
        </div>
    );
};

export default _SportTicketCount;
