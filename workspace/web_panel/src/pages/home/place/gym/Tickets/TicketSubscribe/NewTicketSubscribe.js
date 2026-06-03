import React, {useContext, useEffect, useState} from 'react';
import {Box, Grid, List} from "@mui/material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {TicketSubscribes_getByPlace} from "../../../../../../network/api/ticketSubscribes.api";
import _PlaceSubscribeListItem from "./_PlaceSubscribeListItem";
import _SubscribeNew from "./_SubscribeNew";

const NewTicketSubscribe = ({place}) => {

    const error = useContext(ErrorContext);
    const [subscribes, setSubscribes] = useState(null)


    useEffect(() => {
        if (!!place?.Id)
            getTickets();
    }, []);

    function getTickets() {
        TicketSubscribes_getByPlace({Id: place.Id}).then(result => {
            setSubscribes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Grid container spacing={3}>
                <List sx={{minHeight: {sm: 50, md: 800},width:"100%"}} className={"nopadding"} disablePadding>
                    {place?.Id &&
                    <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                        {subscribes?.length > 0 && <Grid container columns={2} spacing={2} sx={{width: "100%"}}>
                            {subscribes?.map((item, number) => (
                                <_PlaceSubscribeListItem place={place} subscribe={item} reloadList={getTickets}/>))
                            }
                            <_SubscribeNew place={place} reloadList={getTickets} />
                        </Grid>}
                    </Box>}
                </List>
            </Grid>
        </>
    );
};

export default NewTicketSubscribe;
