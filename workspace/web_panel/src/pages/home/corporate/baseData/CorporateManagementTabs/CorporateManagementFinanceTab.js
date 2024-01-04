import React, {useEffect, useState} from 'react';
import FinanceCorporate from "../FinanceCorporate/FinanceCorporate";
import CorporateTransactions from "../CorporateTransactions/CorporateTransactions";
import CorporateIncreaseDeposit from "../CorporateIncreaseDeposit/CorporateIncreaseDeposit";

const CorporateManagementFinanceTab = ({currentCorporate}) => {

    const [updatePageP, SetUpdatePageP] = useState(false);
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }

    return (
        <>
            {!updatePageP && currentCorporate && <div className="row">

                <div className="col-md-6">
                    <CorporateIncreaseDeposit currentCorporate={currentCorporate} updatePage={updatePage}/>
                    <CorporateTransactions currentCorporate={currentCorporate}/>
                </div>
                <div className="col-md-6">
                    <FinanceCorporate currentCorporate={currentCorporate}/>
                </div>

            </div>}
        </>
    );
};

export default CorporateManagementFinanceTab;
