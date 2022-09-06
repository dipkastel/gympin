import React from 'react';
import {Card, CardContent, CardHeader, Divider, Grid, List, ListItem, Typography} from "@mui/material";

const data = [{
    Date: "8-6-2022 12:13:15",
    price: "900000"
}, {
    Date: "7-4-2022 09:57:15",
    price: "900000"
}, {
    Date: "6-5-2022 10:48:15",
    price: "700000"
}, {
    Date: "5-6-2022 11:03:15",
    price: "700000"
},]

const _userCharges = () => {
    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"تاریخچه شارژهای کاربر"}
            />
            <CardContent>
                <List>
                    {data.map(item => (
                        <ListItem>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant={"subtitle1"}>افزایش : {item.price}</Typography>

                                <Typography variant={"overline"}>{new Date(item.Date).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</Typography>
                            </Grid>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="div"/>

                        </ListItem>))}
                </List>
            </CardContent>
        </Card>
    );
};

export default _userCharges;
