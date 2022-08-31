import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
const data = [{
    id:458,
    item:"ورود تک جلسه",
    itemDesc:"توضیح تکمیلی بلیت",
    deletable:true,
    userGetQr:false,
    placeName:"باشگاه ورزشی امیر",
    expireDate:"8-8-2022 12:01:15",
    useCount:1,
    MaxUse:1,
    price:148000,
},{
    id:458,
    item:"ورود تک جلسه",
    itemDesc:"توضیح تکمیلی بلیت",
    deletable:true,
    userGetQr:true,
    placeName:"باشگاه ورزشی امیر",
    expireDate:"6-8-2022 12:01:15",
    useCount:1,
    MaxUse:1,
    price:148000,
},{
    id:458,
    item:"ورود تک جلسه",
    itemDesc:"توضیح تکمیلی بلیت",
    deletable:false,
    userGetQr:true,
    placeName:"باشگاه ورزشی امیر",
    expireDate:"5-8-2022 12:01:15",
    useCount:1,
    MaxUse:1,
    price:148000,
},{
    id:458,
    item:"ورود تک جلسه",
    itemDesc:"توضیح تکمیلی بلیت",
    deletable:false,
    userGetQr:true,
    placeName:"باشگاه ورزشی امیر",
    expireDate:"4-8-2022 12:01:15",
    useCount:1,
    MaxUse:1,
    price:148000,
}]
const Tickets = () => {
    return (
        <div>
            {data.map(item=>(
                <>
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
                                    <Typography variant={"h5"}>{item.item}</Typography>
                                    <Typography variant={"body2"}>{item.itemDesc}</Typography>
                                </Grid>
                                <Grid item xs={1} hidden={(!item.deletable)}>
                                    <IconButton color={"primary"}  aria-label="delete" size="small">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
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
                                    <Typography sx={{paddingY:1}} variant={"subtitle1"}>{item.placeName}</Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant={"body1"}>{item.price+" تومان برای "+item.useCount+"/"+item.MaxUse+" ورود"}</Typography>
                                </Grid>
                            </Grid>
                            <Typography sx={{paddingBottom:1}} variant={"body1"}>اعتبار بلیط تا
                                {new Date(item.expireDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>

                            <Grid
                                container
                                sx={{width:"100%"}}
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Grid item  xs={10} >
                                    <Button href={"/tickets/actionqR"} hidden={(!item.deletable)} fullWidth color={"primary"} variant={"contained"}>{(item.userGetQr)?"مشاهده بلیط":"دریافت بلیت"}</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton  hidden={(item.deletable)}  color="primary" aria-label="add an alarm">
                                        <AutorenewIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                        </CardContent>

                    </Card>
                </>
            ))}
        </div>
    );
};

export default Tickets;
