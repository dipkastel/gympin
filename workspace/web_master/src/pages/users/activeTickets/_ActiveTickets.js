import React, {useEffect, useState} from "react";
import {
    Avatar, Button,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {toAbsoluteUrl} from "../../../helper/utils";
import {ticket_getActiveTickets} from "../../../network/api/ticket.api";
import {useSelector} from "react-redux";

export default function _ActiveTickets() {
    const place = useSelector(({place}) => place.place)
    const [activeTickets, setActiveTickets] = useState([])
    useEffect(() => {
        getActiveTickets();
    }, []);

    function getActiveTickets() {
        ticket_getActiveTickets({placeId: place.Id}).then(result => {
            setActiveTickets(result.data.Data);
            console.log(result.data.Data);
        }).catch(e => console.log(e));
    }

    return (
        <List sx={{width: '100%', direction: "rtl", bgcolor: 'background.paper'}}>
            {activeTickets.map((item, Index) => (
                <div key={Index}>


                    <ListItemButton sx={{direction:"rtl",textAlign:"right",justifyContent:"space-between"}}>
                        <ListItemAvatar sx={{margin: 0}}>
                            <Avatar
                                sx={{width: 50, height: 50}}
                                alt="Remy Sharp"
                                src={item.User.Avatar.Url}/>
                        </ListItemAvatar>
                        <Link href={"/users/singleuser?id=" + item.User.Id}
                              sx={{textDecoration: "none", color: "#666666" ,width:"100%"}}>
                            <ListItemText  primary={`${item.User.FullName || ""} (${item.User.Username})`}/>
                            <ListItemText secondary={`${item.Plan.Name || ""}`}/>
                        </Link>
                    </ListItemButton>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                </div>))}
        </List>
    );
}
