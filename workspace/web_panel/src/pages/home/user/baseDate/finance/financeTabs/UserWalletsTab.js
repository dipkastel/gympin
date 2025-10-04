import React from 'react';
import UserCredit from "../../credit/UserCredit";
import UserTotalWallet from "../../credit/UserTotalWallet";

const UserWalletsTab = ({currentUser, userFinance }) => {


    return (
        <>
            {currentUser && <div className="row">
                <div className="col-md-6">
                    {currentUser && <UserTotalWallet currentUser={currentUser} userCredits={userFinance}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserCredit currentUser={currentUser} userCredits={userFinance}/>}
                </div>
            </div>}
        </>
    );
};

export default UserWalletsTab;
