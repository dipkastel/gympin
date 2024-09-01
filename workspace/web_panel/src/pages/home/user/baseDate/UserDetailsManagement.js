import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {user_getById} from "../../../../network/api/user.api";
import {Paper, Tab, Tabs} from "@mui/material";
import "./userCss.css";
import Notes from "../../../partials/content/notes/Notes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import UserManagementUserTab from "./userManagementTabs/UserManagementUserTab";
import UserManagementRelationsTab from "./userManagementTabs/UserManagementRelationsTab";
import UserManagementUserBuys from "./userManagementTabs/UserManagementUserBuys";
import UserManagementSettingTab from "./userManagementTabs/UserManagementSettingTab";
import _UserActivity from "./activity/_UserActivity";
import UserManagementAdvanceTab from "./userManagementTabs/UserManagementAdvanceTab";
import UserFinanceManagement from "./finance/UserFinanceManagement";

const UserDetailManagement = () => {
    const error = useContext(ErrorContext);
    const {userId} = useParams();
    const [currentUser, SetCurrentUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState("USER");

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
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>تمامی افراد در مجموعه کاربر محسوب میشوند</p>
                <p>این کاربران میتوانند ورزشکار ، مدیر مجموعه ، پرسنل جیم پین و ... باشند</p>
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
                            <Tab label="کاربر" value={"USER"}/>
                            <Tab label="روابط" value={"RELATIONS"}/>
                            <Tab label="خرید ها" value={"BUYS"}/>
                            <Tab label="مالی" value={"FINANCE"}/>
                            <Tab label="تنظیمات" value={"SETTING"}/>
                            <Tab label="فعالیت ها" value={"ACTIVITY"}/>
                            <Tab label="پیشرفته" value={"ADVANCE"}/>
                        </Tabs>
                    </Paper>
                    {selectedTab === "USER" && <UserManagementUserTab currentUser={currentUser}/>}
                    {selectedTab === "RELATIONS" && <UserManagementRelationsTab currentUser={currentUser}/>}
                    {selectedTab === "BUYS" && <UserManagementUserBuys currentUser={currentUser}/>}
                    {selectedTab === "FINANCE" && <UserFinanceManagement currentUser={currentUser}/>}
                    {selectedTab === "SETTING" && <UserManagementSettingTab currentUser={currentUser}/>}
                    {selectedTab === "ACTIVITY" && <_UserActivity currentUser={currentUser}/>}
                    {selectedTab === "ADVANCE" && <UserManagementAdvanceTab currentUser={currentUser}/>}
                </div>}
                <div className="col-md-2">
                    {currentUser && <Notes source={{User: {Id: currentUser.Id}}}/>}
                </div>
            </div>
        </>
    );
};

export default UserDetailManagement;
