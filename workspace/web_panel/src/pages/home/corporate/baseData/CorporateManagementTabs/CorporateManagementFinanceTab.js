import React, {useContext, useEffect, useState} from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {corporate_getFinanceCorporate} from "../../../../../network/api/corporate.api";
import FinanceCorporateInformationTab from "./corporateFinanceTabs/FinanceCorporateInformationTab";
import FinanceCorporateRequestTab from "./corporateFinanceTabs/FinanceCorporateRequestTab";
import FinanceCorporateTransactionsTab from "./corporateFinanceTabs/FinanceCorporateTransactionsTab";

const CorporateManagementFinanceTab = ({currentCorporate}) => {

    const [updatePageP, SetUpdatePageP] = useState(false);
    const [selectedTab, setSelectedTab] = useState("INFORMATION");

    const error = useContext(ErrorContext);
    const [financeCorporate, SetFinanceCorporate] = useState(0);
    useEffect(() => {
        corporate_getFinanceCorporate({id: currentCorporate.Id}).then(result => {
            SetFinanceCorporate(result.data.Data);

        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }

    return (
        <>
            {!updatePageP && currentCorporate && <>
                <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, n) => setSelectedTab(n)}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant={"standard"}
                        aria-label="full width tabs example"
                    >
                        <Tab label="اطلاعات" value={"INFORMATION"}/>
                        <Tab label="درخواست ها" value={"REQUESTS"}/>
                        <Tab label="تراکنش ها" value={"TRANSACTIONS"}/>
                    </Tabs>
                </Paper>
                {selectedTab === "INFORMATION" && <FinanceCorporateInformationTab currentCorporate={currentCorporate} financeCorporate={financeCorporate}/>}
                {selectedTab === "REQUESTS" && <FinanceCorporateRequestTab currentCorporate={currentCorporate} updatePage={updatePage} financeCorporate={financeCorporate}/>}
                {selectedTab === "TRANSACTIONS" && <FinanceCorporateTransactionsTab currentCorporate={currentCorporate} updatePage={updatePage} financeCorporate={financeCorporate}/>}
            </>}
        </>
    );
};

export default CorporateManagementFinanceTab;
