import React, {useState} from 'react';
import {Grid, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {ApplicationEnum} from "../../../../helper/enums/ApplicationEnum";

const _ActiveUserListItem = ({sessionId,users,selectedUser,setSelectedUser}) => {


    function getItemBgColor(appName){
        switch (appName) {
            case "ANDROID": return "#063f0b";
            case "IOS": return "#272a03";
            case "WEBPANEL": return "#422b08";
            case "WEBAPP": return "#03382c";
            case "WEBMASTER": return "#5d083a";
            case "WEBCORPORATE": return "#310767";
            default : return "#2f2f2f";

        }
    }

    return (
        <Grid container sx={{border:selectedUser === sessionId?"1px solid #e7333e":"1px solid #aaa",
            background:getItemBgColor(users[sessionId].appName),
            borderRadius:3,
            mx:1,my:1}}>
            <Grid container sx={{background:"#FFFFFF",
                borderRadius:3}}>
                <ListItemButton
                    selected={selectedUser?.sessionId === sessionId}
                    onClick={() => setSelectedUser(users[sessionId])}
                >
                    <ListItemText sx={{textAlign:"start"}} primary={users[sessionId]?.username} secondary={users[sessionId]?.phoneNumber} />
                    <ListItemText sx={{textAlign:"end"}} primary={sessionId} secondary={users[sessionId]?.driverId}  />
                </ListItemButton>
            </Grid>
            <Typography variant={"caption"} sx={{px:1,color:"white"}}>
                {ApplicationEnum[users[sessionId]?.appName]}</Typography>
        </Grid>
    );
};

export default _ActiveUserListItem;
