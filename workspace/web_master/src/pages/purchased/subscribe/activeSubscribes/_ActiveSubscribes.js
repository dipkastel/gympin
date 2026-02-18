import React, {useContext, useEffect, useState} from "react";
import {
    Alert,
    Avatar, Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Grid, IconButton,
    LinearProgress,
    Link,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {purchasedSubscribe_query} from "../../../../network/api/subscribe.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {SubscribeStatusEnum} from "../../../../helper/enums/SubscribeStatusEnum";
import {Image} from "react-bootstrap";
import {Refresh, TryRounded} from "@mui/icons-material";
import _WaitingUserListItem from "./_WaitingUserListItem";
import {getUserCanSetEnter} from "../../../../helper/serverSettingsHelper";

export default function _ActiveSubscribes() {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [secondsLeft, setSecondsLeft] = useState(100);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [PlaceSubscribes, setPlaceSubscribes] = useState([])
    const serverSettings = useSelector((settings) => settings);
    const canEnterUser = getUserCanSetEnter(serverSettings)

    useEffect(() => {
        getActiveSubscribes();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    getActiveSubscribes();
                    return 100;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function getActiveSubscribes() {
        purchasedSubscribe_query({
            queryType: "FILTER",
            placeId: place.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then(result => {
            setPlaceSubscribes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    const getColor = (status) => {
        switch (status) {
            case "PAYMENT_WAIT" :
                return "error";
            case "READY_TO_ACTIVE" :
                return "warning";
            case "PROCESSING" :
                return "warning";
            case "ACTIVE":
                return "success";
            case "EXPIRE":
                return "error";
            case "COMPLETE":
                return "secondary";
            case "REFUNDED":
                return "warning";
            case "CANCEL":
                return "primary";
            default:
                return "primary";
        }

    }
    return (
        <>
            <Card variant={"outlined"}>
                <CardHeader
                    title={"لیست آخرین ورودها"}
                    action={<IconButton onClick={(e)=>setSecondsLeft(1)} ><Refresh /></IconButton>}
                />
                <LinearProgress variant={"determinate"} color={"success"} value={secondsLeft}/>
                {PlaceSubscribes?.content?.length > 0 ?
                    <>
                        {!!canEnterUser&&PlaceSubscribes?.content?.filter(ps => ps.Status == "READY_TO_ACTIVE").map(ps=>(
                            <_WaitingUserListItem purchasedItem={ps} renewList={getActiveSubscribes} />
                        ))}
                        {!canEnterUser&&PlaceSubscribes?.content?.filter(ps => ps.Status == "READY_TO_ACTIVE").length > 0 &&
                        PlaceSubscribes?.content?.filter(ps => ps.Status == "READY_TO_ACTIVE").map(ps=>(
                            <Alert severity="success" sx={{px: 1,m:1}}>
                                <Typography variant={"body1"}
                                            sx={{px: 1}}>{"احتمال ورود " + PlaceSubscribes?.content?.filter(ps => ps.Status == "READY_TO_ACTIVE").length + " کاربر تا 72 ساعت آینده"}</Typography>
                            </Alert>
                        ))}
                        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                            {PlaceSubscribes?.content?.filter(ps => ps.Status === "ACTIVE").map((item, Index) => (
                                <div key={Index}>
                                    <ListItemButton sx={{textAlign: "start", justifyContent: "space-between"}}>
                                        <ListItemAvatar sx={{margin: 0}}>
                                            <Avatar
                                                sx={{width: 50, height: 50}}
                                                alt="Remy Sharp"
                                                src={item?.User?.Avatar?.Url}/>
                                        </ListItemAvatar>
                                        <Link
                                            // href={"/users/SingleSubscribe/" + item?.Key}
                                              sx={{textDecoration: "none", color: "#666666", width: "100%"}}>
                                            <ListItemText primary={`${item?.User?.FullName || ""} (${item?.User?.Username})`}/>
                                            <ListItemText secondary={`${item?.Name || ""}`}/>
                                        </Link>
                                        <Chip  variant={"outlined"} color={getColor(item.Status)}
                                              label={SubscribeStatusEnum[item?.Status]}/>
                                    </ListItemButton>
                                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                                </div>))}
                            {PlaceSubscribes?.content?.filter(ps => ps.Status === "COMPLETE").map((item, Index) => (
                                <div key={Index}>
                                    <ListItemButton sx={{textAlign: "start", justifyContent: "space-between"}}>
                                        <ListItemAvatar sx={{margin: 0}}>
                                            <Avatar
                                                sx={{width: 50, height: 50}}
                                                alt="Remy Sharp"
                                                src={item?.User?.Avatar?.Url}/>
                                        </ListItemAvatar>
                                        <Link
                                            // href={"/users/SingleSubscribe/" + item?.Key}
                                              sx={{textDecoration: "none", color: "#666666", width: "100%"}}>
                                            <ListItemText primary={`${item?.User?.FullName || ""} (${item?.User?.Username})`}/>
                                            <ListItemText secondary={`${item?.Name || ""}`}/>
                                        </Link>
                                        <Chip  variant={"outlined"} color={getColor(item.Status)}
                                              label={SubscribeStatusEnum[item?.Status]}/>
                                    </ListItemButton>
                                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                                </div>))}
                            {PlaceSubscribes?.content?.filter(ps => ps.Status === "EXPIRE").map((item, Index) => (
                                <div key={Index}>
                                    <ListItemButton sx={{textAlign: "start", justifyContent: "space-between"}}>
                                        <ListItemAvatar sx={{margin: 0}}>
                                            <Avatar
                                                sx={{width: 50, height: 50}}
                                                alt="Remy Sharp"
                                                src={item?.User?.Avatar?.Url}/>
                                        </ListItemAvatar>
                                        <Link
                                            // href={"/users/SingleSubscribe/" + item?.Key}
                                              sx={{textDecoration: "none", color: "#666666", width: "100%"}}>
                                            <ListItemText primary={`${item?.User?.FullName || ""} (${item?.User?.Username})`}/>
                                            <ListItemText secondary={`${item?.Name || ""}`}/>
                                        </Link>
                                        <Chip  variant={"outlined"} color={getColor(item.Status)}
                                              label={SubscribeStatusEnum[item?.Status]}/>
                                    </ListItemButton>
                                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                                </div>))}
                        </List>
                    </> : <>
                        <Grid
                            container
                            sx={{width: "100%"}}
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
                            <Typography variant={"body"} sx={{m: 2}}>
                                بلیت یافت نشد
                            </Typography>
                        </Grid>
                    </>}
            </Card>
        </>

    );
}
