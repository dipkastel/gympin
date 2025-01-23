import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";

const WPageUsersList = ({onNext}) => {
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="پرسنل"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            لطفا اطلاعات پرسنل مجموعه خود را در یک فایل اکسل مطابق تصویر زیر جمع آوری نمایید و از طریق راه های ارتباطی جیم پین برای ما ارسال نمایید.
                        </Typography>
                        <Typography variant={"body2"}>
                            در فرم داده شده فقط "نام و نام خانوادگی" و "شماره موبایل" الزامی است
                        </Typography>
                        <Typography variant={"body2"}>
                            برای گروه بندی پرسنل نام گروه مربوطه (دلخواه) را در قسمت گروه جدول وارد نمایید
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="راه های ارتباطی"/>
                    <CardContent>

                        <Link href={"https://t.me/Gympin_support"}>
                            <Image className={"p-4"} src={"/assets/images/telegram1.png"}  width={"25%"}/>
                        </Link>
                        <Link href={"https://wa.me/+989221496746"}>
                            <Image className={"p-4"} src={"/assets/images/whatsapp1.png"}  width={"25%"}/>
                        </Link>
                        <Link href={"https://web.bale.ai/chat?uid=266585470"}>
                            <Image className={"p-4"} src={"/assets/images/bale1.png"}  width={"25%"}/>
                        </Link>
                        <Link href={"https://web.eitaa.com/#@gympin_ir"}>
                            <Image className={"p-4"} src={"/assets/images/eitaa.png"}  width={"25%"}/>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="جدول"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> برای دانلود فایل اکسل روی تصویر زیر کلیک کنید </Typography>

                        <Link href={"/assets/download/excel_sample.csv"}>
                            <Image src={"/assets/images/excel_sample.jpg"}  width={"100%"}/>
                        </Link>

                    </CardContent>
                </Card>
            </Grid>
            <Grid item sx={{p:2}} xs={12} md={12}>
                <Button fullWidth variant={"contained"} onClick={(e)=>onNext()} > مرحله بعد </Button>
            </Grid>
        </Grid>
    );
};

export default WPageUsersList;
