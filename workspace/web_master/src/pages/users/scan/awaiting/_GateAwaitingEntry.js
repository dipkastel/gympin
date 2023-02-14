import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Card,
    Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {ticket_acceptEnterRequested, ticket_getEnterRequested} from "../../../../network/api/ticket.api";
import {useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";

export default function _GateAwaitingEntry({enterAccepted}) {
    const place = useSelector(({place}) => place.place)
    const [awaitingUsers, SetAwaitingUsers] = useState([])


    useEffect(() => {
        getRequestedUsers();
        setInterval(getRequestedUsers, 2 * 60 * 1000);
    }, []);

    function getRequestedUsers() {
        ticket_getEnterRequested({placeId: place.Id}).then(result => {
            SetAwaitingUsers(result.data.Data);
        }).catch(e => console.log(e))
    }

    function acceptEnterRequest(e, ticketItem) {
        ticket_acceptEnterRequested({ticketId: ticketItem.Id}).then(result => {
            getRequestedUsers();
            enterAccepted(result.data.Data);
        }).catch(e => console.log(e));
    }

    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {awaitingUsers.map((item, Index) => (

                <Card key={Index} elevation={3} sx={{
                    margin: 2,
                    marginTop: 0
                }}>
                    <div>

                        <ListItemButton sx={{direction:"rtl",textAlign:"right",justifyContent:"space-between"}}>
                            <ListItemAvatar sx={{margin: 0}}>
                                <Avatar
                                    sx={{width: 50, height: 50}}
                                    alt="Remy Sharp"
                                    src={item.User.Avatar.Url}/>
                            </ListItemAvatar>
                            <Link href={"/users/singleuser?id=" + item.User.Id}
                                  sx={{textDecoration: "none", color: "#666666"}}>
                                <ListItemText primary={`${item.User.FullName || ""}`}
                                              secondary={item.Plan.Name}/>
                            </Link>
                            <Button variant={"contained"} sx={{margin:0}}
                                    onClick={(e) => acceptEnterRequest(e, item)}>تایید</Button>
                        </ListItemButton>
                    </div>
                </Card>
            ))}

        </List>
    );
}
