import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {PlaceGym_updatePlace} from "../../../../network/api/placeGym.api";
import Notice from "../../../partials/content/Notice";
import Notes from "../../../partials/content/notes/Notes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Paper, Tab, Tabs} from "@mui/material";
import {PlaceCounseling_getPlaceById, PlaceCounseling_updatePlace} from "../../../../network/api/placeCounseling.api";
import CounselingManagementBaseTab from "./counselingManagementTabs/CounselingManagementBaseTab";
import CounselingManagementDataTab from "./counselingManagementTabs/CounselingManagementDataTab";

const CounselingDataManagement = () => {
    const error = useContext(ErrorContext);
    let {counselingId} = useParams();
    const [counseling, setCounseling] = useState(null);
    const [selectedTab, setSelectedTab] = useState("COUNSELING");
    useEffect(() => {
        getPlace();
    }, []);

    function getPlace() {
        PlaceCounseling_getPlaceById({id: counselingId}).then((result) => {
            console.log(result);
            setCounseling(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateCounseling(place) {
        PlaceCounseling_updatePlace(place).then(data => {
            setCounseling(data.data.Data);
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
                {counseling && (
                    <p>مدیریت مشخصات مجموعه {counseling.Name}</p>
                )}
            </Notice>
            {counseling && <div className="row">
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
                            <Tab label="مرکز" value={"COUNSELING"}/>
                            <Tab label="اطلاعات" value={"DATA"}/>
                            <Tab label="عضویت ها" value={"TICKET"}/>
                            <Tab label="فروش ها" value={"SELLS"}/>
                            <Tab label="ذینفعان" value={"BENEFICIARIES"}/>
                            <Tab label="تنظیمات" value={"SETTING"}/>
                            <Tab label="گزارشات" value={"REPORTS"}/>
                        </Tabs>
                    </Paper>

                    {selectedTab === "COUNSELING"&&<CounselingManagementBaseTab counseling={counseling} updateCounseling={updateCounseling}/>}
                    {selectedTab === "DATA"&&<CounselingManagementDataTab counseling={counseling} updateCounseling={updateCounseling}/>}
                    {/*{selectedTab === "TICKET"&&<PlaceManagementTicketsTab counseling={counseling}/>}*/}
                    {/*{selectedTab === "SELLS"&&<GymManagementSellTab counseling={counseling}/>}*/}
                    {/*/!*{selectedTab === "BENEFICIARIES"&&<GymManagementBeneficiariesTab counseling={counseling}/>}*!/*/}
                    {/*{selectedTab === "SETTING"&&<GymManagementSettingTab counseling={counseling} updateCounseling={updateCounseling}/>}*/}
                    {/*{selectedTab === "REPORTS"&&<PlaceManagementReportTab counseling={counseling} updateCounseling={updateCounseling}/>}*/}
                </div>
                <div className="col-md-2">
                    {counseling && <Notes source={{Place: {Id: counseling.Id}}}/>}
                </div>
            </div>}
        </>
    );
};

export default CounselingDataManagement;
