import React from 'react';
import SettlementRequest from "../../settlement/SettlementRequest";
import UserIncreaseDeposit from "../../UserIncreaseDeposit/UserIncreaseDeposit";

const UserRequestTabs = ({currentUser,updatePage,userFinance}) => {
    return (
        <div>

            {currentUser && <div className="row">
                <div className="col-md-6">
                    {userFinance.CreditDetails.map(item=>(
                        <div key={item.Id}>
                            {currentUser && <SettlementRequest userFinance={item} currentUser={currentUser}  updatePage={updatePage}/>}
                        </div>
                    ))}
                </div>

                <div className="col-md-6">
                    {currentUser && <UserIncreaseDeposit userFinance={userFinance} currentUser={currentUser} updatePage={updatePage}/>}
                </div>
            </div>}
        </div>
    );
};

export default UserRequestTabs;
