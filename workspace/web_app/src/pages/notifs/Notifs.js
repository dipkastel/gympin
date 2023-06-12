import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import {notificationGetByUser} from "../../network/api/notification.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const Notifs = (props) => {
    const error = useContext(ErrorContext);
    const [notifs,SetNotifs] = useState([]);
    useEffect(() => {
        notificationGetByUser().then(result=>{
            SetNotifs(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    return (
        <>
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
