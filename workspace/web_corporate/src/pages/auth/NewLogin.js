import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Alert, Button, Card, CardContent, CardHeader, IconButton, Typography, useColorScheme} from "@mui/material";
import {DarkMode, Password, Smartphone} from "@mui/icons-material";
import {ValidatedTextField} from "../../components/ValidatedTextField";
import {checkMobileValid} from "../../helper/utils";
import {login, sendSms} from "../../network/api/account.api";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/AuthActions";
import * as docharkhe from "../../helper/json/docharkhe.json"
import * as vazne from "../../helper/json/vazne.json"
import * as tirandaz from "../../helper/json/tirandaz.json"
import Lottie from "lottie-react";
import {useNavigate} from "react-router";

const lottieAnimations = [docharkhe, tirandaz, vazne];
const animationNumber = Math.floor(Math.random()*lottieAnimations.length);
const introSentences = [
    "ورزش برای همه مفید است برای کارمندان لازم",
    "سلامتی، بزرگترین دارایی است",
    "ورزش، کلید انرژی و خلاقیت است",
    "تلاش امروز، موفقیت فردا",
    "به چالش‌ها لبخند بزنید و از آنها عبور کنید",
    "قدم کوچک امروز، قدم بزرگ به سوی آینده است",
    "تیمی که ورزش می‌کند، هر روز بهتر می‌شود",
    "ورزش، نه تنها بدن، بلکه ذهن شما را نیز تقویت می‌کند",
    "تنها راه رسیدن به موفقیت، تلاش مستمر است",
    "ورزش امروز، سرمایه‌گذاری برای آینده‌ است",
    "تلاش‌های امروز، دستاوردهای فردا را می‌سازد",
    "عزم و اراده، کلید فتح قله‌هاست"];
const sentenceNumber = Math.floor(Math.random()*introSentences.length);

const NewLogin = (props) => {

    const navigate = useNavigate();
    const {mode, setMode} = useColorScheme();
    const statusEnum = {clear: 0, loadingSendSms: 1, smsSent: 2, loadingConfirm: 3}
    const [status, setStatus] = useState(statusEnum.clear);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [code, setCode] = useState(null);
    const [smsError, setSmsError] = useState(null);
    const [codeError, setCodeError] = useState(null);
    const [canSendCode, setCanSendCode] = useState(false);
    const [canConfirmCode, setCanConfirmCode] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [sendBtnTitle, setSendBtnTitle] = useState("ارسال کد تایید");


        useEffect(() => {
        let interval = null;
        if ((status === statusEnum.smsSent) && !isTimerActive) {
            setIsTimerActive(true);
            let count = 120;
            let interval = setInterval(() => {
                if (count > 0) {
                    count--;
                    setSendBtnTitle("ارسال مجدد " + count);
                    setCanSendCode(false);
                } else {
                    setSendBtnTitle("ارسال مجدد ");
                    setIsTimerActive(false);
                    setCanSendCode(true);
                    setStatus(statusEnum.clear);
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => {
            setIsTimerActive(false);
            clearInterval(interval);
        };
    }, [status]);

    useEffect(() => {
        try {
            if (window.location.pathname == "/settings/exit"){
                navigate("/dashBoard");
                setTimeout(()=>{
                    window.location = window.location;
                },1000);
            }
        } catch (e) {
        }
    }, []);


    if (!mode) {
        return null;
    }



    function submitForm(event) {
        event.preventDefault();
        setStatus(statusEnum.loadingSendSms);
        sendSms({
            "phoneNumber": phoneNumber,
            Application: "WEBCORPORATE"
        }).then((data) => {
            setStatus(statusEnum.smsSent);
            setSmsError(null);
        }).catch((err) => {
            console.log(err);
            setStatus(statusEnum.clear);
            setSmsError(err?.response?.data?.Message || "خطا در ارسال پیامک.");
        })

    }

    function mobileValidator(number) {
        setSmsError(null);
        setPhoneNumber(number);
        if (!checkMobileValid(number)) {
            setCanSendCode(false);
            return "شماره موبایل صحیح نیست";
        }
        setCanSendCode(true);
    }

    function codeValidation(number) {
        setCodeError(null);
        if (number?.toString()?.length < 4) {
            setCanConfirmCode(false);
            return "کد 4 رقم است";
        }
        setCanConfirmCode(true);
        setCode(number);
    }

    function confirmCode(e) {
        console.log(e);
        try {
            setStatus(statusEnum.loadingConfirm);
            login({
                username: phoneNumber,
                password: e,
                Application: "WEBCORPORATE"
            }).then((data) => {
                try {
                    setCodeError(null);
                } catch (e) {
                }
                try {
                    props.SetUser(data.data.Data);
                } catch (e) {
                }
                try {
                    props.SetToken(data.data.Data.Token);
                } catch (e) {
                }
                try {
                    props.SetRefreshToken(data.data.Data.RefreshToken);
                } catch (e) {
                }
            }).catch((err) => {
                console.log(err);
                setStatus(statusEnum.smsSent);
                setCodeError(err?.response?.data?.Message || "کد وارد شده معتبر نیست.");
            });
        } catch (e) {
        }
    }

    return (
        <>

            <Grid
                container
                className={mode=='light'?"loginBgLight":"loginBgDark"}
                direction={"row"}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                style={{minHeight: '100vh'}}
                columns={18}
            >
                <Grid size={{xs:18,md:8}} justifyItems={"center"}>
                    <Card sx={{borderRadius: 8}}>
                        <CardHeader
                            action={<IconButton onClick={e => setMode(mode == 'light' ? 'dark' : 'light')}><DarkMode/></IconButton>}
                        />
                        <CardContent sx={{px: 5, pb: "80px !important"}}>
                            <form onSubmit={submitForm}>
                                <Grid container direction={"column"}>
                                    <img width={"300px"} src={mode == 'light' ?"/logoTypo300.png":"/logoTypo300Dark.png"}/>

                                    <Typography sx={{mt: 7}} variant={"subtitle1"}>ورود با کد یکبار مصرف</Typography>
                                    <Typography sx={{mt: 7, textAlign: "start"}} variant={"body2"}>لطفا شماره موبایل خود را وارد
                                        کنید</Typography>
                                    <ValidatedTextField
                                        label="موبایل"
                                        variant="outlined"
                                        name={"phoneNumber"}
                                        sx={{mt: 2}}
                                        isMobile={true}
                                        validator={mobileValidator}
                                        disabled={status !== statusEnum.clear}
                                        required={true}
                                        slotProps={{
                                            input: {
                                                endAdornment: (<Smartphone color={"primary"}/>),
                                            },
                                            htmlInput: {
                                                maxLength: 11
                                            }
                                        }}
                                    />

                                    {smsError && <Alert sx={{mt: 1}} severity={"error"}>{smsError}</Alert>}

                                    <Button
                                        color={"primary"}
                                        loading={status === statusEnum.loadingSendSms}
                                        sx={{mt: 1}}
                                        disabled={!canSendCode}
                                        loadingPosition="start"
                                        type={"submit"}
                                        variant="contained"
                                    >
                                        {sendBtnTitle}
                                    </Button>
                                    {(status === statusEnum.smsSent || status === statusEnum.loadingConfirm) && <>
                                        <Typography sx={{mt: 4, textAlign: "start"}} variant={"body2"}>لطفا کد دریافت شده در پیامک را وارد
                                            نمایید</Typography>
                                        <ValidatedTextField
                                            label="کد دریافتی"
                                            variant="outlined"
                                            name={"Code"}
                                            maxLength={4}
                                            disabled={status === statusEnum.loadingConfirm}
                                            sx={{mt: 2, input: {textAlign: "center", letterSpacing: "0.5rem"}}}
                                            type={"number"}
                                            trigerOn={4}
                                            triger={e => confirmCode(e.target.value)}
                                            validator={codeValidation}
                                            required={true}
                                            slotProps={{
                                                input: {
                                                    endAdornment: (<Password color={"primary"}/>),
                                                }
                                            }}
                                        />
                                        {codeError && <Alert severity={"error"}>{codeError}</Alert>}
                                        <Button
                                            color={"primary"}
                                            loading={status === statusEnum.loadingConfirm}
                                            sx={{mt: 1}}
                                            disabled={!canConfirmCode}
                                            loadingPosition="start"
                                            onClick={e => confirmCode(code)}
                                            variant="contained"
                                        >
                                            تایید
                                        </Button>
                                    </>}
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid sx={{display: { xs: 'none',md: 'block' }}} size={{xs:false, md:10}} justifyItems={"center"}>
                    <Lottie
                        animationData={lottieAnimations[animationNumber]}
                        loop={true}
                        autoplay={true}
                        style={{width: 400, height: 400}}
                    />
                    <Typography variant={"h4"} color={"white"}>{introSentences[sentenceNumber]}</Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default connect(null, authActions)(NewLogin);
