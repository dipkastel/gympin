import React, {useContext, useEffect, useState} from 'react';
import UserCredit from "../../credit/UserCredit";
import {User_getUserCredits} from "../../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import UserTotalWallet from "../../credit/UserTotalWallet";

const UserWalletsTab = ({currentUser, updatePage}) => {

    const error = useContext(ErrorContext);
    const [userCredits, SetUserCredits] = useState([])
    useEffect(() => {
        User_getUserCredits({Id: currentUser.Id}).then(result => {
            SetUserCredits(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [currentUser]);
    return (
        <>
            {currentUser && <div className="row">
                <div className="col-md-6">
                    {currentUser && <UserTotalWallet currentUser={currentUser} userCredits={userCredits}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserCredit currentUser={currentUser} userCredits={userCredits}/>}
                </div>
            </div>}
        </>
    );
};

export default UserWalletsTab;
