import React from 'react';
import CorporateIncreaseDeposit from "../../CorporateIncreaseDeposit/CorporateIncreaseDeposit";
import CorporateCreditTransactions from "../../CorporateTransactions/CorporateCreditTransactions";

const FinanceCorporateRequestTab = ({currentCorporate,financeCorporate,updatePage}) => {
    return (
        <div>
            <div className="row">

                <div className="col-md-6">
                    <CorporateIncreaseDeposit currentCorporate={currentCorporate} updatePage={updatePage}/>
                </div>

            </div>
        </div>
    );
};

export default FinanceCorporateRequestTab;
