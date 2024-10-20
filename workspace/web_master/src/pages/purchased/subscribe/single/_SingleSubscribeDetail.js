import React from 'react';
import {Card, CardContent, CardHeader, Grid, TextField, Typography} from "@mui/material";
import {SubscribeStatusEnum} from "../../../../helper/enums/SubscribeStatusEnum";

const _SingleSubscribeDetail = ({subscribe}) => {

    return (
        <>
            <Card elevation={3} sx={{margin: 1,borderRadius:3}}>
                <CardContent>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"وضعیت بلیط : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{SubscribeStatusEnum[subscribe?.Status]}</Typography>
                    </Grid>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"بلیت : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{subscribe?.Name}</Typography>
                    </Grid>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"تاریخ انقضا بلیط : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{new Date(subscribe.TicketSubscribeExpireDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</Typography>
                    </Grid>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"تاریخ انقضا عضویت : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{new Date(subscribe?.ExpireDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</Typography>
                    </Grid>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"تعداد جلسات عضویت : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{subscribe?.EntryTotalCount}</Typography>
                    </Grid>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"جلسات استفاده شده : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{subscribe.EntryList.length}</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </>

    );
};

export default _SingleSubscribeDetail;
