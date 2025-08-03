import React from 'react';
import AnalyticsBox from "../../../../components/AnalyticsBox";
import {toPriceWithComma} from "../../../../helper/utils";
import DetailsSimpleData from "../../../../components/DetailsSimpleData";


const _SportTotalCredit = ({corporate}) => {



    return (
        <div>
            <DetailsSimpleData
                title="مجموع اعتبارهای ورزشی"
                color={"tertiary"}
                total={toPriceWithComma(corporate?.FinanceCorporate?.TotalCredits) + " تومان"}
            />
        </div>
    );
};

export default _SportTotalCredit;
