import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {Paper, Tab, Tabs} from "@mui/material";
import UserManagementUserTab from "../../user/baseDate/userManagementTabs/UserManagementUserTab";
import UserManagementRelationsTab from "../../user/baseDate/userManagementTabs/UserManagementRelationsTab";
import UserManagementUserBuys from "../../user/baseDate/userManagementTabs/UserManagementUserBuys";
import UserManagementFinanceTab from "../../user/baseDate/userManagementTabs/UserManagementFinanceTab";
import UserManagementSettingTab from "../../user/baseDate/userManagementTabs/UserManagementSettingTab";
import Notes from "../../../partials/content/notes/Notes";
import {user_getById} from "../../../../network/api/user.api";

const CoachDetailsManagement = () => {

    const error = useContext(ErrorContext);
    const {userId} = useParams();
    const [currentUser, SetCurrentUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState("COACH");

    useEffect(() => {
        getUser();
    }, [userId]);

    function getUser() {
        user_getById({id: userId})
            .then((data) => {
                SetCurrentUser(data.data.Data);
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
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>تمامی افراد در این لیست مربی محسوب میشوند</p>
                <p>این کاربران دارای پروفایل مربی بوده و از امکانات مربیان برخوردار میباشند</p>
            </Notice>
            <div className="row">

                {currentUser && <div className={"col-md-10"}>
                    <Paper sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                        <Tabs
                            value={selectedTab}
                            onChange={(e, n) => setSelectedTab(n)}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant={"standard"}
                            aria-label="full width tabs example"
                        >
                            <Tab label="اطلاعات مربی" value={"COACH"}/>
                        </Tabs>
                    </Paper>
                    {selectedTab === "COACH" && <UserManagementUserTab currentUser={currentUser}/>}
                </div>}
                <div className="col-md-2">
                    {currentUser && <Notes source={{User: {Id: currentUser.Id}}}/>}
                </div>
            </div>
        </div>
    );
};

export default CoachDetailsManagement;
