import React, {useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import _SettingGeneral from "./General/_SettingGeneral";
import _SettingFinance from "./Finance/_SettingFinance";
import _SettingSms from "./sms/_SettingSms";
import _SettingNotification from "./Notification/_SettingNotification";
import _SettingPersonal from "./Personal/_SettingPersonal";


const SettingsManagement = () => {
    const [selectedTab, setSelectedTab] = useState("GENERAL");

    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>مدیریت تنظیمات</p>
            </Notice>

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
                    <Tab label="مالی" value={"FINANCE"}/>
                    <Tab label="پیامک" value={"SMS"}/>
                    <Tab label="نوتیفیکیشن" value={"NOTIFICATION"}/>
                    <Tab label="شخصی" value={"POCKET"}/>
                </Tabs>
            </Paper>
            {selectedTab == "GENERAL" && <_SettingGeneral />}
            {selectedTab == "FINANCE" && <_SettingFinance />}
            {selectedTab == "SMS" && <_SettingSms />}
            {selectedTab == "NOTIFICATION" && <_SettingNotification />}
            {selectedTab == "POCKET" && <_SettingPersonal />}
        </>
    );
};

export default SettingsManagement;
