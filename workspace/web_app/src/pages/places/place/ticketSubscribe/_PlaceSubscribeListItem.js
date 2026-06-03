import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid2 as Grid,
    Typography
} from "@mui/material";
import {getStringOfTime, toPriceWithComma} from "../../../../helper/utils";
import _ticketInfo from "../partial/_ticketInfo";
import _ticketSubscribeActiveTimes from "./_ticketSubscribeActiveTimes";
import _ticketCoach from "../info/_ticketCoach";
import {
    ChildCare,
    Face2Outlined,
    Face3Outlined,
    Face6Outlined,
    GroupOutlined,
    HistoryToggleOffOutlined,
    HourglassTopOutlined,
    MedicalInformationOutlined,
    PaymentsOutlined,
    SentimentSatisfiedAltOutlined,
    SupervisedUserCircleOutlined,
    SupervisorAccountOutlined
} from "@mui/icons-material";
import _UserCanBuyThisTicket from "./_UserCanBuyThisTicket";
import {useSelector} from "react-redux";
import {getBuyForOtherSupport, getIncredibleTime} from "../../../../helper/serverSettingsHelper";
import _TicketUpdateCheck from "./_TicketUpdateCheck";


const _PlaceSubscribeListItem = ({subscribe, number, addToSubscribe, login}) => {


    const serverSettings = useSelector(settings => settings);
    const [buyForOtherSupport] = useState(getBuyForOtherSupport(serverSettings));
    const currentUser = useSelector(state => state.auth.user)
    const [ticketToBuy, setTicketToBuy] = useState(null);
    const [timerText, setTimerText] = useState(null);


    useEffect(() => {
        if (subscribe?.Incredible) {

            let changeTimer = setInterval(function () {
                let incredibleExpire = new Date(subscribe?.Incredible);
                incredibleExpire.setHours(incredibleExpire.getHours() + getIncredibleTime(serverSettings));
                let distance = incredibleExpire.getTime() - new Date().getTime();
                if (distance < 0) {
                    clearInterval(changeTimer);
                } else {
                    var hours = Math.floor((distance) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setTimerText(getStringOfTime(seconds) + " : " + getStringOfTime(minutes) + " : " + getStringOfTime(hours));
                }
            }, 1000)

            return () => {
                clearInterval(changeTimer);
            };
        }
    }, [subscribe]);


    function addToCard(subscribe) {
        if (buyForOtherSupport && currentUser.Gender != subscribe.Gender)
            setTicketToBuy(subscribe);
        else
            addToSubscribe(subscribe);
    }


    function renderModal() {

        return (<Dialog
            className={"w-100"}
            open={!!ticketToBuy} onClose={() => setTicketToBuy(null)}>
            <DialogContent className={"w-100"}>
                <Typography sx={{paddingBottom: 1}} variant={"body1"}>
                    {"خرید بلیط برای شخص دیگر، توسط " + buyForOtherSupport + " پشتیبانی نمی‌شود."}
                </Typography>
                <Typography sx={{paddingBottom: 1}} variant={"body1"}>
                    {"شما می‌توانید این بلیط را با شارژ کیف پول شخصی تهیه نمایید."}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"error"} onClick={() => {
                    addToSubscribe(ticketToBuy);
                    setTicketToBuy(null);
                }}> افزودن به سبد خرید </Button>
            </DialogActions>
        </Dialog>)
    }


    function getGender(Gender) {
        switch (Gender) {
            case "MALE" :
                return <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}}
                             label={<><SentimentSatisfiedAltOutlined
                                 sx={{color: "#ffffff"}}/><Typography variant={"caption"} sx={{px: 1}}>آقایان</Typography></>}/>
            case "FEMALE" :
                return <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}}
                             label={<><Face3Outlined sx={{color: "#ffffff"}}/><Typography
                                 variant={"caption"} sx={{px: 1}}>خانم‌ها</Typography></>}/>
            case "BOYS" :
                return <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}}
                             label={<><Face6Outlined sx={{color: "#ffffff"}}/><Typography
                                 variant={"caption"} sx={{px: 1}}>پسرها</Typography></>}/>
            case "GIRLS" :
                return <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}}
                             label={<><Face2Outlined sx={{color: "#ffffff"}}/><Typography
                                 variant={"caption"} sx={{px: 1}}>دخترها</Typography></>}/>
            case "KIDS" :
                return <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}}
                             label={<><ChildCare sx={{color: "#ffffff"}}/><Typography
                                 variant={"caption"} sx={{px: 1}}>کودکان</Typography></>}/>
            case "NONE" :
                return <Chip size={"small"} sx={{bgcolor: "#555555", color: "#ffffff"}}
                             label={<><SupervisedUserCircleOutlined
                                 sx={{color: "#ffffff"}}/><Typography variant={"caption"}
                                                                      sx={{px: 1}}>همه</Typography></>}/>

        }
    }

    return (
        <>
            <Grid size={{xs: 2, sm: 2, md: 2, lg: 1, xl: 1}} sx={{width: "100%"}}>
                <Card elevation={6} sx={{
                    width: "100%",pt:1, borderColor: subscribe?.Incredible ? "#e7333e" : "gray", transition: "ease-in-out 300ms", ':hover': {
                        borderColor: subscribe?.Incredible ? "#770f16" : "#363636"
                    }
                }}>
                    {timerText && subscribe?.Incredible &&
                    <Chip className={"animate__animated animate__repeat-3 animate__flash"} size={"medium"}
                          label={"شگفت انگیز : " + timerText}
                          sx={{ml: 3, px: 1, mt: -3, fontSize: "0.9rem", position: "absolute", bgcolor: "#e7333e", color: "#fff"}}/>}
                    <CardHeader
                        component={"a"}
                        sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                        title={<><Typography variant={"h2"} sx={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            display: "inline",
                            mr: 1
                        }}> {subscribe.Name}</Typography>
                            {(subscribe.Price < subscribe.ValuePrice) && <>
                                <img width={20} src={"/assets/images/discountIcon.svg"}/>
                            </>}</>}

                        action={<>
                            <_UserCanBuyThisTicket ticket={subscribe}/>
                            <_TicketUpdateCheck ticket={subscribe}/>
                        </>}

                    />
                    <CardContent sx={{pt: 0}}>
                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                            <Grid><GroupOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                       variant={"body2"}
                                                                                                       color={"gray.contrastText"}>جنسیت</Typography></Grid>
                            <Grid><Typography variant={"body2"} color={"gray.contrastText"}
                                              sx={{fontSize: "0.8rem"}}>{getGender(subscribe.Gender)}</Typography></Grid>
                        </Grid>
                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                            <Grid><PaymentsOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                          variant={"body2"}
                                                                                                          color={"gray.contrastText"}>تعداد
                                جلسات</Typography> </Grid>
                            <Grid><Typography variant={"h3"} color={"gray.contrastText"}
                                              sx={{fontSize: "0.8rem", fontWeight: 600}}>{subscribe.EntryTotalCount}</Typography></Grid>
                        </Grid>

                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                            <Grid><HourglassTopOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                              variant={"body2"}
                                                                                                              color={"gray.contrastText"}>انقضا</Typography></Grid>
                            <Grid><Typography variant={"body2"} color={"gray.contrastText"} sx={{fontSize: "0.9rem", fontWeight: 600}}>
                                {subscribe.ExpireDuration + " روز"}</Typography></Grid>
                        </Grid>

                        {/*{(subscribe?.Timing || subscribe?.Coaches?.length > 0 || subscribe?.Description) &&*/}
                        {/*<Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>*/}
                        {/*    <Grid><Typography variant={"body2"} color={"gray.contrastText"}>اطلاعات دیگر</Typography></Grid>*/}
                        {/*    <Grid>*/}
                        {/*        {subscribe?.Timing && <_ticketSubscribeActiveTimes subscribe={subscribe}/>}*/}
                        {/*        {subscribe?.Coaches?.length > 0 && <_ticketCoach ticket={subscribe}/>}*/}
                        {/*        {subscribe?.Description && <_ticketInfo ticket={subscribe}/>}*/}
                        {/*    </Grid>*/}
                        {/*</Grid>}*/}

                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                            <Grid><HistoryToggleOffOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                                  variant={"body2"}
                                                                                                                  color={"gray.contrastText"}>زمان
                                استفاده</Typography></Grid>
                            <Grid>
                                <_ticketSubscribeActiveTimes subscribe={subscribe}/>
                            </Grid>
                        </Grid>
                        {/*{subscribe?.Coaches?.length > 0 &&*/}
                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                            <Grid><SupervisorAccountOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                                   variant={"body2"}
                                                                                                                   color={"gray.contrastText"}>مربی</Typography></Grid>
                            <Grid>
                                <_ticketCoach subscribe={subscribe}/>
                            </Grid>
                        </Grid>
                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                            <Grid><MedicalInformationOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                                    variant={"body2"}
                                                                                                                    color={"gray.contrastText"}>اطلاعات
                                لازم</Typography></Grid>
                            <Grid>
                                <_ticketInfo subscribe={subscribe}/>
                            </Grid>
                        </Grid>
                        <Button disabled={!subscribe.Enable} variant={"contained"} color={"primary"} onClick={() => addToCard(subscribe)}
                                sx={{mt: 1}} fullWidth>
                            {subscribe.Enable ? <Grid container sx={{width: "100%", minHeight: 45}} columns={42}>
                                {login && <Grid size={20} container direction={"column"} justifyContent={"center"} alignContent={"center"}
                                                alignItems={"start"}>
                                    {(subscribe.Price < subscribe.ValuePrice) && <Grid>
                                        <Typography component={"span"}
                                                    sx={{textAlign: "start", textDecoration: "line-through", fontSize: "0.8rem"}}
                                                    variant={"h6"}> {toPriceWithComma(subscribe.ValuePrice)}</Typography>

                                    </Grid>}
                                    <Grid>
                                        <Typography component={"span"} variant={"h5"}
                                                    sx={{fontSize: "0.8rem"}}>{toPriceWithComma(subscribe.Price) + " تومان"}</Typography>
                                    </Grid>
                                </Grid>}
                                {!login && <Grid size={20} container direction={"column"} justifyContent={"center"} alignContent={"center"}
                                                 alignItems={"start"}>
                                    <Grid>
                                        <Typography component={"span"} variant={"h5"}
                                                    sx={{fontSize: "0.8rem"}}>{"وارد شوید"}</Typography>
                                    </Grid>
                                </Grid>}
                                <Grid size={1}>

                                    <Divider orientation="vertical"
                                             sx={{height: "45px", width: "1px", borderColor: "#FFFFFF", borderStyle: "dashed"}}
                                             component="div"/>
                                </Grid>
                                <Grid alignContent={"center"} size={21}>
                                    <Typography component={"span"} variant={"h5"} sx={{fontSize: "1.0rem"}}>رزرو</Typography>
                                </Grid>
                            </Grid> : <Typography variant={"h6"}>{"غیر فعال"}</Typography>}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            {renderModal()}
        </>
    );
};

export default _PlaceSubscribeListItem;
