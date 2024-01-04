import React, {useContext, useEffect, useState} from 'react';
import {Box, Chip, Collapse, Grid, IconButton, Typography} from "@mui/material";
import {AddCircle, CheckBox, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";
import {placeSport_getSportsByPlace} from "../../../../../../../network/api/placeSport.api";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {TicketSubscribes_addSport, TicketSubscribes_deleteSport, TicketSubscribes_getTicketSubscribesSports} from "../../../../../../../network/api/ticketSubscribes.api";

const __wizardTicketSubscribesSports = ({ticketSubscribe,setCanGoNext}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [sportsComplete,setSportsComplete] = useState(false)
    const [openCollapsableSports,setOpenCollapsableSports] = useState(false)
    const [placeSports,setPlaceSports] = useState([])
    const [ticketSubscribeSports,setTicketSubscribeSports] = useState([])



    useEffect(() => {
        if(openCollapsableSports)
            getPlaceSports()
    }, [openCollapsableSports]);




    function getTicketSubscribeSports() {
        TicketSubscribes_getTicketSubscribesSports({ticketSubscribeId: ticketSubscribe.Id}).then(data => {
            setTicketSubscribeSports(data.data.Data);

            setSportsComplete(data.data.Data.length>0);
            setCanGoNext(data.data.Data.length>0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getPlaceSports() {
        placeSport_getSportsByPlace({Id: placeId})
            .then((data) => {
                setPlaceSports(data.data.Data)
                getTicketSubscribeSports();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function ToggleSport(e, placeSport, ticketSubscribeSports) {
        if(!ticketSubscribeSports){

            TicketSubscribes_addSport({TicketSubscribe: {Id: ticketSubscribe.Id}, PlaceSport: Array.of({Id:placeSport.Id})})
                .then(data => {
                    getPlaceSports()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }else{
            TicketSubscribes_deleteSport({TicketSubscribe:{Id: ticketSubscribe.Id},PlaceSport:[{Id:ticketSubscribeSports.Id}]})
                .then(data => {
                    getPlaceSports()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
    }

    return (
        <>

            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}
            >
                <Grid item onClick={() => setOpenCollapsableSports(!openCollapsableSports)} >
                    <Typography variant={"subtitle1"}>ورزش ها</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                        {!sportsComplete?<QuestionMark color={"warning"} />:<CheckBox color="success"/>}
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                        {!openCollapsableSports ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Grid>
            </Grid>

            <Collapse in={openCollapsableSports} timeout="auto" unmountOnExit>

                <Box>
                    {placeSports.map((placeSport =>
                            <Chip key={"sport" + placeSport.Id} label={placeSport.sport.Name} sx={{margin: 1}}
                                  color={ticketSubscribeSports.map(ps=>ps.sport.Id).includes(placeSport.sport.Id)?"success":"default" }
                                  onClick={(e)=>ToggleSport(e,placeSport,ticketSubscribeSports.find(p=>p.sport.Id==placeSport.sport.Id))}
                            />
                    ))}
                </Box>

            </Collapse>
        </>
    );
};

export default __wizardTicketSubscribesSports;
