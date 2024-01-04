import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";

const _ReserveDetail = (props) => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardContent>
                <Grid
                    container
                    sx={{width:"100%"}}
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Grid item  xs={10}>
                        <Typography variant={"h5"}>{props.data.item}</Typography>
                        <Typography variant={"body2"}>{props.data.itemDesc}</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{width:"100%"}}
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Grid>
                        <Typography sx={{paddingY:1}} variant={"subtitle1"}>{props.data.placeName}</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant={"body1"}>{props.data.price+" تومان برای "+props.data.useCount+"/"+props.data.MaxUse+" ورود"}</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>تاریخ پیش خرید :
                    {new Date(props.data.reserveDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </Typography>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>تاریخ خرید :
                    {new Date(props.data.peyDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </Typography>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>اعتبار عضویت :
                    {new Date(props.data.expireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default _ReserveDetail;
