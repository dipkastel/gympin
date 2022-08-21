import React from 'react';
import {Button, Card, CardContent, CardHeader, Divider, Grid, List, Typography} from "@mui/material";

const data = [{
    in: "8-8-2022 12:27:15",
    out: "",
    planId: 155,
    notes:["کمد شماره 24"],
}, {
    in: "8-5-2022 12:27:15",
    out: "8-5-2022 11:00:15",
    planId: 156,
    notes:["کمد شماره 16"],
}, {
    in: "8-3-2022 12:14:15",
    out: "8-3-2022 11:25:15",
    planId: 157,
    notes:["کمد شماره 13"],
}, {
    in: "8-1-2022 12:00:15",
    out: "8-1-2022 12:57:15",
    planId: 158,
    notes:["کمد شماره 30"],
},]
const _UserPlanEnterList = () => {
    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"استفاده های کاربر"}
            />
            <CardContent>

                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {data.map(item => (
                        <>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{padding:1}}
                            >
                                <Grid item>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Typography variant={"body2"}> ورود</Typography>←
                                        <Typography variant={"caption"}>{new Date(item.in).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}</Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        hidden={!item.out}
                                    >

                                        <Typography variant={"body2"}>خروج</Typography> ←
                                        <Typography
                                            variant={"caption"}>{item.out ? new Date(item.out).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        }) : ""}</Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        {item.notes.map(note=>(
                                            <Typography variant={"caption"}>{note}</Typography>
                                        ))}
                                    </Grid>
                                </Grid>

                                <Grid
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    {!item.out &&
                                    <Button sx={{float: "left"}} size="small" variant={"outlined"}>ثبت خروج</Button>}
                                    <br/>
                                    <Button sx={{float: "left",marginTop:1}} size="small" variant={"outlined"}>ثبت یادداشت</Button>
                                </Grid>
                            </Grid>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </>
                    ))}

                </List>
            </CardContent>
        </Card>
    );
};

export default _UserPlanEnterList;
