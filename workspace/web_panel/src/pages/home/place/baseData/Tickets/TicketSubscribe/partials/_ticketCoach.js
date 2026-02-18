import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Rating, Typography} from "@mui/material";
import {DriveFileRenameOutline} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {placePersonnel_ByPlace} from "../../../../../../../network/api/placePersonnel.api";
import {
    TicketSubscribes_addCoach,
    TicketSubscribes_deleteCoach,
    TicketSubscribes_getTicketSubscribeCoaches
} from "../../../../../../../network/api/ticketSubscribes.api";

const _ticketCoach = ({place,subscribe, reloadList}) => {

    const error = useContext(ErrorContext);
    const [openModalInfo, setOpenModalInfo] = useState(false)
    const [itemToProgress, SetItemToProgress] = useState(null);
    const [ticketSubscribeCoaches, SetTicketSubscribeCoaches] = useState([])
    const [placeCoaches, SetPlaceCoaches] = useState([])

    useEffect(() => {
        if (openModalInfo)
            getPlaceCoaches();
    }, [openModalInfo]);

    function getPlaceCoaches() {
        placePersonnel_ByPlace({Id: place.Id}).then(data => {
            SetPlaceCoaches(data.data.Data?.filter(pp => pp?.UserRole?.includes("PLACE_COACH")));
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
        TicketSubscribes_getTicketSubscribeCoaches({ticketId: subscribe.Id}).then(data => {
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

    function addPlaceCoach(e, item) {

        if (!!itemToProgress) return;
        SetItemToProgress(item.Id);
        TicketSubscribes_addCoach({TicketSubscribe: {Id: subscribe.Id}, PlaceCoach: {Id: item.User.Id}})
            .then(data => {
                getTicketSubscribeCoaches()
                reloadList()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function deletePlaceCoach(e, item) {

        if (!!itemToProgress) return;
        SetItemToProgress(item.Id);

        TicketSubscribes_deleteCoach({TicketSubscribe: {Id: subscribe.Id}, PlaceCoach: {Id: item.Id}})
            .then(data => {
                getTicketSubscribeCoaches()
                reloadList()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getCoachItem(loading, selected, coach) {
        const inCoach = (selected)?coach:coach.User;
        return !loading?(<>
            <Grid size={4} key={coach.Id + "coach"} sx={{
                p: 1,
                border: selected?"2px solid #458091":"1px solid #ffddff",
                borderRadius: "8px",
                textAlign: "-webkit-center"
            }}
            onClick={(e)=>selected?deletePlaceCoach(e,coach):addPlaceCoach(e,coach)}
            >
                <Avatar
                    sx={{width: "100%", maxWidth: "130px", aspectRatio: "1/1", height: "auto"}}
                    alt="Remy Sharp"
                    src={inCoach?.Avatar?.Url}/>
                <Typography sx={{mt:2}} variant={"subtitle2"}>
                    {inCoach?.FullName || "ثبت نشده"}
                </Typography>

                <Rating name="read-only" size={"small"} value={coach?.Rate || 5} readOnly/>
            </Grid>
        </>):(
            <Grid size={4} key={coach.Id + "coach"} sx={{
                p: 1,
                border: selected?"2px solid #458091":"1px solid #ffddff",
                borderRadius: "8px",
                textAlign: "-webkit-center"
            }}
            >
                <Avatar
                    sx={{width: "100%", maxWidth: "130px", aspectRatio: "1/1", height: "auto"}}
                    alt="Remy Sharp"
                    src={""}/>
                <Typography sx={{mt:2}} variant={"subtitle2"}>
                    {"لطفا صبر کنید"}
                </Typography>

            </Grid>
        )
    }

    function renderModalInfo() {
        return (<>

            <Dialog
                fullWidth
                open={openModalInfo} onClose={() => setOpenModalInfo(false)}>
                <DialogTitle>{"مربیان"}</DialogTitle>
                <DialogContent>
                    <Grid container direction={"row"} spacing={2} alignItems={"center"} justifyContent={"center"}>
                        {(placeCoaches.length < 1) && <Grid size={12}><Typography sx={{width: "100%"}} color={"#d01c1c"} variant={"subtitle2"}>
                                شما در بخش پرسنل کسی را با عنوان مربی وارد نکرده اید!
                            </Typography></Grid>}
                        {ticketSubscribeCoaches.map(coach => getCoachItem(coach.Id == itemToProgress, true, coach))}
                        {placeCoaches.filter(sp => !ticketSubscribeCoaches.map(uc => uc.Id).includes(sp.User.Id)).map(coach => getCoachItem(coach.Id == itemToProgress, false, coach))}
                        {!ticketSubscribeCoaches && <Grid sx={{p: 8}} container justifyContent={"center"} alignContent={"center"}>
                            <CircularProgress size={"3rem"}/>
                        </Grid>}
                    </Grid>
                </DialogContent>

            </Dialog>
        </>)
    }

    function getCoaches() {
        switch (subscribe?.Coaches?.length) {
            case 0 :
                return "ثبت نشده"
            case 1 :
                return subscribe?.Coaches[0].FullName||"مربی"
            default :
                return subscribe?.Coaches[0].FullName||"مربی" + " و +" + (subscribe?.Coaches.length - 1)
        }
    }

    return (
        <>
            <Chip label={<>{getCoaches() + " "}<DriveFileRenameOutline/></>} size={"small"}
                  sx={{bgcolor: "#555555", color: "#ffffff", px: 1}}
                  onClick={() => {
                      setOpenModalInfo(true)
                  }}/>
            {renderModalInfo()}
        </>
    );
};

export default _ticketCoach;
