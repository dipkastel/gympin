import React from 'react';
import UserPersonalTransactions from "../partials/UserPersonalTransactions";
import UserCorporatePersonelTransactions from "../../UserTransactions/UserCorporatePersonelTransactions";

const UserTransactionsTab = ({currentUser, userFinance, updatePage}) => {
    return (
        <div>

            {currentUser && <div className="row">
                <div className="col-md-6">

                    {userFinance.CreditDetails.map(item => (
                        <div key={item.Id}>
                            {currentUser &&
                            <UserPersonalTransactions userFinance={item} currentUser={currentUser} updatePage={updatePage}/>}
                        </div>
                    ))}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserCorporatePersonelTransactions currentUser={currentUser} updatePage={updatePage}/>}
                </div>
            </div>}
        </div>
    );
};

export default UserTransactionsTab;
