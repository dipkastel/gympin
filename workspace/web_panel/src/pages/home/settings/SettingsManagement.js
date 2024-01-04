import React, {useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import TransactionAllTab from "../finance/TransactionTabs/TransactionAllTab";
import TransactionUserTab from "../finance/TransactionTabs/TransactionUserTab";
import TransactionCorporateTab from "../finance/TransactionTabs/TransactionCorporateTab";
import TransactionPlaceTab from "../finance/TransactionTabs/TransactionPlaceTab";
import TransactionIncomeTab from "../finance/TransactionTabs/TransactionIncomeTab";
import _SettingGeneral from "./General/_SettingGeneral";
import _SettingFinance from "./Finance/_SettingFinance";


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
                </Tabs>
            </Paper>
            {selectedTab == "GENERAL" && <_SettingGeneral />}
            {selectedTab == "FINANCE" && <_SettingFinance />}
        </>
    );
};

export default SettingsManagement;
