import React, {useState} from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import __SettingActivitiesDetails from "./__SettingActivitiesDetails";
import __SettingActivitiesGeneral from "./__SettingActivitiesGeneral";

const _ActivitiesManagement = () => {
    const [selectedTab, setSelectedTab] = useState("GENERAL");

    return (
        <>
            <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"standard"}
                    aria-label="full width tabs example"
                >
                    <Tab label="عمومی" value={"GENERAL"}/>
                    <Tab label="جزئیات" value={"DETAILS"}/>
                </Tabs>
            </Paper>
            {selectedTab == "GENERAL" && <__SettingActivitiesGeneral />}
            {selectedTab == "DETAILS" && <__SettingActivitiesDetails />}
        </>
    );
};

export default _ActivitiesManagement;
