import React from 'react';
import CorporateCreditTransactions from "../../CorporateTransactions/CorporateCreditTransactions";
import CorporateDepositTransactions from "../../CorporateTransactions/CorporateDepositTransactions";

const FinanceCorporateTransactionsTab = ({currentCorporate, financeCorporate, updatePage}) => {
    return (
        <div>
            <div className="row">

                <div className="col-md-6">
                    <CorporateDepositTransactions currentCorporate={currentCorporate}/>
                </div>
                <div className="col-md-6">
                    <CorporateCreditTransactions currentCorporate={currentCorporate}/>
                </div>

            </div>
        </div>
    );
};

export default FinanceCorporateTransactionsTab;
