import React, {useEffect, useState} from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import UserWalletsTab from "./financeTabs/UserWalletsTab";
import UserTransactionsTab from "./financeTabs/UserTransactionsTab";
import UserRequestsTab from "./financeTabs/UserRequestsTab";

const UserFinanceManagement = ({currentUser}) => {

    const [selectedTab, setSelectedTab] = useState("WALLETS");
    const [updatePageP,SetUpdatePageP] = useState(false);

    useEffect(() => {
        if(updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);
    function updatePage(){
        SetUpdatePageP(true)
    }

    return (

        <>
            {!updatePageP&&currentUser &&<div>
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
                {selectedTab === "WALLETS" && <UserWalletsTab currentUser={currentUser}  updatePage={updatePage}/>}
                {selectedTab === "REQUESTS" && <UserRequestsTab currentUser={currentUser} updatePage={updatePage}/>}
                {selectedTab === "TRANSACTIONS" && <UserTransactionsTab currentUser={currentUser} updatePage={updatePage}/>}
            </div>}
        </>
    );
};

export default UserFinanceManagement;
