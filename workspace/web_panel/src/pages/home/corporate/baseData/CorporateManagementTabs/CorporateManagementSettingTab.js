import React from 'react';
import CorporateStatus from "../Status/CorporateStatus";
import DeleteCorporate from "../Delete/DeleteCorporate";
import CorporateContract from "../Contract/CorporateContract";
import CorporateContractExpire from "../ContractExpire/CorporateContractExpire";
import CorporateInviteCode from "../invite/CorporateInviteCode";

const CorporateManagementSettingTab = ({currentCorporate,updatePage}) => {
    return (
        <>
            {currentCorporate && <div className="row">

                <div className="col-md-6">
                    <CorporateStatus currentCorporate={currentCorporate} updatePage={updatePage}/>
                    <DeleteCorporate currentCorporate={currentCorporate}/>
                </div>
                <div className="col-md-6">
                    <CorporateContractExpire currentCorporate={currentCorporate} UpdatePage={updatePage}/>
                    <CorporateContract currentCorporate={currentCorporate} UpdatePage={updatePage}/>
                    {currentCorporate && <CorporateInviteCode corporate={currentCorporate} />}
                </div>

            </div>}
        </>
    );
};

export default CorporateManagementSettingTab;
