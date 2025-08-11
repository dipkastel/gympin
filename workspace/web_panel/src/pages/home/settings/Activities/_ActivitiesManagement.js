import React, {useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import _SettingGeneral from "../General/_SettingGeneral";
import _SettingFinance from "../Finance/_SettingFinance";
import _SettingSms from "../sms/_SettingSms";
import _PhoneBook from "../phoneBook/_PhoneBook";
import _SettingNotification from "../Notification/_SettingNotification";
import __SettingActivitiesDetails from "./__SettingActivitiesDetails";
import _SettingPersonal from "../Personal/_SettingPersonal";
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
