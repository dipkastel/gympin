import React from 'react';
import UserPlaces from "../places/UserPlaces";
import UserCorporates from "../corporates/UserCorporates";

const UserManagementRelationsTab = ({currentUser}) => {
    return (
        <>
            {currentUser && <div className="row">
                <div className="col-md-6">
                      {currentUser && <UserPlaces currentUser={currentUser} />}
                </div>
                <div className="col-md-6">
                      {currentUser && <UserCorporates currentUser={currentUser} />}
                </div>
            </div>}
        </>
    );
};

export default UserManagementRelationsTab;
