import React from 'react';
import UserPersonalTransactions from "../partials/UserPersonalTransactions";
import UserCorporatePersonelTransactions from "../../UserTransactions/UserCorporatePersonelTransactions";
import SettlementRequest from "../../settlement/SettlementRequest";
import UserIncreaseDeposit from "../../UserIncreaseDeposit/UserIncreaseDeposit";

const UserRequestTabs = ({currentUser,updatePage}) => {
    return (
        <div>

            {currentUser && <div className="row">
                <div className="col-md-6">
                    {currentUser && <SettlementRequest currentUser={currentUser}  updatePage={updatePage}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserIncreaseDeposit currentUser={currentUser} updatePage={updatePage}/>}
                </div>
            </div>}
        </div>
    );
};

export default UserRequestTabs;
