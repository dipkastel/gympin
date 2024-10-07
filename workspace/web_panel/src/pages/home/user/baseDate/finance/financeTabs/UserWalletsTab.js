import React, {useContext, useEffect, useState} from 'react';
import UserCredit from "../../credit/UserCredit";
import {User_getUserCredits} from "../../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import UserTotalWallet from "../../credit/UserTotalWallet";

const UserWalletsTab = ({currentUser,userFinance, updatePage}) => {

    const error = useContext(ErrorContext);

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
