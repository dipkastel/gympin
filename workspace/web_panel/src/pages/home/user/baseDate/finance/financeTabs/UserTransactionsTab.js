import React from 'react';
import UserPersonalTransactions from "../partials/UserPersonalTransactions";
import UserCorporatePersonelTransactions from "../../UserTransactions/UserCorporatePersonelTransactions";

const UserTransactionsTab = ({currentUser, updatePage}) => {
    return (
        <div>

            {currentUser && <div className="row">
                <div className="col-md-6">
                    {currentUser && <UserPersonalTransactions currentUser={currentUser} updatePage={updatePage}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserCorporatePersonelTransactions currentUser={currentUser} updatePage={updatePage}/>}
                </div>
            </div>}
        </div>
    );
};

export default UserTransactionsTab;
