import React from 'react';
import {Grid, ListItemButton, ListItemText, Typography} from "@mui/material";
import {ApplicationEnum} from "../../../../helper/enums/ApplicationEnum";
import {BookOnline, OfflineBolt} from "@mui/icons-material";

const _ActiveUserListItem = ({user,selectedUser,setSelectedUser}) => {

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

    function getConnectionTime(startDate){
        if(!startDate) return "not Online";
        const start = new Date(startDate);
        const now = new Date();
        const diffInMs = now - start;
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
        const formattedTime =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        return formattedTime;
    }
    return (
        <Grid container sx={{border:selectedUser === user.driverId?"1px solid #e7333e":"1px solid #aaa",
            background:getItemBgColor(user.sessions[0].appName),
            borderRadius:3,
            mx:1,my:1}}>
            <Grid container sx={{background:"#FFFFFF",
                borderRadius:3}}>
                <ListItemButton
                    selected={selectedUser?.sessionId === user.driverId}
                    onClick={() => setSelectedUser(user.sessions[0])}
                >
                    <ListItemText sx={{textAlign:"start"}} primary={user.sessions[0]?.username} secondary={user.sessions[0]?.phoneNumber} />
                    <ListItemText sx={{textAlign:"end"}} primary={user.driverId} secondary={user.sessions[0]?.driverId}  />
                </ListItemButton>
                <OfflineBolt sx={{ml:1,mt:1,color:(user.sessions[0].isOnline)?"#0d8521":"#8d0e0e"}}/>
            </Grid>
            <Grid container justifyContent={"space-between"}>
                <Typography variant={"caption"} sx={{px:1,color:"white"}}>
                    {ApplicationEnum[user.sessions[0]?.appName]}</Typography>
                <Typography variant={"caption"} sx={{px:1,color:"white"}}>{getConnectionTime(user?.sessions?.filter(ss=>ss.isOnline)[0]?.connectTime)}</Typography>

            </Grid>
        </Grid>
    );
};

export default _ActiveUserListItem;
