import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import "./corporateCss.css";
import {corporate_getById} from "../../../../network/api/corporate.api";
import Notes from "../../../partials/content/notes/Notes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Paper, Tab, Tabs} from "@mui/material";
import CorporateManagementCorporateTab from "./CorporateManagementTabs/CorporateManagementCorporateTab";
import CorporateManagementFinanceTab from "./CorporateManagementTabs/CorporateManagementFinanceTab";
import CorporateManagementSettingTab from "./CorporateManagementTabs/CorporateManagementSettingTab";
import CorporateManagementPersonnelTab from "./CorporateManagementTabs/CorporateManagementPersonnelTab";
import CorporateManagementProcessTab from "./CorporateManagementTabs/CorporateManagementProcessTab";
import CorporateManagementInvoicesTab from "./CorporateManagementTabs/CorporateManagementInvoicesTab";

const CorporateDetailsManagement = () => {
    const error = useContext(ErrorContext);
    const {corporateId} = useParams();
    const [currentCorporate, SetCurrentCorporate] = useState(null);
    const [selectedTab, setSelectedTab] = useState("CORPORATE");
    useEffect(() => {
        getCorporateData();
    }, [corporateId]);

    function getCorporateData(){
        corporate_getById({id: corporateId})
            .then((data) => {
                SetCurrentCorporate(data.data.Data);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }
    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>تمامی شرکت ها در این قسمت مدیریت میشوند</p>
            </Notice>
            {currentCorporate && <div className="row">
                <div className={"col-md-10"}>
                    <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                        <Tabs
                            value={selectedTab}
                            onChange={(e, n) => setSelectedTab(n)}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant={"standard"}
                            aria-label="full width tabs example"
                        >
                            <Tab label="سازمان" value={"CORPORATE"}/>
                            <Tab label="پرسنل" value={"PERSONNEL"}/>
                            <Tab label="مالی" value={"FINANCE"}/>
                            <Tab label="فاکتور ها" value={"INVOICES"}/>
                            <Tab label="فرایند ها" value={"PROCESS"}/>
                            <Tab label="تنظیمات" value={"SETTING"}/>
                        </Tabs>
                    </Paper>
                    {selectedTab === "CORPORATE" && <CorporateManagementCorporateTab currentCorporate={currentCorporate}/>}
                    {selectedTab === "PERSONNEL" && <CorporateManagementPersonnelTab currentCorporate={currentCorporate}/>}
                    {selectedTab === "FINANCE" && <CorporateManagementFinanceTab currentCorporate={currentCorporate}/>}
                    {selectedTab === "PROCESS" && <CorporateManagementProcessTab currentCorporate={currentCorporate}/>}
                    {selectedTab === "INVOICES" && <CorporateManagementInvoicesTab currentCorporate={currentCorporate}/>}
                    {selectedTab === "SETTING" && <CorporateManagementSettingTab currentCorporate={currentCorporate} updatePage={getCorporateData}/>}
                </div>
                <div className="col-md-2">
                    <Notes source={{Corporate: {Id: currentCorporate.Id}}}/>
                </div>
            </div>}
        </>
    );
};

export default CorporateDetailsManagement;
