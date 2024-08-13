import React from 'react';
import UserAdvanceSettings from "../userAdvanceSettings/UserAdvanceSettings";

const UserManagementAdvanceTab = ({currentUser}) => {
    return (
        <>
            {currentUser && <div className="row">

                <div className="col-md-6">
                    {currentUser && <UserAdvanceSettings currentUser={currentUser}/>}
                </div>
                <div className="col-md-6">
                </div>


            </div>}
        </>
    );
};

export default UserManagementAdvanceTab;
