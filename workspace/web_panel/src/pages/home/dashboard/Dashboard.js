import React, {useContext, useEffect, useState} from "react";
import {Grid, Paper, Tab, Tabs} from "@mui/material";
import {sport_query} from "../../../network/api/sport.api";
import {user_query} from "../../../network/api/user.api";
import {Place_query} from "../../../network/api/place.api";
import {Location_query} from "../../../network/api/location.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import DashTasksTab from "./Tabs/DashTasksTab";
import DashConfigsTab from "./Tabs/DashConfigsTab";
import DashReportsTab from "./Tabs/DashReportsTab";

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
                        <Tab label="گزارشات" value={"REPORTS"}/>
                    </Tabs>
                </Paper>
                {selectedTab === "TASKS" && <DashTasksTab  updatePage={updatePage}/>}
                {selectedTab === "CONFIGURATION" && <DashConfigsTab  updatePage={updatePage}/>}
                {selectedTab === "REPORTS" && <DashReportsTab  updatePage={updatePage}/>}
            </div>}

        </>
    );
}
