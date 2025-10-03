import React, {useEffect, useState} from 'react';
import CorporatePersonnel from "../Personnel/CorporatePersonnel";
import CorporatePersonnelCreditAction from "../corporatePersonnelCreditAction/CorporatePersonnelCreditAction";
import CorporatePersonnelNwCreditAction from "../corporatePersonnelCreditAction/CorporatePersonnelNWCreditAction";

const CorporateManagementCorporateTab = ({currentCorporate}) => {

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
            {!updatePageP&&currentCorporate && <div className="row">

                <div className="col-md-12">
                    <CorporatePersonnel currentCorporate={currentCorporate} pUpdatePage={updatePage}/>
                </div>
                <div className="col-md-6">
                    <CorporatePersonnelCreditAction currentCorporate={currentCorporate} pUpdatePage={updatePage}/>

                </div>
                <div className="col-md-6">
                    <CorporatePersonnelNwCreditAction currentCorporate={currentCorporate} pUpdatePage={updatePage}/>

                </div>
            </div>}
        </>
    );
};

export default CorporateManagementCorporateTab;
