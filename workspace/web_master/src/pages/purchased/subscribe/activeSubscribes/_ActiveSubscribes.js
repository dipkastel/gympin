import React, {useContext, useEffect, useState} from "react";
import {
    Alert,
    Avatar,
    Chip,
    Divider,
    Grid,
    Link,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {purchasedSubscribe_getPlaceSubscribes} from "../../../../network/api/subscribe.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {SubscribeStatusEnum} from "../../../../helper/enums/SubscribeStatusEnum";
import {Image} from "react-bootstrap";

export default function _ActiveSubscribes() {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [PlaceSubscribes, setPlaceSubscribes] = useState([])
    useEffect(() => {
        getActiveSubscribes();
    }, []);

    function getActiveSubscribes() {
        purchasedSubscribe_getPlaceSubscribes({placeId: place.Id}).then(result => {
            console.log(result.data.Data);
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
    return (PlaceSubscribes.length>0)?(
        <>

            {PlaceSubscribes.filter(ps=>ps.Status=="READY_TO_ACTIVE").length>0&&<Alert severity="success" sx={{px: 1}}>
                <Typography variant={"body1"} sx={{px: 1}}>{"احتمال ورود "+PlaceSubscribes.filter(ps=>ps.Status=="READY_TO_ACTIVE").length+ " کاربر تا 72 ساعت آینده"}</Typography>
            </Alert>}
            <List sx={{width: '100%', direction: "rtl", bgcolor: 'background.paper'}}>
                {PlaceSubscribes.filter(ps=>ps.Status!=="READY_TO_ACTIVE").map((item, Index) => (
                    <div key={Index}>


                        <ListItemButton sx={{direction: "rtl", textAlign: "right", justifyContent: "space-between"}}>
                            <ListItemAvatar sx={{margin: 0}}>
                                <Avatar
                                    sx={{width: 50, height: 50}}
                                    alt="Remy Sharp"
                                    src={item?.User?.Avatar?.Url}/>
                            </ListItemAvatar>
                            <Link href={"/users/singleuser/" + item?.User?.Username}
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
        </>

    ):(<>
        <Grid
            container
            sx={{width:"100%",height:"80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={"https://api.gympin.ir/resource/image?Id=100"}  width={"40%"}/>
            <Typography variant={"body"} sx={{m:2}} >
                بلیت یافت نشد
            </Typography>

        </Grid>
    </>);
}
