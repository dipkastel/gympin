import React, {useContext, useEffect, useState} from "react";
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
import {ErrorContext} from "../../../components/GympinPagesProvider";

export default function _ActiveTickets() {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [activeTickets, setActiveTickets] = useState([])
    useEffect(() => {
        getActiveTickets();
    }, []);

    function getActiveTickets() {
        ticket_getActiveTickets({placeId: place.Id}).then(result => {
            setActiveTickets(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
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
                                src={item.User.Avatar ? (item.User.Avatar.Url || "https://api.gympin.ir/resource/image?Id=11") : "https://api.gympin.ir/resource/image?Id=11"}/>
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
