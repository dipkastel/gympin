import React, {useEffect, useState} from 'react';
import __SettingSmsConfigs from "./__SettingSmsConfigs";
import __SettingSmsList from "./__SettingSmsList";
import {Paper, Tab, Tabs} from "@mui/material";
import __SettingSmsManual from "./__SettingSmsManual";

const _SettingSms = () => {

    const [updatePageP, SetUpdatePageP] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Auto");
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }

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
                    <Tab label="موتور پیامک" value={"Auto"}/>
                    <Tab label="ارسال دستی" value={"Manual"}/>
                    <Tab label="پیشرفته" value={"Advance"}/>
                </Tabs>
            </Paper>
            {!updatePageP && <div>
                {selectedTab == "Auto" && <__SettingSmsList updatePage={updatePage}/>}
                {selectedTab == "Manual" && <__SettingSmsManual updatePage={updatePage}/>}
                {selectedTab == "Advance" && <__SettingSmsConfigs updatePage={updatePage}/>}
            </div>}
        </>
    );
};

export default _SettingSms;
