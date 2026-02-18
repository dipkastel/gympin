import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Box, Card, List, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import _PlaceSubscribeListItem from "./_PlaceSubscribeListItem";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {TicketSubscribes_getByPlace} from "../../../network/api/ticketSubscribe.api";
import _SubscribeNew from "./_SubscribeNew";

const SubscribesList = () => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place?.place)
    const [subscribes, setSubscribes] = useState(null)

    useEffect(() => {
        if (!!place?.Id)
            getTickets()
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
            <Grid sx={{mx: 2, mt: 2}}>
                <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                    <Grid container direction={"row"}>
                        <DashboardIcon/>
                        <Typography sx={{px: 1}}>{"بلیط‌های من"}</Typography>
                    </Grid>
                </Card>
            </Grid>
            <Box sx={{p: 2}}>
                <Grid container spacing={3}>
                    <List sx={{minHeight: {sm: 50, md: 800},width:"100%"}} className={"nopadding"} disablePadding>
                        {place?.Id &&
                        <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                            {subscribes?.length > 0 && <Grid container columns={2} spacing={2} sx={{width: "100%"}}>
                                {subscribes?.map((item, number) => (
                                    <_PlaceSubscribeListItem subscribe={item} reloadList={getTickets}/>))
                                }
                                <_SubscribeNew place={place} reloadList={getTickets} />
                            </Grid>}
                        </Box>}
                    </List>
                </Grid>
            </Box>
        </>
    );
};

export default SubscribesList;
