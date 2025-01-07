import React from 'react';
import {IconButton, Typography} from "@mui/material";
import {Instagram, LinkedIn, Telegram, WhatsApp} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

const Footer = () => {


    return (
        <footer>
            <Grid container alignItems={"flex-start"} columns={80}>

                <Grid size={{xs: 40, md: 15, xl: 15}} justifyItems={"center"}>
                    <ul>
                        جیم پین
                        <li><a href={"/about"}>آشنایی با جیم پین</a></li>
                        <li><a href={"/blog"}>وبلاگ</a></li>
                        <li><a href={"/contact"}>تماس با ما</a></li>
                    </ul>
                </Grid>
                <Grid size={{xs: 40, md: 15, xl: 15}} justifyItems={"center"}>
                    <ul>
                        خدمات
                        <li><a href={"/#intro"}>ثبت نام سازمان‌ها</a></li>
                        <li><a target={"_blank"} href={"https://apps.gympin.ir"}>ورود به اپلیکیشن‌ها</a></li>
                        <li><a href={"/corporate"}>سازمان‌ها و شرکت‌ها</a></li>
                    </ul>
                </Grid>
                <Grid size={{xs: 80, md: 15, xl: 15}} justifyItems={"center"}>
                    <ul>
                        سیاست‌های پلتفرم
                        <li><a href={"/term-and-conditions"}>قوانین و مقررات</a></li>
                        <li><a href={"/faq"}>سوالات متداول</a></li>
                    </ul>
                </Grid>
                <Grid size={{xs: 80, md: 5, xl: 5}}></Grid>
                <Grid size={{xs: 80, md: 30, xl: 30}}>
                    <Grid container columns={4} alignContent={"center"} justifyContent={"center"}>
                        <Grid sx={{px: 1, py: 4}} size={{xs: 2, md: 1, xl: 1}} textAlign={"center"}>
                            <img alt={"انجمن صنفی کسب و کار‌های اینترنتی"} className={"footer-li-img"} src={"/assets/images/anjoman.jpg"}/>
                        </Grid>
                        <Grid sx={{px: 1, py: 4}} size={{xs: 2, md: 1, xl: 1}} textAlign={"center"}>
                            <img alt={"درگاه ملی مجوز‌ها"} className={"footer-li-img"} src={"/assets/images/dargah-moj.jpg"}/>
                        </Grid>
                        <Grid sx={{px: 1, py: 4}} size={{xs: 2, md: 1, xl: 1}} textAlign={"center"}>
                            <img alt={"اتحادیه کسب و کار‌های کشوری"} className={"footer-li-img"} src={"/assets/images/etehadie.jpg"}/>
                        </Grid>
                        <Grid sx={{px: 1, py: 4}} size={{xs: 2, md: 1, xl: 1}} textAlign={"center"}>
                            <a referrerPolicy='origin' target='_blank'
                               href='https://trustseal.enamad.ir/?id=530057&Code=fPUbicgi3RqAfY4GyUD0UQYpJYadZKYf'>
                                <img
                                    className={"enamad"}
                                    referrerPolicy='origin'
                                    loading={"lazy"}
                                    src='https://trustseal.enamad.ir/logo.aspx?id=530057&Code=fPUbicgi3RqAfY4GyUD0UQYpJYadZKYf'
                                    alt='نشان اینماد وبسایت جیم پین' code='fPUbicgi3RqAfY4GyUD0UQYpJYadZKYf'/>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={"copyright"}>
                <Grid size={8}>
                    <Typography variant={"overline"} sx={{fontSize: "0.75rem"}}> تمامی‌حقوق این وبسایت متعلق به شرکت </Typography>
                    <Typography variant={"overline"} sx={{fontSize: "0.75rem"}} color={"primary"}>پیشگامان فناوری داده نوتریکا
                        © </Typography>
                    <Typography variant={"overline"} sx={{fontSize: "0.75rem"}}>می‌باشد.</Typography>

                </Grid>
                <Grid sx={{direction: "ltr"}} size={4}>
                    <IconButton size={"small"} sx={{mx: 0.5}} href={"https://wa.me/+989221496746"}>
                        <WhatsApp/>
                    </IconButton>
                    <IconButton size={"small"} sx={{mx: 0.5}} href={"https://t.me/gympin_info"}>
                        <Telegram/>
                    </IconButton>
                    <IconButton size={"small"} sx={{mx: 0.5}} href={"https://www.linkedin.com/company/gympintdp"}>
                        <LinkedIn/>
                    </IconButton>
                    <IconButton size={"small"} sx={{mx: 0.5}} href={"https://www.instagram.com/gympin_ir"}>
                        <Instagram/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container sx={{minHeight: "10px"}}>
            </Grid>
        </footer>
    );
};

export default Footer;
