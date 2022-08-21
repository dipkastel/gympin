import React from 'react';
import _UserPlanDetail from "./_UserPlanDetail";
import _UserPlanEnterList from "./_UserPlanEnterList";
import _UserPlanActions from "./_UserPlanActions";

const UserPlan = () => {
    return (
        <>
            <_UserPlanDetail/>
            <_UserPlanEnterList/>
            <_UserPlanActions/>
        </>
    );
};

export default UserPlan;
