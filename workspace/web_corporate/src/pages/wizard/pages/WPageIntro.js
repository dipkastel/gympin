import React, {useEffect} from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const WPageIntro = ({onNext}) => {

    const corporate = useSelector(({corporate}) => corporate.corporate);
    useEffect(() => {
        if (corporate?.Status !== "PREREGISTER")
            window.location = "/";
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="جیم پین چیه؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            جیم پین یک پل ارتباطی بین شرکت‌ها و مراکز ورزشی است. این پلتفرم برای ارائه خدمات ورزشی به کارمندان شرکت‌ها ایجاد شده و به طور خاص طراحی شده تا مدیریت دسترسی به این خدمات را در سازمان‌ها و شرکت‌ها تسهیل کند.
                        </Typography>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="چطور کار می کنه؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> کار جیم پین، فروش خدمات ورزشی به پرسنل شرکت ها و سازمان ها است که با تعداد زیادی مراکز ورزشی در تمام نقاط تهران و کرج و با رشته های بسیار متنوع در حال همکاری است و از طریق بودجه یا کمک هزینه ای که شرکت پرداخت می کند، امکان دسترسی کارمندان را به تمامی این مراکز ورزشی را فراهم می کند. </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="تفاوت شارژ و اعتبار چیست؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            شارژ میزان مبلغی است که سازمان برای دریافت خدمات ورزشی توسط پرسنل، به جیم پین می پردازد اما اعتبار، اجازه استفاده از شارژ است که به هر کاربر برای دریافت خدمات از مراکز ورزشی داده می شود.
                        </Typography>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="گروه بندی چه کاربردی دارد؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> این امکان را فراهم می کند که مدیر پنل برای اعتبار دهی کارمندان، آنها را را به دسته های مختلف مانند مدیران، کارمندان و ... تقسیم کند.</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="امکان تعریف تاریخ انقضا یعنی چه؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> مدیر پنل برای صرفه جویی در هزینه و جلوگیری از اتلاف سرمایه، می تواند برای اعتبار داده شده به کارمند تاریخ انقضا تعریف کند تا هزینه استفاده نشده، مجدد به چرخه برگشته و قابل استفاده گردد.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="اعتباردهی سه برابری، چه زمانی قابل استفاده است؟
"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> در صورتی که مجموع مبلغ پرداختی سازمان، بیشتر از 500 میلیون تومان باشد، مدیر پنل می تواند تا سه برابر مبلغ پرداخت شده به عنوان شارژ را به کارمندان خود اعتبار دهد.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="آیا مبلغ پرداختی به جیم پین، شامل کسر از مالیات شرکت ها می شود؟
"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> بله. طبق بند 10 ماده 148 قانون مالیات های مستقیم، شرکت ها می توانند مبلغ هزینه شده برای ورزش کارمندان را، از مالیات خود را کسر نمایند.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="امکان گزارش گیری چیست؟
"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> در پنل جیم پین، امکان مشاهده ی گزارش های مختلف در زمینه های میزان استفاده ی پرسنل از مراکز طرف قرارداد، رشته های ورزشی پرطرفدار، اعتبار مصرف شده توسط پرسنل و همچین مبلغ باقی مانده از شارژ وجود دارد.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item sx={{p:2}} xs={12} md={12}>
                    <Button fullWidth variant={"contained"} onClick={(e)=>onNext()} > مرحله بعد </Button>
            </Grid>
        </Grid>
    );
};

export default WPageIntro;
