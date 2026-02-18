import React, {useContext, useEffect, useState} from 'react';
import {Chip, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {DriveFileRenameOutline} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {placeSport_getSportsByPlace} from "../../../../../../../network/api/placeSport.api";
import {
    TicketSubscribes_addSport,
    TicketSubscribes_deleteSport,
    TicketSubscribes_getTicketSubscribesSports
} from "../../../../../../../network/api/ticketSubscribes.api";

const _SubscribeSport = ({place,ticketSubscribe}) => {
    const error = useContext(ErrorContext);

    const [itemToProgress, SetItemToProgress] = useState(null);
    const [ticketSubscribeSports, SetTicketSubscribeSports] = useState([])
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [sportsPlace, SetSportsPlace] = useState([])

    useEffect(() => {
        if (ticketSubscribe.Id)
            getTicketSubscribeSports();
    }, [ticketSubscribe]);
    useEffect(() => {
        if (openModalEdit)
            getPlaceSports();
    }, [openModalEdit]);

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
            console.log(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addPlaceSport(e, item) {

        if (!!itemToProgress) return;
        SetItemToProgress(item.Id);
        TicketSubscribes_addSport({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceSport: [{Id: item.Id}]})
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

    function deletePlaceSport(e, item) {

        if (!!itemToProgress) return;
        SetItemToProgress(item.Id);

        TicketSubscribes_deleteSport({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceSport: [{Id: item.Id}]})
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

    function renderModalEdit() {
        return (<>
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModalEdit} onClose={() => setOpenModalEdit(false)}>
                <DialogTitle>ویرایش ورزش‌های بلیط</DialogTitle>
                <DialogContent>
                    <Typography>{"ورزش یا ورزش هایی که کاربر با خرید بلیط " + ticketSubscribe.Name + " انجام خواهد داد را انتخاب کنید"}</Typography>
                    <div className={"row"}>
                        {ticketSubscribeSports.map(sport => sport.Id == itemToProgress ? (
                            <Chip label={"لطفا صبر کنید"} key={"placeOption" + sport.Id} sx={{m: 1, width: "inherit"}} color={"warning"}/>
                        ) : (
                            <Chip label={sport.sport.Name} key={"placeOption" + sport.Id} sx={{m: 1, width: "inherit"}} color={"success"}
                                  onClick={(e) => deletePlaceSport(e, sport)}/>
                        ))}
                        {sportsPlace.filter(sp => !ticketSubscribeSports.map(tss => tss.Id).includes(sp.Id)).map(sport => sport.Id == itemToProgress ? (
                            <Chip label={"لطفا صبر کنید"} key={"placeOption" + sport.Id} sx={{m: 1, width: "inherit"}} color={"warning"}/>
                        ) : (
                            <Chip label={sport.sport.Name} key={"option" + sport.Id} sx={{m: 1, width: "inherit"}} onClick={(e) => {
                                addPlaceSport(e, sport)
                            }}/>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>)
    }

    function getSport() {
        switch (ticketSubscribeSports?.length) {
            case 0 :
                return "ثبت نشده"
            case 1 :
                return ticketSubscribeSports[0].sport.Name
            default :
                return ticketSubscribeSports[0].sport.Name + " و +" + (ticketSubscribeSports.length - 1)
        }
    }

    return (
        <> <Chip label={<>{getSport()+" "}<DriveFileRenameOutline/></>} size={"small"} sx={{bgcolor: "#555555", color: "#ffffff", px: 1}}
                 onClick={() => {
                     setOpenModalEdit(true)
                 }}/>
            {renderModalEdit()}
        </>
    );
}

export default _SubscribeSport;
