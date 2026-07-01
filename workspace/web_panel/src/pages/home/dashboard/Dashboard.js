import React, {useEffect, useState} from "react";
import {Paper, Tab, Tabs} from "@mui/material";
import DashTasksTab from "./Tabs/DashTasksTab";
import DashConfigsTab from "./Tabs/DashConfigsTab";
import DashReportsTab from "../report/Tabs/ReportFinanceTab";

export default function Dashboard() {

    const [selectedTab, setSelectedTab] = useState("TASKS");
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

            {!updatePageP&&<div>
                <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, n) => setSelectedTab(n)}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant={"standard"}
                        aria-label="full width tabs example"
                    >
                        <Tab label="انجام نشده" value={"TASKS"}/>
                        <Tab label="پیکر بندی" value={"CONFIGURATION"}/>
                    </Tabs>
                </Paper>
                {selectedTab === "TASKS" && <DashTasksTab  updatePage={updatePage}/>}
                {selectedTab === "CONFIGURATION" && <DashConfigsTab  updatePage={updatePage}/>}
            </div>}

        </>
    );
}
