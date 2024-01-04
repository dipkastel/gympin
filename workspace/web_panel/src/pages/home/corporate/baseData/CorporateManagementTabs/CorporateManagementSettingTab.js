import React from 'react';
import CorporateStatus from "../Status/CorporateStatus";
import DeleteCorporate from "../Delete/DeleteCorporate";
import CorporatePersonnel from "../Personnel/CorporatePersonnel";
import CorporateStepPayment from "../stepPeyment/CorporateStepPayment";

const CorporateManagementSettingTab = ({currentCorporate,updatePage}) => {
    return (
        <>
            {currentCorporate && <div className="row">

                <div className="col-md-6">
                    <CorporateStatus currentCorporate={currentCorporate} updatePage={updatePage}/>
                    <DeleteCorporate currentCorporate={currentCorporate}/>
                </div>
                <div className="col-md-6">
                    <CorporateStepPayment currentCorporate={currentCorporate} UpdatePage={updatePage}/>
                </div>

            </div>}
        </>
    );
};

export default CorporateManagementSettingTab;
