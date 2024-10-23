import React from 'react';
import CorporateTotalDeposit from "../../FinanceCorporate/CorporateTotalDeposit";
import CorporateTotalCreadit from "../../FinanceCorporate/CorporateTotalCredit";

const FinanceCorporateInformationTab = ({financeCorporate}) => {
    return (
        <div>
            <div className="row">

                <div className="col-md-6">
                    <CorporateTotalDeposit financeCorporate={financeCorporate}/>
                </div>
                <div className="col-md-6">
                    <CorporateTotalCreadit financeCorporate={financeCorporate}/>
                </div>

            </div>
        </div>
    );
};

export default FinanceCorporateInformationTab;
