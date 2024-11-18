import React from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../utils/utils";

const _WorkWithUs = () => {
    return (
        <>
            <Card elevation={10} sx={{m:1.8,mt:6,mb:4,borderRadius:8}}>
                <CardContent sx={{p:1,pt:4  }} >
                    <Typography sx={{mx:2,direction:"rtl",fontSize:15,fontWeight:"bold",textAlign:"right" }} variant={"subtitle1"}>
                        همکاری با جیم پین
                    </Typography>
                    <Typography sx={{mx:2,mt:1,direction:"rtl",fontSize:15,textAlign:"justify",lineHeight:"1.5em"}} variant={"subtitle1"}>
                        در صورتی که سازمان هستید و می خواهید از خدمات جیم پین استفاده کنید و یا دارای مجموعه ورزشی هستید و می خواهید در جیم پین به عنوان مرکز ورزشی خدمات دهنده فعالیت کنید از طریق دکمه های زیر اقدام نمایید و منتظر تماس کارشناسان جیم پین بمانید:
                    </Typography>
                    <Button variant={"contained" } className={"btn-red3"} href="https://place.gympin.ir/auth/register"   sx={{mx:0,my:3,py:2,borderRadius:8}}>
                        <Typography sx={{mr:3,ml:3}} variant={"subtitle2"}>
                            ثبت نام مرکز ورزشی
                        </Typography>
                    </Button>
                    <br/>
                    <Button variant={"contained" } className={"btn-red4"} href="https://gympin.ir/corporate"  sx={{mx:0,my:3,py:2,borderRadius:8}}>
                        <Typography sx={{mr:3,ml:3,color:"#e7333e",fontWeight:"bold" }} variant={"subtitle2"}>
                            اطلاعات بیشتر شرکت ها
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default _WorkWithUs;
