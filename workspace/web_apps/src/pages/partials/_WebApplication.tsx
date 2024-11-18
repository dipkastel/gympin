import React from 'react';
import {Button, Card, CardContent, Chip, Typography} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../utils/utils";

const _WebApplication = () => {
    return (
        <>
            <Card elevation={10} sx={{m:1.8,mt:4,borderRadius:8}}>
                <CardContent sx={{p:1,pt:4  }} >
                    <Typography sx={{mx:2,direction:"rtl",fontSize:15,fontWeight:"bold",textAlign:"right" }} variant={"subtitle1"}>
                    اپلیکیشن کاربران (پرسنل سازمان ها و شرکت ها)
                    </Typography>
                    <Typography sx={{mx:2,mt:1,direction:"rtl",fontSize:15,textAlign:"justify",lineHeight:"1.5em"}} variant={"subtitle1"}>
                        اپلیکیشن کاربران جیم پین یک ابزار کارآمد و چندمنظوره است که امکان دسترسی به مراکز ورزشی و خدمات مختلف را از طریق یک رابط کاربری آسان و متمرکز فراهم می کند. این اپلیکیشن به کاربران امکان مدیریت و استفاده از منابع و خدمات ورزشی را از طریق یک حساب کاربری اختصاصی ارائه می دهد.
                    </Typography>
                    <Image className={"inCardImage"} src={toAbsoluteUrl("/assets/images/app_user.jpg")} />
                    <Button variant={"contained" } className={"btn-red2"}  href={"https://web.gympin.ir/"} sx={{mx:0,my:3,py:2,borderRadius:8}}>
                        <Typography sx={{mr:3,ml:3}} variant={"subtitle2"}>
                            ورود کاربران (پرسنل شرکت ها)
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default _WebApplication;
