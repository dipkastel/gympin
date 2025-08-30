import React, {useContext, useEffect, useState} from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import UserWalletsTab from "./financeTabs/UserWalletsTab";
import UserTransactionsTab from "./financeTabs/UserTransactionsTab";
import UserRequestsTab from "./financeTabs/UserRequestsTab";
import {user_getFinanceUser, User_getUserCredits} from "../../../../../network/api/user.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

const UserFinanceManagement = ({currentUser}) => {

    const error = useContext(ErrorContext);
    const [selectedTab, setSelectedTab] = useState("WALLETS");
    const [updatePageP,SetUpdatePageP] = useState(false);
    const [userFinance,SetUserFinance] = useState(null);


    useEffect(() => {
        if(updatePageP)
            SetUpdatePageP(false)
        getUserFinance();
    }, [updatePageP]);
    function updatePage(){
        SetUpdatePageP(true)
    }

    function getUserFinance() {

        User_getUserCredits({Id:currentUser.Id}).then(result=>{
            SetUserFinance(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (

        <>
            {!updatePageP&&userFinance &&<div>
                <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, n) => setSelectedTab(n)}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant={"standard"}
                        aria-label="full width tabs example"
                    >
                        <Tab label="کیف پول" value={"WALLETS"}/>
                        <Tab label="درخواست ها" value={"REQUESTS"}/>
                        <Tab label="تراکنش ها" value={"TRANSACTIONS"}/>
                    </Tabs>
                </Paper>
                {selectedTab === "WALLETS" && <UserWalletsTab userFinance={userFinance} currentUser={currentUser}  updatePage={updatePage}/>}
                {selectedTab === "REQUESTS" && <UserRequestsTab userFinance={userFinance} currentUser={currentUser} updatePage={updatePage}/>}
                {selectedTab === "TRANSACTIONS" && <UserTransactionsTab userFinance={userFinance} currentUser={currentUser} updatePage={updatePage}/>}
            </div>}
        </>
    );
};

export default UserFinanceManagement;
