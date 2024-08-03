import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {TicketSubscribes_getByPlace} from "../../../network/api/ticketSubscribe.api";
import {Collapse, Grid, Typography} from "@mui/material";
import {ExpandLessTwoTone} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import _PlaceSubscribeListItem from "./_PlaceSubscribeListItem";

const _placeSubscribes = ({place}) => {

        const error = useContext(ErrorContext);
        const navigate = useNavigate()
        const currentUser = useSelector(state => state.auth.user)
        const [subscribes, setSubscribes] = useState([])
        const [isExpanded, setIsExpanded] = useState(true)
        useEffect(() => {
            TicketSubscribes_getByPlace({Id: place.Id}).then(result => {
                setSubscribes(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }, []);


        return (
            <div>
                {subscribes.length > 0 && <>
                    <Grid container onClick={(e) => setIsExpanded(!isExpanded)} direction={"row"} alignItems={"center"}
                          justifyContent={"space-between"} bgcolor={"#c7c7c7"}
                          sx={{width: "100%", p: 1, borderBottom: "#e7333e solid 2px", mt: 1}}>

                        <Typography variant={"subtitle1"} color={"white"}>عضویت ها</Typography>
                        {isExpanded ? <ExpandLessTwoTone/> : <ExpandMoreIcon/>}
                    </Grid>
                    <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
                        {subscribes?.filter(t => t.Enable).map((item, number) => (
                            <_PlaceSubscribeListItem key={"ac" + number} subscribe={item} number={number}/>))}
                        {subscribes?.filter(t => !t.Enable).map((item, number) => (
                            <_PlaceSubscribeListItem key={"de" + number} subscribe={item} number={number}/>))}
                    </Collapse></>}
            </div>
        );
    }
;

export default _placeSubscribes;
