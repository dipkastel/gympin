import React, {useContext, useEffect, useState} from "react";
import {
    Avatar, Badge,
    Button,
    Card,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Link,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Typography
} from "@mui/material";
import {
    purchasedSubscribe_acceptEnterRequested,
    purchasedSubscribe_getEnterRequested
} from "../../../../network/api/subscribe.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import PanToolIcon from '@mui/icons-material/PanTool';
import {decryptId} from "../../../../helper/utils";

export default function _HallAwaitingEntry({selectSubscribe,updatePage}) {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [awaitingUsers, SetAwaitingUsers] = useState([])
    const [openModalAwaiteList, SetOpenModalAwaiteList] = useState(false)



    useEffect(() => {
        getRequestedUsers();
        var interval = setInterval(getRequestedUsers, 2 * 60 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    function getRequestedUsers() {
        if (!place) return;
        purchasedSubscribe_getEnterRequested({placeId: place.Id}).then(result => {
            SetAwaitingUsers(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function RenderModalAwaitingList() {
        return (
            <div>
                <Dialog fullWidth open={openModalAwaiteList} onClose={() => SetOpenModalAwaiteList(false)}>
                    <DialogTitle>لیست کاربران در انتظار ورود</DialogTitle>
                    <DialogContent sx={{p:1}}>
                         <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                             {awaitingUsers.map((item, Index) => (
                                        <ListItemButton key={"await-List-"+Index} sx={{direction: "rtl", textAlign: "right", justifyContent: "space-between"}}>
                                            <ListItemAvatar sx={{margin: 0}}>

                                                <Avatar
                                                    sx={{width: 50, height: 50}}
                                                    alt="Remy Sharp"
                                                    src={item.User.Avatar ? (item.User.Avatar.Url || "") : ""}/>
                                            </ListItemAvatar>
                                            <Link href={"/users/singleuser/" + item?.User?.Username}
                                                  sx={{textDecoration: "none", color: "#666666"}}>
                                                <ListItemText primary={`${item?.User?.FullName || ""}`}
                                                              secondary={item.Name}
                                                />
                                            </Link>
                                            <Button variant={"contained"} sx={{margin: 0}}
                                                    onClick={(e) => acceptEnterRequest(e, item)}>تایید</Button>
                                        </ListItemButton>
                            ))}

                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    function acceptEnterRequest(e, subscribeItem) {
        purchasedSubscribe_acceptEnterRequested({
            Id: subscribeItem.Id,
            User: {Id: subscribeItem.User.Id}
        }).then(result => {
            selectSubscribe(subscribeItem);
            updatePage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Card hidden={awaitingUsers.length<1} onClick={(e)=>SetOpenModalAwaiteList(true)} sx={{borderRadius: 3,m:1}} elevation={3}>
                <CardContent className={"row"}>
                    <div className={"col-sm-12 col-md-6  text-center p-3"}>
                        <Badge badgeContent={awaitingUsers.length} color="primary">
                            <PanToolIcon  sx={{fontSize:67}} color={"action"}/>
                        </Badge>
                    </div>
                    <div className={"col-sm-12 col-md-6"}>
                        <Typography variant={"subtitle2"} textAlign={"center"}>
                            کاربران در انتظار ورود
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            {RenderModalAwaitingList()}
        </>
    );
}
