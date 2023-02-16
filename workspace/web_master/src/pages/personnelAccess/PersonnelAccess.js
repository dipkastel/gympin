import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    placePersonnel_getAccess,
    placePersonnel_update,
    placePersonnel_updatePersonnelAccess
} from "../../network/api/placePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {
    Avatar,
    Card,
    CardContent, CardHeader, Divider,
    Grid,
    IconButton, InputLabel,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Switch
} from "@mui/material";
import {personnelRoles} from "../../helper/enums/personnelRoles";
import DeleteIcon from "@mui/icons-material/Delete";
import {personnelAccessEnum, personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import getAccessOf from "../../helper/accessManager";

const PersonnelAccess = () => {
    const location = useLocation();
    const {user} = location.state;
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [userAccess,SetUserAccess] = useState([]);

    useEffect(() => {
        getAccess();
    }, []);


    function getAccess() {

        placePersonnel_getAccess({placeId: place.Id,userId: user.Id}).then(result=>{
            SetUserAccess(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function changeAccess(item, e) {
        item.Access = e.target.checked;
        placePersonnel_updatePersonnelAccess([item]).then(result=>{
            getAccess();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!getAccessOf(personnelAccessEnumT.ManagementPersonnel))
        return (<></>);

    return (

        <>
            <Card elevation={3} sx={{margin: 1}}>

                <CardHeader
                    title={"دسترسی های "+(user.Username||"")+(user.FullName?`(${user.FullName})`:"")}
                />
            </Card>
            <List>
                {userAccess && userAccess.map(item => (
                        <Card elevation={3} sx={{margin: 1}}  key={"access-" + item.Section}>
                            <CardContent>
                                <InputLabel htmlFor={item.Section}>{personnelAccessEnum[item.Section]}</InputLabel>
                                <Switch id={item.Section} checked={item.Access} onChange={(e)=>changeAccess(item,e)}/>
                            </CardContent>
                        </Card>
                ))}

            </List>
        </>
    );
};

export default PersonnelAccess;
