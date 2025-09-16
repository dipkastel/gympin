import React, {useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import SellManagementAllTab from "./purchasedTabs/SellManagementAllTab";
import SellManagementSubscribeTab from "./purchasedTabs/SellManagementSubscribeTab";
import SellManagementCourseTab from "./purchasedTabs/SellManagementCourseTab";

const SellsManagement = () => {

    const [selectedTab, setSelectedTab] = useState("SUBSCRIBE");

    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>خرید کاربران ، دسترسی کاربر برای دریافت خدماتی می باشد که خریداری می شود و مجموعه موضف به ارائه آن
                    خدمات می باشد</p>
                <p>کاربر با هر خرید , شرایط و قوانین جیم پین و مراکز را می پذیرد.</p>
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
                    <Tab label="عضویت ها" value={"SUBSCRIBE"}/>
                    <Tab label="کلاس ها" value={"COURSE"}/>
                    <Tab label="همه خرید ها" value={"ALL"}/>
                </Tabs>
            </Paper>
            {selectedTab == "SUBSCRIBE" && <SellManagementSubscribeTab />}
            {selectedTab == "COURSE" && <SellManagementCourseTab />}
            {selectedTab == "ALL" && <SellManagementAllTab />}
        </>
    );
};

export default SellsManagement;
