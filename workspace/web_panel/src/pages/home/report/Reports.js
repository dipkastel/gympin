import React, {useState} from "react";
import Notice from "../../partials/content/Notice";
import "leaflet/dist/leaflet.css";
import {Paper, Tab, Tabs} from "@mui/material";
import ReportFinanceTab from "./Tabs/ReportFinanceTab";
import ReportUsageTab from "./Tabs/ReportUsageTab";
import ReportSystemTab from "./Tabs/ReportSystemTab";
import ReportViewTab from "./Tabs/ReportViewTab";

const Reports = () => {


    const [selectedTab, setSelectedTab] = useState("FINANCE");

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">گزارشات</Notice>

            <div>
                <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, n) => setSelectedTab(n)}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant={"standard"}
                        aria-label="full width tabs example"
                    >
                        <Tab label="مالی" value={"FINANCE"}/>
                        <Tab label="استفاده" value={"USAGE"}/>
                        <Tab label="مشاهده" value={"VIEW"}/>
                        <Tab label="سیستم" value={"SYSTEM"}/>
                    </Tabs>
                </Paper>
                {selectedTab === "FINANCE" && <ReportFinanceTab  />}
                {selectedTab === "USAGE" && <ReportUsageTab  />}
                {selectedTab === "VIEW" && <ReportViewTab  />}
                {selectedTab === "SYSTEM" && <ReportSystemTab />}
            </div>

        </>
    );
};

export default Reports;
