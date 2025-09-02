import React from 'react';
import {Avatar, Card, CardContent, Grid, ListItemText, Typography} from "@mui/material";

const _TicketOwner = ({subscribe}) => {

    return (
        <>
            {subscribe && <Grid sx={{minHeight: 130}}>
                    <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                        <CardContent>

                            <Grid container>
                                {/*<Grid item xs={3}>*/}
                                {/*    <Image fluid width={"100%"} src={"/assets/images/charcter_orang.png"}/>*/}
                                {/*</Grid>*/}
                                {subscribe.User &&
                                <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-around"} item xs={12}>
                                    <Avatar
                                        sx={{width: 80, height: 80, mr: 2}}
                                        alt="تصوبر کاربر"
                                        src={subscribe?.User?.Avatar?.Url}/>
                                    <ListItemText
                                        primary={<Typography variant={"h6"}>{subscribe?.User?.FullName}</Typography>}
                                        secondary={<Typography variant={"subtitle2"}
                                                               color={"darkgray"}>{subscribe?.User?.Username}</Typography>}
                                    />


                                </Grid>}
                            </Grid>
                        </CardContent>

                    </Card>
            </Grid>}
        </>
    );
};

export default _TicketOwner;
