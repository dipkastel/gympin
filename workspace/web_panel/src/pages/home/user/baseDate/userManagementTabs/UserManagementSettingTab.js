import React from 'react';
import UserAccess from "../Access/UserAccess";
import Userstatus from "../Status/UserStatus";

const UserManagementSettingTab = ({currentUser}) => {
    return (
        <>
            {currentUser && <div className="row">

                <div className="col-md-6">
                    {currentUser && <UserAccess currentUser={currentUser}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <Userstatus currentUser={currentUser}/>}
                </div>


            </div>}
        </>
    );
};

export default UserManagementSettingTab;
