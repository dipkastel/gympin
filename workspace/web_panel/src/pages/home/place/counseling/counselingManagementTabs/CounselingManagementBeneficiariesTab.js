import React from 'react';
import CounselingBeneficiaries from "../Beneficiaries/CounselingBeneficiaries";

const CounselingManagementBeneficiariesTab = ({counseling}) => {
    return (
        <>
            {counseling && <div className="row">
                <div className="col-md-12">
                    <CounselingBeneficiaries counseling={counseling}/>
                </div>
            </div>}
        </>
    );
};

export default CounselingManagementBeneficiariesTab;
