import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Divider,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {ticket_getUserEntered} from "../../../network/api/ticket.api";
import {useSelector} from "react-redux";

export default function _GateEntered({SetSelectedTicket}) {

    const place = useSelector(({place}) => place.place)
    const [users, SetUsers] = useState([]);

    useEffect(() => {
        getEnterdUser();
    }, []);

    function getEnterdUser() {
        ticket_getUserEntered({placeId: place.Id}).then(result => {
            SetUsers(result.data.Data);
            console.log(result);
        }).catch(e => console.log(e))
    }


    return (
        <List sx={{width: '100%', direction: "rtl", bgcolor: 'background.paper'}}>
            {users.map((item, Index) => (
                <div key={Index}>


                    <ListItemButton sx={{direction:"rtl",textAlign:"right",justifyContent:"space-between"}}>
                        <ListItemAvatar sx={{margin: 0}}>
                            <Avatar
                                sx={{width: 50, height: 50}}
                                alt="Remy Sharp"
                                src={item.User.Avatar.Url}/>
                        </ListItemAvatar>
                        <Link href={"/users/singleuser?id=" + item.User.Id}
                              sx={{textDecoration: "none", color: "#666666"}}>
                            <ListItemText primary={`${item.User.FullName || ""} (${item.User.Username})`}/>
                            <ListItemText secondary={`${item.Plan.Name || ""}`}/>
                            <ListItemText secondary={`ورود : ${new Date(item.Entry.EnterDate).toLocaleDateString('fa-IR', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: "2-digit",
                                              minute: "2-digit"
                                          })}`}/>
                        </Link>
                        <Button variant={"contained"} sx={{margin:0}}
                                onClick={(e) => SetSelectedTicket(item)}>انتخاب</Button>
                    </ListItemButton>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                </div>
                ))}

        </List>
    );
}
