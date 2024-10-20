import React from 'react';
import {
    Alert,
    Avatar,
    Button,
    Card,
    CardContent,
    Collapse,
    Divider,
    Grid,
    IconButton,
    ListItemText,
    Typography
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

const _TicketOwner = ({subscribe}) => {

    return (

        <div>
            {subscribe && <>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardContent >

                        <Grid container>
                            {/*<Grid item xs={3}>*/}
                            {/*    <Image fluid width={"100%"} src={"/assets/images/charcter_orang.png"}/>*/}
                            {/*</Grid>*/}
                            {subscribe.User &&
                            <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-around"} item xs={12}>
                                <ListItemText
                                primary={<Typography variant={"h6"} color={"black"}>{subscribe?.User?.FullName}</Typography>}
                                secondary={<Typography variant={"subtitle2"} color={"darkgray"}>{subscribe?.User?.Username}</Typography>}
                                />

                                <Avatar
                                    sx={{width: 80, height: 80}}
                                    alt="تصوبر کاربر"
                                    src={subscribe?.User?.Avatar?.Url}/>

                            </Grid>}
                        </Grid>
                    </CardContent>

                </Card>


            </>}

        </div>
    );
};

export default _TicketOwner;
