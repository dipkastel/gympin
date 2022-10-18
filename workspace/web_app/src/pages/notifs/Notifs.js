import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import {notificationGetByUser} from "../../network/api/notification.api";

const Notifs = (props) => {
    const [notifs,SetNotifs] = useState([]);
    useEffect(() => {
        notificationGetByUser().then(result=>{
            SetNotifs(result.data.Data);
        }).catch(e=>console.log(e))
    }, []);

    return (
        <>
            <Grid item  xs display="flex" justifyContent="center" alignItems="center">
                <Typography variant={"h3"} sx={{padding:1}}>
                    اعلانات
                </Typography>
            </Grid>

            <List dense={false}>
                {notifs.map(item=>(
                    <div key={item.Id}>
                        <ListItem sx={{textAlign:"inherit"}}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DraftsOutlinedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.Title}
                                secondary={item.Notif ? item.Notif : null}
                            />
                        </ListItem>
                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                    </div>
                ))}
            </List>

        </>
    );
};

export default Notifs;
