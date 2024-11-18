import React from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../utils/utils";

const _PlaceApplication = () => {
    return (
        <>
            <Card elevation={10} sx={{m:1.8,mt:6,borderRadius:8}}>
                <CardContent sx={{p:1,pt:4  }} >
                    <Typography sx={{mx:2,direction:"rtl",fontSize:15,fontWeight:"bold",textAlign:"right" }} variant={"subtitle1"}>
                        اپلیکیشن مراکز ورزشی (مدیران و پرسنل مراکز)
                    </Typography>
                    <Typography sx={{mx:2,mt:1,mb:5,direction:"rtl",fontSize:15,textAlign:"justify",lineHeight:"1.5em"}} variant={"subtitle1"}>
                        جیم پین برای مراکز ورزشی یک اپلیکیشن مخصوص دارد که در این اپلیکیشن، مجموعه های ورزشی امکاناتی مانند به روز رسانی قیمت ها، ویرایش بلیط ها، بروز رسانی اطلاعات مجموعه را دارا می باشند؛ همچنین امکان اسکن بلیط، مشاهده بلیط های فروخته شده از دیگر امکانات این اپلیکیشن می باشد.
                    </Typography>
                    <Image className={"inCardImage"} src={toAbsoluteUrl("/assets/images/app_place.jpg")} />
                    <Button variant={"contained" } className={"btn-green"} href={"https://place.gympin.ir/"} sx={{mx:0,my:3,py:2,borderRadius:8}}>
                        <Typography sx={{mr:3,ml:3}} variant={"subtitle2"}>
                            ورود مراکز ورزشی (مدیریت مراکز)
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default _PlaceApplication;
