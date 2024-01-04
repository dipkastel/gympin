import React from 'react';
import UserAvatar from "../Avatar/UserAvatar";
import UserBasics from "../Base/UserBasics";

const UserManagementUserTab = ({currentUser}) => {
    return (
        <>
            {currentUser && <div className="row">

                <div className="col-md-6">
                    {currentUser && <UserBasics currentUser={currentUser}/>}
                </div>
                <div className="col-md-6">
                    {currentUser && <UserAvatar currentUser={currentUser}/>}
                </div>

            </div>}
        </>
    );
};

export default UserManagementUserTab;
