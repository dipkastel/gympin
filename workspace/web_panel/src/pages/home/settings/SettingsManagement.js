import React, {useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import _SettingGeneral from "./General/_SettingGeneral";
import _SettingFinance from "./Finance/_SettingFinance";
import _SettingSms from "./sms/_SettingSms";
import _SettingNotification from "./Notification/_SettingNotification";
import _SettingPersonal from "./Personal/_SettingPersonal";
import _PhoneBook from "./phoneBook/_PhoneBook";
import _ActivitiesManagement from "./Activities/_ActivitiesManagement";
import _SettingManager from "./Manager/_SettingManager";
import _SettingTags from "./tag/_SettingTags";


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
                    <Tab label="دفترچه تلفن" value={"PHONEBOOK"}/>
                    <Tab label="پیامک" value={"SMS"}/>
                    <Tab label="نوتیفیکیشن" value={"NOTIFICATION"}/>
                    <Tab label="تگ ها" value={"TAGS"}/>
                    <Tab label="فعالیت ها" value={"ACTIVITIES"}/>
                    <Tab label="مدیریتی" value={"MANAGER"}/>
                    <Tab label="شخصی" value={"POCKET"}/>
                </Tabs>
            </Paper>
            {selectedTab == "GENERAL" && <_SettingGeneral />}
            {selectedTab == "FINANCE" && <_SettingFinance />}
            {selectedTab == "SMS" && <_SettingSms />}
            {selectedTab == "PHONEBOOK" && <_PhoneBook />}
            {selectedTab == "NOTIFICATION" && <_SettingNotification />}
            {selectedTab == "TAGS" && <_SettingTags />}
            {selectedTab == "ACTIVITIES" && <_ActivitiesManagement />}
            {selectedTab == "MANAGER" && <_SettingManager />}
            {selectedTab == "POCKET" && <_SettingPersonal />}
        </>
    );
};

export default SettingsManagement;
