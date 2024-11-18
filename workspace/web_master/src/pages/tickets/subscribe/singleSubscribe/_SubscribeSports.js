import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip} from "@mui/material";
import {
    TicketSubscribes_addSport, TicketSubscribes_deleteSport,
    TicketSubscribes_getTicketSubscribesSports
} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {placeSport_getSportsByPlace} from "../../../../network/api/placeSport.api";
import {useSelector} from "react-redux";

const _SubscribeSport = ({ticketSubscribe}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)

    const [itemToProgress,SetItemToProgress] = useState(null);
    const [ticketSubscribeSports, SetTicketSubscribeSports] = useState([])
    const [sportsPlace, SetSportsPlace] = useState([])

    useEffect(() => {
        if(ticketSubscribe.Id)
            getPlaceSports();
    }, [ticketSubscribe]);

    function getPlaceSports() {
        placeSport_getSportsByPlace({Id: place.Id}).then(data => {
            SetSportsPlace(data.data.Data);
            getTicketSubscribeSports();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getTicketSubscribeSports() {
        TicketSubscribes_getTicketSubscribesSports({ticketSubscribeId: ticketSubscribe.Id}).then(data => {
            SetTicketSubscribeSports(data.data.Data);
            SetItemToProgress(null);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addPlaceSport(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);
        TicketSubscribes_addSport({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceSport: [{Id:item.Id}]})
            .then(data => {
                getTicketSubscribeSports()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function deletePlaceSport(e,item){

        if(!!itemToProgress)return;
        SetItemToProgress(item.Id);

        TicketSubscribes_deleteSport({TicketSubscribe:{Id: ticketSubscribe.Id},PlaceSport:[{Id:item.Id}]})
            .then(data => {
                getTicketSubscribeSports()
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
                    title={"ورزش های این بلیط"}
                />
                <CardContent>

                    <div className={"container"}>
                        <div className={"row"}>
                            {ticketSubscribeSports.map(sport=>sport.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={sport.sport.Name}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>deletePlaceSport(e,sport)} />
                            ))}
                            {sportsPlace.filter(sp=>!ticketSubscribeSports.map(tss=>tss.Id).includes(sp.Id)).map(sport=>sport.Id==itemToProgress?(
                                <Chip label={"لطفا صبر کنید"}  key={"placeOption"+sport.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                            ):(
                                <Chip label={sport.sport.Name} key={"option"+sport.Id} sx={{m:1,width:"inherit"}} onClick={(e)=>{addPlaceSport(e,sport)}} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default _SubscribeSport;
