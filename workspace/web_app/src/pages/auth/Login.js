import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, CardContent, Grid2 as Grid, Paper, TextField, Typography} from "@mui/material";
import {checkMobileValid} from "../../helper/utils";
import {login, registerWithInviteCode, sendSms} from "../../network/api/account.api";
import {connect} from "react-redux";
import {authActions} from "../../helper/redux/actions/authActions";
import {ErrorContext} from "../../components/GympinPagesProvider";


function Login(props) {

    const error = useContext(ErrorContext);
    const params = useParams();
    const [mobileNumber, setMobileNumber] = useState({value: params?.phoneNumber});
    const [disableSendBtn, setDisableSendBtn] = useState(true);
    const [sendBtnText, setSendBtnText] = useState("ارسال کد ورود");
    const [disablePhoneNumber, setDisablePhoneNumber] = useState(false);
    const [registered, setRegistered] = useState(true);
    const [fullName, setFullName] = useState({});
    const [disableFullName, setDisableFullName] = useState(false);
    const [inviteCode, setInviteCode] = useState(null);
    const [disableInviteCode, setDisableInviteCode] = useState(false);
    const [disableRegisterBtn, setDisableRegisterBtn] = useState(true);
    const [sentCode, setSentCode] = useState(false);
    const [code, setCode] = useState({});
    const [disableCode, setDisableCode] = useState(false);
    const [disableLoginBtn, setDisableLoginBtn] = useState(true);
    const [isSmartiz, setIsSmartiz] = useState(false);


    useEffect(() => {
        if (code?.value?.length == 4) {
            loginByNumber(null);
        }
    }, [code]);

    useEffect(() => {

        if (params?.code == "smartispay") {
            setInviteCode({value:"CGF153DS"})
            setIsSmartiz(true);
        } else if (params?.code) {
            setInviteCode({value:params.code});
            setRegistered(false);
        }


    }, [params]);


    function sendMessage(e) {
        e.preventDefault()
        if (!checkMobileValid(mobileNumber.value)) {
            error.showError({message: "شماره همراه صحیح نیست"});
        }
        var count = 120;
        setDisableSendBtn(true);
        sendSms({
            "phoneNumber": mobileNumber.value.toString(),
            Application: "WEBAPP"
        })
            .then((data) => {
                let interval = setInterval(() => {
                    if (count > 0) {
                        count--;
                        setSendBtnText("ارسال مجدد : " + count)
                        setSentCode(true);
                    } else {
                        clearInterval(interval);
                        setSendBtnText("ارسال مجدد ");
                        setDisableSendBtn(false);
                        setSentCode(false);
                    }
                }, 1000);
            })
            .catch((err) => {
                setDisableSendBtn(false);
                try {
                    if (err?.response?.data?.Error?.code === 1102) {
                        setDisableSendBtn(true);
                        setDisablePhoneNumber(true);
                        setRegistered(false);
                    } else
                        error.showError({message: err.response.data.Message});
                } catch (f) {
                    error.showError({message: "اتصال به شبکه را بررسی نمایید",});
                }
            })
    }

    function register(e) {
        registerWithInviteCode({
            PhoneNumber: mobileNumber?.value,
            FullName: fullName?.value,
            InvitedBy: isSmartiz?"CGF153DS":(inviteCode?.value)
        }).then((data) => {
            sendMessage(e);
            setRegistered(true);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function changeMobileNumber(e) {
        var number = e.target.value;
        if (!number.startsWith('0')) {
            setMobileNumber({helperText: "شماره همراه با 0 شروع میشود"});
            setDisableSendBtn(true);
            return;
        }
        if (number.length < 11) {
            setMobileNumber({value: number, helperText: "شماره همراه 11 رقم نیست"});
            setDisableSendBtn(true);
            return;
        }
        if (number.length > 11) {
            return;
        }
        setDisableSendBtn(false);
        setMobileNumber({value: number, ok: true});
    }

    function changeFullName(e) {
        var name = e.target.value;
        if (name.length < 3) {
            setFullName({value: name, helperText: "نام ونام خانوادگی صحیح نیست"});
            setDisableRegisterBtn(true);
            return;
        }
        if (!name.includes(' ')) {
            setFullName({value: name, helperText: "هم نام و هم نام خانوادگی باید وارد شود"});
            setDisableRegisterBtn(true);
            return;
        }
        if (name?.split(' ')[1].length < 3) {
            setFullName({value: name, helperText: "نام خانوادگی باید وارد شود"});
            setDisableRegisterBtn(true);
            return;
        }
        if (name.length > 30) {
            return;
        }
        if (inviteCode.ok)
            setDisableRegisterBtn(false);
        setFullName({value: name, ok: true});
        changeInviteCode(inviteCode.value)
    }

    function changeInviteCode(name) {
        if (name.length < 7) {
            setInviteCode({value: name, helperText: "کد معرف صحیح نیست"});
            setDisableRegisterBtn(true);
            return;
        }
        if (name.length > 8) {
            return;
        }
        if (fullName.ok)
            setDisableRegisterBtn(false);
        setInviteCode({value: name, ok: true});
    }

    function changeCode(e) {
        var name = e.target.value;
        if (name.length < 4) {
            setCode({value: name, helperText: "کد صحیح نیست"});
            setDisableLoginBtn(true);
            return;
        }
        if (name.length > 4) {
            return;
        }
        setDisableLoginBtn(false);
        setCode({value: name, ok: true});
    }

    function loginByNumber(e) {
        e?.preventDefault();
        login({
            username: mobileNumber.value,
            password: code.value,
            Application: "WEBAPP"
        }).then((data) => {
            props.SetUser(data.data.Data);
            props.SetToken(data.data.Data.Token);
            props.SetRefreshToken(data.data.Data.RefreshToken);
        }).catch((err) => {
            try {
                error.showError({message: err.response.data.Message});
            } catch (f) {
                error.showError({message: "اتصال به شبکه را بررسی نمایید",});
            }
        });
    }

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{height: "100vh", backgroundImage: "url('/assets/images/loginbgloop.jpg')"}}
            >
                <Grid item>
                    <Card elevation={5} sx={{
                        borderRadius: 8,
                        m: 3,
                        maxWidth: 360
                    }}>
                        <Paper sx={{mx: 12, bgcolor: "gray.darker", px: 3, py: 2, borderRadius: "0 0 32px 32px"}}>
                            <img width={"100%"} src={"/assets/images/gympinTypoLight.svg"}/>
                        </Paper>
                        <CardContent>
                            {!isSmartiz && <>
                                <Typography color={"gray.darker"} sx={{mt: 1, fontWeight: 800}} variant={"h5"}>خوش آمدید</Typography>
                                <Typography color={"gray.darker"} sx={{mt: 1, lineHeight: 1.8}} variant={"body2"}>برای استفاده از خدمات جیم
                                    پین،
                                    شماره موبایل خود
                                    را وارد کرده و سپس کد تایید را ثبت نمایید</Typography></>}
                            {isSmartiz && <>
                                <Grid sx={{mt:2}} container spacing={1} justifyContent={"start"} direction={"row"} alignItems={"center"}  >
                                    <img src={"/assets/images/smartiz-picto.png"} width={"39px"} height={"28px"} />

                                    <Typography color={"gray.darker"} sx={{ fontWeight: 800}} variant={"h5"}>
                                        {"کاربر اسمارتیز خوش آمدید"}
                                    </Typography>
                                </Grid>
                                <Typography color={"gray.darker"} sx={{mt: 1, lineHeight: 1.8}} variant={"body2"}>برای استفاده از خدمات جیم
                                    پین،
                                    شماره همراهی که در اسمارتیز ثبت شده
                                    را وارد کرده و سپس کد تایید را ثبت نمایید</Typography>
                            </>}

                            <TextField
                                variant="outlined"
                                type="text"
                                sx={{mt: 3}}
                                value={mobileNumber?.value || ""}
                                onChange={(e) => {
                                    changeMobileNumber(e)
                                }}
                                inputProps={{inputMode: 'numeric', style: {letterSpacing: "0.5rem", textAlign: "center", direction: "ltr"}}}
                                label={"شماره همراه"}
                                placeholder={"09_________"}
                                disabled={disablePhoneNumber}
                                error={mobileNumber?.helperText || false}
                                helperText={mobileNumber?.helperText || " "}
                                fullWidth
                            />
                            <TextField
                                variant="outlined"
                                type="text"
                                sx={{mt: 1}}
                                value={fullName?.value || ""}
                                onChange={(e) => {
                                    changeFullName(e)
                                }}
                                hidden={registered}
                                label={"نام و نام خانوادگی"}
                                disabled={disableFullName}
                                error={fullName?.helperText || false}
                                helperText={fullName?.helperText || " "}
                                fullWidth
                            />
                            <TextField
                                variant="outlined"
                                type="text"
                                sx={{mt: 1}}
                                value={inviteCode?.value || ""}
                                onChange={(e) => {
                                    changeInviteCode(e.target.value)
                                }}
                                hidden={registered||isSmartiz}
                                label={"کد معرف"}
                                inputProps={{inputMode: 'numeric', style: {letterSpacing: "0.5rem", textAlign: "center", direction: "ltr"}}}
                                disabled={disableInviteCode}
                                error={inviteCode?.helperText || false}
                                helperText={inviteCode?.helperText || " "}
                                fullWidth
                            />
                            {registered && <Button onClick={(e) => sendMessage(e)} disabled={disableSendBtn} size={"large"} fullWidth
                                                   variant={"contained"}>{sendBtnText}</Button>}
                            {!registered && <Button onClick={(e) => register(e)} disabled={disableRegisterBtn} size={"large"} fullWidth
                                                    variant={"contained"}>ثبت نام</Button>}

                            <TextField
                                variant="outlined"
                                type="number"
                                sx={{mt: 3}}
                                value={code?.value || ""}
                                onChange={(e) => {
                                    changeCode(e)
                                }}
                                hidden={!sentCode}
                                label={"کد ورود"}
                                inputProps={{inputMode: 'numeric', style: {letterSpacing: "0.5rem", textAlign: "center", direction: "ltr"}}}
                                disabled={disableCode}
                                error={code?.helperText || false}
                                helperText={code?.helperText || " "}
                                fullWidth
                            />
                            {sentCode && <Button onClick={(e) => loginByNumber(e)} disabled={disableLoginBtn} size={"large"} fullWidth
                                                 variant={"contained"}>ورود</Button>}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
            {/*{RegisterPopup()}*/}
        </>
    );
}

export default connect(null, authActions)(Login)
