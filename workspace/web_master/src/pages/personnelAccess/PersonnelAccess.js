import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {Card, CardHeader} from "@mui/material";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import getAccessOf from "../../helper/accessManager";
import _generalAccess from "./_generalAccess";
import AccessDenied from "../../components/AccessDenied";
import _buyableAccess from "./_buyableAccess";
import {getUserFixedName} from "../../helper/utils";

const PersonnelAccess = () => {
    const location = useLocation();
    const {placePersonnel} = location.state;
    useEffect(() => {
        document.title = 'مدیریت دسترسی ها';
    }, []);


    if(!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return <AccessDenied/>;
    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>

                <CardHeader
                    title={"دسترسی های "+getUserFixedName(placePersonnel.User)}
                />
            </Card>
            <_generalAccess user={placePersonnel.User}/>
            <_buyableAccess placePersonnel={placePersonnel}/>
        </>
    );
};

export default PersonnelAccess;
