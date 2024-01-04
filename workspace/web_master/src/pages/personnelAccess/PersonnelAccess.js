import React from 'react';
import {useLocation} from "react-router-dom";
import {Card, CardHeader} from "@mui/material";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import getAccessOf from "../../helper/accessManager";
import _generalAccess from "./_generalAccess";
import _hallAccess from "./_hallAccess";
import AccessDenied from "../../components/AccessDenied";

const PersonnelAccess = () => {
    const location = useLocation();
    const {user} = location.state;

    if(!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return <AccessDenied/>;
    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>

                <CardHeader
                    title={"دسترسی های "+(user.Username||"")+(user.FullName?`(${user.FullName})`:"")}
                />
            </Card>
            <_generalAccess user={user}/>
            <_hallAccess user={user}/>
        </>
    );
};

export default PersonnelAccess;
