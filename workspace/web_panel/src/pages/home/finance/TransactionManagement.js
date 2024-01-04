import React, {useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import TransactionAllTab from "./TransactionTabs/TransactionAllTab";
import TransactionUserTab from "./TransactionTabs/TransactionUserTab";
import TransactionCorporateTab from "./TransactionTabs/TransactionCorporateTab";
import TransactionPlaceTab from "./TransactionTabs/TransactionPlaceTab";
import TransactionIncomeTab from "./TransactionTabs/TransactionIncomeTab";

const TransactionManagement = () => {

    const [selectedTab, setSelectedTab] = useState("ALL");

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>بخش مالی برای درستی سنجی عملکرد سیستم راه اندازی شده است.</p>
                <p>یک نسخه از تراکنش های سیستم در این قسمت گردآوری شده تا عملکرد مالی را بتوان با جزئیات بیشتری بررسی
                    نمود</p>
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
                    <Tab label="همه تراکنش ها" value={"ALL"}/>
                    <Tab label="کاربر" value={"USER"}/>
                    <Tab label="سازمان" value={"CORPORATE"}/>
                    <Tab label="مراکز" value={"PLACE"}/>
                    <Tab label="درامد" value={"INCOME"}/>
                </Tabs>
            </Paper>
            {selectedTab == "ALL" && <TransactionAllTab />}
            {selectedTab == "USER" && <TransactionUserTab />}
            {selectedTab == "CORPORATE" && <TransactionCorporateTab />}
            {selectedTab == "PLACE" && <TransactionPlaceTab />}
            {selectedTab == "INCOME" && <TransactionIncomeTab />}
        </>
    );
};

export default TransactionManagement;
