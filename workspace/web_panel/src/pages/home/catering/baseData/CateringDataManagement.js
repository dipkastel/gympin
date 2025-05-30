import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../../partials/content/Notice";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import {Catering_getById, Catering_update} from "../../../../network/api/catering.api";
import Notes from "../../../partials/content/notes/Notes";
import {Paper, Tab, Tabs} from "@mui/material";
import CateringManagementCateringTab from "./CateringManagementTabs/CateringManagementCateringTab";
import CateringManagementDataTab from "./CateringManagementTabs/CateringManagementDataTab";
import CateringManagementManuTab from "./CateringManagementTabs/CateringManagementManuTab";



const CateringDataManagement = () => {

    const error = useContext(ErrorContext);
    let {cateringId} = useParams();
    const [catering, setCatering] = useState(null);
    const [selectedTab, setSelectedTab] = useState("CATERING");
    useEffect(() => {
        getCatering();
    }, []);

    function getCatering() {
        Catering_getById({id: cateringId}).then((result) => {
            setCatering(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function update(catering) {
        Catering_update(catering).then(data => {
            setCatering(data.data.Data);
            error.showError({message: "با موفقیت ثبت شد"});
        }).catch(e => {
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
                {catering && (
                    <p>مدیریت مشخصات کیترینگ {catering.Name}</p>
                )}
            </Notice>
            {catering && <div className="row">
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
                            <Tab label="کیترینگ" value={"CATERING"}/>
                            <Tab label="اطلاعات" value={"DATA"}/>
                            <Tab label="منو" value={"TICKET"}/>
                            <Tab label="فروش ها" value={"SELLS"}/>
                            <Tab label="تنظیمات" value={"SETTING"}/>
                        </Tabs>
                    </Paper>
                    {selectedTab === "CATERING"&&<CateringManagementCateringTab catering={catering} update={update}/>}
                    {selectedTab === "DATA"&&<CateringManagementDataTab catering={catering} update={update}/>}
                    {selectedTab === "TICKET"&&<CateringManagementManuTab catering={catering} update={update}/>}
            {/*        {selectedTab === "PLACE"&&<PlaceManagementPlaceTab place={place} update={update}/>}*/}
            {/*        {selectedTab === "DATA"&&<PlaceManagementDataTab place={place} update={update}/>}*/}
            {/*        {selectedTab === "TICKET"&&<PlaceManagementTicketsTab place={place}/>}*/}
            {/*        {selectedTab === "SELLS"&&<PlaceManagementSellsTab place={place}/>}*/}
            {/*        {selectedTab === "BENEFICIARIES"&&<PlaceManagementBeneficiariesTab place={place}/>}*/}
            {/*        {selectedTab === "SETTING"&&<PlaceManagementSettingTab place={place} update={update}/>}*/}
                </div>
                <div className="col-md-2">
                    {catering && <Notes source={{Place: {Id: catering.Id}}}/>}
                </div>
            </div>}

        </>
    );
};

export default CateringDataManagement;
