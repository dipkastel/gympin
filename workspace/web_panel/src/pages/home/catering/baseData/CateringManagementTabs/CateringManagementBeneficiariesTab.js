import React from 'react';
import CateringBeneficiaries from "../CateringBeneficiaries/CateringBeneficiaries";

const CateringManagementBeneficiariesTab = ({catering, update}) => {
    return (
        <>
            {catering && <div className="row">
                <div className="col-md-12">
                    <CateringBeneficiaries catering={catering} update={update}/>
                </div>

            </div>}
        </>
    );
};

export default CateringManagementBeneficiariesTab;
