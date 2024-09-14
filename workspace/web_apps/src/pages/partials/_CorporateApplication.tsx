import React from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import {toAbsoluteUrl} from "../../utils/utils";

const _CorporateApplication = () => {
    return (
        <>
            <Card elevation={10} sx={{m:1.8,mt:6,borderRadius:8}}>
                <CardContent sx={{p:1,pt:4  }} >
                    <Typography sx={{mx:2,direction:"rtl",fontSize:15,fontWeight:"bold",textAlign:"right" }} variant={"subtitle1"}>
                        اپلیکیشن سازمان ها و شرکت ها
                    </Typography>
                    <Typography sx={{mx:2,mt:1,direction:"rtl",fontSize:15,textAlign:"justify",lineHeight:"1.5em"}} variant={"subtitle1"}>
                        اپلیکیشن ویژه به سازمان ها مزایایی از جمله بهبود مدیریت پرسنل، مدیریت مالی بهتر و شفاف تر، امکان تشویق کارمندان، کاهش هزینه های اداری، و بهبود بهره وری مالی را ارائه می دهد. این امکانات به سازمان ها کمک می کنند تا مدیریت پرسنل را بهبود بخشند و به تصمیم گیری های بهتری برسند.
                    </Typography>
                    <Image className={"inCardImage"} src={toAbsoluteUrl("/assets/images/app_corporate.jpg")} />
                    <Button variant={"contained" } className={"btn-blue"} href={"https://corporate.gympin.ir/"} sx={{mx:0,my:3,py:2,borderRadius:8}}>
                        <Typography sx={{mr:3,ml:3}} variant={"subtitle2"}>
                            ورود سازمان ها و شرکت ها (مدیران)
                        </Typography>
                    </Button>
                    <br/>
                    {/*<Button variant={"contained" } className={"btn-purple"} sx={{my:3,py:2,borderRadius:8}}>*/}
                    {/*    <Typography sx={{mr:3,ml:3}} variant={"subtitle2"}>*/}
                    {/*        دانلود کاتالوگ*/}
                    {/*    </Typography>*/}
                    {/*</Button>*/}
                </CardContent>
            </Card>
        </>
    );
};

export default _CorporateApplication;
