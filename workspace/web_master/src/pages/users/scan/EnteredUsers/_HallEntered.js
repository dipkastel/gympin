import React, {useContext, useEffect, useState} from "react";
import {
    AppBar,
    Avatar, Badge,
    Button,
    Card, CardContent, Dialog, DialogContent, DialogTitle,
    Divider, Grid,
    Link,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Typography
} from "@mui/material";
import {purchasedSubscribe_getUserEntered} from "../../../../network/api/subscribe.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';

export default function _HallEntered({selectSubscribe,updatePage}) {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [users, SetUsers] = useState([]);
    const [openModalEnteredList, SetOpenModalEnteredList] = useState(false)

    useEffect(() => {
        getEnterdUser();
    }, []);

    function getEnterdUser() {
        purchasedSubscribe_getUserEntered({placeId: place.Id}).then(result => {
            SetUsers(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function selectUser(e, subscribeItem) {
        selectSubscribe(subscribeItem);
        updatePage();
    }

    function RenderModalEnteredList() {
        return (
            <div>
                <Dialog fullWidth open={openModalEnteredList} onClose={() => SetOpenModalEnteredList(false)}>
                    <DialogTitle>لیست کاربران حاضر در مجموعه</DialogTitle>
                    <DialogContent sx={{p:1}}>
                        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                            {users.map((item, Index) => (
                                <div key={Index}>
                                    {console.log(item)}
                                    <ListItemButton sx={{direction: "rtl", textAlign: "right", justifyContent: "space-between"}}>
                                        <ListItemAvatar sx={{margin: 0}}>
                                            <Avatar
                                                sx={{width: 50, height: 50}}
                                                alt="Remy Sharp"
                                                src={item?.User?.Avatar?.Url}/>
                                        </ListItemAvatar>
                                        <Link href={"/users/singleuser?id=" + item.User.Id}
                                              sx={{textDecoration: "none", color: "#666666"}}>
                                            <ListItemText primary={`${item.User.FullName || ""} (${item.User.Username})`}/>
                                            <ListItemText secondary={item.Name || ""}/>
                                            <ListItemText
                                                secondary={`ورود : ${new Date(item?.EntryList[item?.EntryList?.length-1]?.EnterDate).toLocaleDateString('fa-IR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}`}/>
                                        </Link>
                                        <Button variant={"contained"} sx={{margin: 0}}
                                                onClick={(e) => selectUser(e,item)}>انتخاب</Button>
                                    </ListItemButton>
                                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                                </div>

                            ))}

                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }


    return (
        <>
            <Card hidden={users.length<1} onClick={(e)=>SetOpenModalEnteredList(true)} sx={{m:1}} elevation={3}>
                <CardContent className={"row"}>
                    <div className={"col-sm-12 col-md-6 text-center p-3"}>
                        <Badge badgeContent={users.length} color="primary">
                            <SettingsAccessibilityIcon  sx={{fontSize:67}} color={"action"}/>
                        </Badge>
                    </div>
                    <div className={"col-sm-12 col-md-6"}>
                        <Typography variant={"subtitle2"} textAlign={"center"}>
                            کاربران حاضر در مجموعه
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            {RenderModalEnteredList()}
        </>
    );

}
