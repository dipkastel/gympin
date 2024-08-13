import React from 'react';
import UserAccess from "../Access/UserAccess";
import Userstatus from "../Status/UserStatus";
import UserWizard from "../userWizard/UserWizard";
import UserAdvanceSettings from "../userAdvanceSettings/UserAdvanceSettings";

const UserManagementSettingTab = ({currentUser}) => {
    return (
        <>
            {currentUser && <div className="row">

                <div className="col-md-6">
                    {currentUser && <UserWizard currentUser={currentUser}/>}
                    {currentUser && <Userstatus currentUser={currentUser}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserAccess currentUser={currentUser}/>}
                </div>


            </div>}
        </>
    );
};

export default UserManagementSettingTab;
