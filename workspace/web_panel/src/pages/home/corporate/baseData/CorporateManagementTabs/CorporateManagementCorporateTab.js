import React, {useEffect, useState} from 'react';
import CorporateBasics from "../Base/CorporateBasics";
import CorporatePersonnel from "../Personnel/CorporatePersonnel";
import PersonnelGroups from "../PersonnelGroups/PersonnelGroups";
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

                <div className="col-md-6">
                    <CorporateBasics currentCorporate={currentCorporate} pUpdatePage={updatePage}/>

                </div>
                <div className="col-md-6">
                    <PersonnelGroups corporate={currentCorporate} pUpdatePage={updatePage}/>
                </div>

            </div>}
        </>
    );
};

export default CorporateManagementCorporateTab;
