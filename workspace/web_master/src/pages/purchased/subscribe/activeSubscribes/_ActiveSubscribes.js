import React, {useContext, useEffect, useState} from "react";
import {Avatar, Divider, Link, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {purchasedSubscribe_getActiveSubscribes} from "../../../../network/api/subscribe.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

export default function _ActiveSubscribes() {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [activeSubscribes, setActiveSubscribes] = useState([])
    useEffect(() => {
        getActiveSubscribes();
    }, []);

    function getActiveSubscribes() {
        purchasedSubscribe_getActiveSubscribes({placeId: place.Id}).then(result => {
            setActiveSubscribes(result.data.Data);
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
            {activeSubscribes.map((item, Index) => (
                <div key={Index}>


                    <ListItemButton sx={{direction: "rtl", textAlign: "right", justifyContent: "space-between"}}>
                        <ListItemAvatar sx={{margin: 0}}>
                            <Avatar
                                sx={{width: 50, height: 50}}
                                alt="Remy Sharp"
                                src={item?.User?.Avatar?.Url}/>
                        </ListItemAvatar>
                        <Link href={"/users/singleuser?id=" + item?.User?.Id}
                              sx={{textDecoration: "none", color: "#666666", width: "100%"}}>
                            <ListItemText primary={`${item?.User?.FullName || ""} (${item?.User?.Username})`}/>
                            <ListItemText secondary={`${item?.Name || ""}`}/>
                        </Link>
                    </ListItemButton>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                </div>))}
        </List>
    );
}
