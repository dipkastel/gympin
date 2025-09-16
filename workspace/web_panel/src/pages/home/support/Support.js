import React, {useState} from 'react';
import Notice from "../../partials/content/Notice";
import SupportTicketList from "./Ticket/SupportTicketLists";
import {Paper, Tab, Tabs} from "@mui/material";
import SupportChatList from "./Chat/SupportChatList";
import SupportMonitorList from "./Monitor/SupportMonitorList";


const Support = () => {
    const [selectedTab,setSelectedTab] = useState("CHAT")

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">پشتیبانی</Notice>

            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"standard"}
                    aria-label="full width tabs example"
                >
                    <Tab label="چت آنلاین" value={"CHAT"}/>
                    <Tab label="تیکت ها" value={"TICKETS"}/>
                    <Tab label="مانیتور" value={"MONITOR"}/>
                </Tabs>
            </Paper>
            {selectedTab=="CHAT"&&<SupportChatList/>}
            {selectedTab=="TICKETS"&&<SupportTicketList/>}
            {selectedTab=="MONITOR"&&<SupportMonitorList/>}
        </>
    );
};

export default Support;
