import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CircularProgress, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {giftCredit_checkStatus} from "../../network/api/giftCredit.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {replacePersianNumbers, toPriceWithComma} from "../../helper/utils";
import {AccountCircle, QrCodeScanner} from "@mui/icons-material";

const Code = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [loading, SetLoading] = useState(true)
    const [codeDetails, SetCodeDetails] = useState(null)

    const {code} = useParams();

    useEffect(() => {
        getCodeDetails();
    }, [code]);

    function getCodeDetails() {
        giftCredit_checkStatus({code: code}).then(result => {
            SetLoading(false);
            SetCodeDetails(result.data.Data);
            console.log(result);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
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
                        {loading && <CardContent sx={{textAlign: "center"}}>
                            <CircularProgress/>
                        </CardContent>}
                        {!loading && <Grid container sx={{mt: 3, mb: 3}}>
                            <Grid sx={{bgcolor: "#CCCCCC", width: "100%", p: 3, textAlign: "center"}}>
                                <Typography variant={"h6"} component={"span"}>{"کارت هدیه  : "}</Typography>
                                <Typography variant={"h3"} component={"span"}>{toPriceWithComma(codeDetails.Amount)}</Typography>
                                <Typography variant={"h6"} component={"span"}>{" تومان"}</Typography>
                            </Grid>


                            <Grid sx={{width: "100%", p: 2}}>
                                <Typography variant={"subtitle1"}>{"طریقه استفاده  : "}</Typography>

                                {codeDetails.CanRegister &&
                                <Typography variant={"body1"} component={"span"}>با شماره موبایل خود در اپلیکیشن کاربران جیم پین ثبت نام
                                    کنید.</Typography>}
                                {!codeDetails.CanRegister && <><Typography lineHeight={"1.4rem"} variant={"body2"}>
                                    {"با شماره موبایل خود "}
                                    <span dir={"ltr"}>{replacePersianNumbers(codeDetails.User.PhoneNumber)}</span>
                                    {" در اپلیکیشن کاربران جیم پین ورود کنید."}</Typography></>}
                                <Typography sx={{mt: 1}}  lineHeight={"1.4rem"} variant={"body2"} >
                                    {"از قسمت پروفایل "}
                                    <AccountCircle/>
                                    {" گزینه اسکن کد "}
                                    <QrCodeScanner/>
                                    {" را انتخاب کرده و کارت را اسکن کنید تا مبلغ به کیف پول شما واریز گردد."}

                                </Typography>

                            </Grid>
                            <Grid sx={{width: "100%", p: 2}}>
                                <Button fullWidth variant={"contained"} sx={{p: 1}}
                                        onClick={(e) => navigate("/login/" + codeDetails.RegisterCode)}>{codeDetails.CanRegister ? "ثبت نام" : "ورود"}</Button>
                            </Grid>

                            <Grid sx={{width: "100%", textAlign: "center"}}>
                                <img width={"300px"} src={"/assets/images/svg/gift.svg"}/>
                            </Grid>


                        </Grid>}
                    </Card>
                </Grid>

            </Grid>
        </>
    );
};

export default Code;
