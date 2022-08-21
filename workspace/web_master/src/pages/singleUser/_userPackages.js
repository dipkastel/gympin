import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";

const data = [{
    type:"12 جلسه",
    status:"فعال",
    payDate:"8-8-2022 12:27:15",
    price:"700000",
    planId:1543
},{
    type:"تک جلسه",
    status:"منقضی",
    payDate:"8-1-2022 12:27:15",
    price:"110000",
    planId:1544
},{
    type:"تک جلسه",
    status:"منقضی",
    payDate:"7-27-2022 12:27:15",
    price:"100000",
    planId:1545
},{
    type:"تک جلسه",
    status:"منقضی",
    payDate:"7-8-2022 12:27:15",
    price:"100000",
    planId:1546
},]

const _userPackages = () => {
    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"خرید های کاربر از این مرکز"}
            />
            <CardContent>

                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {data.map(item=>(
                        <>
                            <Link href={(item.status!="فعال")?"#":"/users/userPlan?id="+item.planId} sx={{textDecoration: "none", color: "#666666"}}>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>

                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                        >
                                        <Typography variant={"subtitle1"} > {item.type}</Typography>-
                                        <Typography variant={"subtitle1"} color={(item.status!="فعال")?"primary":"green"}>{item.status}</Typography>
                                        </Grid>
                                        <Typography variant={"body2"}>پرداختی : {item.price}</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={"body2"}>{new Date(item.payDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}</Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </>
                    ))}

                </List>
            </CardContent>
        </Card>
    );
};

export default _userPackages;
