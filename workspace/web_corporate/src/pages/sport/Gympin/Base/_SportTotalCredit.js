import React from 'react';
import AnalyticsBox from "../../../../components/AnalyticsBox";
import {toPriceWithComma} from "../../../../helper/utils";
import DetailsSimpleData from "../../../../components/DetailsSimpleData";


const _SportTotalCredit = () => {

    return (
        <div>
            <DetailsSimpleData
                title="مجموع اعتبارهای ورزشی"
                color={"tertiary"}
                total={toPriceWithComma(0) + " تومان"}
            />
        </div>
    );
};

export default _SportTotalCredit;
