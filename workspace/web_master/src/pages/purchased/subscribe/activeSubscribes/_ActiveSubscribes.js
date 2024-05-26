import React, {useContext, useEffect, useState} from "react";
import {Avatar, Chip, Divider, Link, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {purchasedSubscribe_getPlaceSubscribes} from "../../../../network/api/subscribe.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {SubscribeStatusEnum} from "../../../../helper/enums/SubscribeStatusEnum";

export default function _ActiveSubscribes() {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [PlaceSubscribes, setPlaceSubscribes] = useState([])
    useEffect(() => {
        getActiveSubscribes();
    }, []);

    function getActiveSubscribes() {
        purchasedSubscribe_getPlaceSubscribes({placeId: place.Id}).then(result => {
            setPlaceSubscribes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    const getColor=(status)=> {
        switch (status) {
            case "PAYMENT_WAIT" : return "error";
            case "READY_TO_ACTIVE" :return "warning";
            case "PROCESSING" :return "warning";
            case "ACTIVE":return "success";
            case "EXPIRE":return "error";
            case "COMPLETE":return "secondary";
            case "CANCEL":return "primary";
            default:return "primary";
        }

    }
    return (
        <List sx={{width: '100%', direction: "rtl", bgcolor: 'background.paper'}}>
            {PlaceSubscribes.map((item, Index) => (
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
                        <Chip color={getColor(item.Status)}
                              label={SubscribeStatusEnum[item?.Status]}/>
                    </ListItemButton>
                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                </div>))}
        </List>
    );
}
