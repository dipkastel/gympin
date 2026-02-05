import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {PlaceGym_getPlaceById, PlaceGym_updatePlace} from "../../../../network/api/placeGym.api";
import Notice from "../../../partials/content/Notice";
import Notes from "../../../partials/content/notes/Notes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Paper, Tab, Tabs} from "@mui/material";
import PlaceManagementDataTab from "./placeManagementTabs/PlaceManagementDataTab";
import PlaceManagementTicketsTab from "./placeManagementTabs/PlaceManagementTicketTab";
import PlaceManagementSettingTab from "./placeManagementTabs/PlaceManagementSettingTab";
import PlaceManagementPlaceTab from "./placeManagementTabs/PlaceManagementPlaceTab";
import PlaceManagementBeneficiariesTab from "./placeManagementTabs/PlaceManagementBeneficiariesTab";
import PlaceManagementSellsTab from "./placeManagementTabs/PlaceManagementSellTab";
import PlaceManagementReportTab from "./placeManagementTabs/PlaceManagementReportTab";

const PlaceDataManagement = () => {
    const error = useContext(ErrorContext);
    let {placeId} = useParams();
    const [place, setPlace] = useState(null);
    const [selectedTab, setSelectedTab] = useState("PLACE");
    useEffect(() => {
        getPlace();
    }, []);

    function getPlace() {
        PlaceGym_getPlaceById({id: placeId}).then((result) => {
            setPlace(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updatePlace(place) {
        PlaceGym_updatePlace(place).then(data => {
            setPlace(data.data.Data);
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
                {place && (
                    <p>مدیریت مشخصات مجموعه {place.Name}</p>
                )}
            </Notice>
            {place && <div className="row">
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
                            <Tab label="مرکز" value={"PLACE"}/>
                            <Tab label="اطلاعات" value={"DATA"}/>
                            <Tab label="بلیط ها" value={"TICKET"}/>
                            <Tab label="فروش ها" value={"SELLS"}/>
                            <Tab label="ذینفعان" value={"BENEFICIARIES"}/>
                            <Tab label="تنظیمات" value={"SETTING"}/>
                            <Tab label="گزارشات" value={"REPORTS"}/>
                        </Tabs>
                    </Paper>
                    {selectedTab === "PLACE"&&<PlaceManagementPlaceTab place={place} updatePlace={updatePlace}/>}
                    {selectedTab === "DATA"&&<PlaceManagementDataTab place={place} updatePlace={updatePlace}/>}
                    {selectedTab === "TICKET"&&<PlaceManagementTicketsTab place={place}/>}
                    {selectedTab === "SELLS"&&<PlaceManagementSellsTab place={place}/>}
                    {selectedTab === "BENEFICIARIES"&&<PlaceManagementBeneficiariesTab place={place}/>}
                    {selectedTab === "SETTING"&&<PlaceManagementSettingTab place={place} updatePlace={updatePlace}/>}
                    {selectedTab === "REPORTS"&&<PlaceManagementReportTab place={place} updatePlace={updatePlace}/>}
                </div>
                <div className="col-md-2">
                    {place && <Notes source={{Place: {Id: place.Id}}}/>}
                </div>
            </div>}
        </>
    );
};

export default PlaceDataManagement;
