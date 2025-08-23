import React from 'react';
import _IncreaseCredit from "./_IncreaseCredit";
import _WalletAmount from "./partial/_WalletAmount";
import Profile from "../profile/Profile";
import {useSelector} from "react-redux";
import EditProfile from "../editProfile/EditProfile";
import {Card, Typography} from "@mui/material";

const Wallet = () => {
    const currentUser = useSelector(state => state.auth.user);
    return (
        <>
            <Profile />
            {currentUser.Provider!="SMARTIS"&&<>
                <_WalletAmount/>
                <_IncreaseCredit/>
            </>}
            {currentUser.Provider=="SMARTIS"&&<>
                <Card sx={{p:2,mx:1,mt:3}}>
                    <Typography variant={"body2"}>ویرایش پروفایل</Typography>
                </Card>
                <EditProfile  />
            </>}

            {/*<_UserTransactions user={currentUser}/>*/}
        </>
    );
};

export default Wallet;
