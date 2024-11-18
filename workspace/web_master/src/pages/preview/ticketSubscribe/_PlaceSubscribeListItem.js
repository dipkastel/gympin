import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, ListItem, ListItemButton, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {genders} from "../../../helper/enums/genders";
import _ticketCoach from "../info/_ticketCoach";
import _ticketInfo from "../partial/_ticketInfo";
import _ticketSubscribeActiveTimes from "./_ticketSubscribeActiveTimes";



const _PlaceSubscribeListItem = ({subscribe, number, addToSubscribe}) => {
    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton disabled={!subscribe.Enable}>
                    <Card sx={{borderRadius: 3,width: "100%"}} elevation={6}>
                        <CardHeader
                            component={"a"}
                            sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                            title={subscribe.Name}
                            subheader={<><Typography component={"span"} variant={"body2"}>
                                انقضا :
                            </Typography><Typography component={"span"} variant={"body1"}>
                                {"از خرید نهایی تا " + subscribe.ExpireDuration + " روز"}
                            </Typography></>}
                            action={
                                <>
                                    {subscribe?.Coaches?.length>0 && <_ticketCoach ticket={subscribe}/>}
                                    {subscribe.Description && <_ticketInfo ticket={subscribe}/>}
                                    {subscribe && <_ticketSubscribeActiveTimes subscribe={subscribe}/>}


                                </>
                            }
                        />
                        <CardContent sx={{direction: "rtl", pt: 0}}>

                            <Grid sx={{mb: 1}} container justifyContent={"space-between"} direction={"row"}
                                  alignItems={"center"}>
                                <Grid item>

                                    <Grid container justifyContent={"center"} direction={"column"} alignItems={"start"}>
                                        <Grid item sx={{m: 0, p: 0}}>
                                            <Typography component={"span"}
                                                        color={"darkgreen"}
                                                        variant={"h5"}>{subscribe.EntryTotalCount}</Typography>
                                            <Typography component={"span"} variant={"body1"}>{" جلسه"}</Typography>
                                        </Grid>
                                        <Grid item sx={{mt: "-8px", p: 0}}>
                                            <Typography component={"span"}
                                                        variant={"body1"}>{genders[subscribe.Gender]}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item>
                                    <Grid container justifyContent={"center"} direction={"column"} alignItems={"end"}>
                                        <Grid item sx={{m: 0, p: 0}}>
                                            <Typography component={"span"}
                                                        color={"darkgreen"}
                                                        variant={"h5"}>{toPriceWithComma(subscribe.Price)}</Typography>
                                            <Typography component={"span"} variant={"body1"}>{" تومان"}</Typography>
                                        </Grid>
                                        <Grid item sx={{mt: "-8px", p: 0}}>
                                            {(subscribe.Price < subscribe.ValuePrice) && <>
                                                <Typography component={"span"}
                                                            sx={{textAlign: "start", textDecoration: "line-through"}}
                                                            color={"lightgray"}
                                                            variant={"h6"}> {toPriceWithComma(subscribe.ValuePrice)}</Typography>
                                                <Typography component={"span"} color={"lightgray"}
                                                            variant={"body1"}> {" تومان"} </Typography>
                                            </>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button variant={"contained"} color={"primary"} onClick={() => addToSubscribe(subscribe)}
                                    sx={{textAlign: "center"}} fullWidth>
                                <Typography variant={"h6"}>{" افزودن به سبد خرید"}</Typography>
                            </Button>
                        </CardContent>

                    </Card>
                </ListItemButton>
            </ListItem>

        </div>
    );
};

export default _PlaceSubscribeListItem;
