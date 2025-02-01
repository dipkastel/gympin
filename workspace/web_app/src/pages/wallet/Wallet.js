import React from 'react';
import _IncreaseCredit from "./_IncreaseCredit";
import _WalletAmount from "./partial/_WalletAmount";
import _WalletImage from "./partial/_WalletImage";
import Profile from "../profile/Profile";

const Wallet = () => {
    return (
        <>
            <Profile />
            <_WalletAmount/>
            <_IncreaseCredit/>

            {/*<_UserTransactions user={currentUser}/>*/}
        </>
    );
};

export default Wallet;
