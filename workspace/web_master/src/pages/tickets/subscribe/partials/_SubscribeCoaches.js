import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip, Typography} from "@mui/material";
import {
    TicketSubscribes_addCoach,
    TicketSubscribes_deleteCoach,
    TicketSubscribes_getCoaches
} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {placePersonnel_ByPlace} from "../../../../network/api/placePersonnel.api";

const _SubscribeCoaches = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    const [itemToProgress,SetItemToProgress] = useState(null);
    const [ticketSubscribeCoaches, SetTicketSubscribeCoaches] = useState([])
    const [placeCoaches, SetPlaceCoaches] = useState([])

    useEffect(() => {
        if(ticketSubscribe.Id)
            getPlaceCoaches();
    }, [ticketSubscribe]);

    function getPlaceCoaches() {
        placePersonnel_ByPlace({Id: place.Id}).then(data => {
             SetPlaceCoaches(data.data.Data?.filter(pp=>pp?.UserRole?.includes("PLACE_COACH")));
            getTicketSubscribeCoaches();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getTicketSubscribeCoaches() {
        TicketSubscribes_getCoaches({ticketId: ticketSubscribe.Id}).then(data => {
            SetTicketSubscribeCoaches(data.data.Data);
            SetItemToProgress(null);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addPlaceCoach(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);
        TicketSubscribes_addCoach({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceCoach: {Id:item.User.Id}})
            .then(data => {
                getTicketSubscribeCoaches()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function deletePlaceCoach(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);

        TicketSubscribes_deleteCoach({TicketSubscribe:{Id: ticketSubscribe.Id},PlaceCoach:{Id:item.Id}})
            .then(data => {
                getTicketSubscribeCoaches()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    return (
        <>
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    title={"مربیان این بلیط"}
                />
                <CardContent>

                    <div className={"container"}>
                        <div className={"row"}>
                            {(placeCoaches.length<1)&&
                            <Typography  sx={{width:"100%"}}  color={"#d01c1c"} variant={"subtitle2"}>
                               شما در بخش پرسنل کسی را با عنوان مربی وارد نکرده اید!
                            </Typography>}
                            {ticketSubscribeCoaches.map(coach=>coach.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+coach.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={coach.FullName||coach.Username||"ثبت نشده"}  key={"placeOption"+coach.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>deletePlaceCoach(e,coach)} />
                            ))}
                            {placeCoaches.filter(sp=>!ticketSubscribeCoaches.map(uc=>uc.Id).includes(sp.User.Id)).map(coach=>coach.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+coach.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={coach.User.FullName||coach.User.Username||"ثبت نشده"} key={"option"+coach.Id} sx={{m:1,width:"inherit"}} onClick={(e)=>{addPlaceCoach(e,coach)}} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default _SubscribeCoaches;
