import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";
import Personnel from "../../personnel/Personnel";
import About from "../../about/About";
import SubscribesList from "../../tickets/subscribe/SubscribesList";
import CoursesList from "../../tickets/course/CoursesList";

const WPageTickets = ({onNext,ticketSubscribeChanges,ticketCourseChanges}) => {

    return (
        <div>
            <Grid container sx={{p:1}}>
                <Typography  sx={{width:"100%"}}  color={"#6e6e6e"} variant={"body1"}>
                    خدمات مجموعه را وارد کنید:
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    فروشی ها مواردی هستند که برای فروش به کاربر ساخته میشود که میتواند عضویت یا کلاس باشد.
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    تفاوت عضویت و کلاس در این است که برای کلاس باید مربی یا مربیان کلاس از کسانی که در قسمت پرسنل وارد شده‌اند، انتخاب شود.
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    در این بخش تنها نام یا عنوان فروشی وارد میشود و مشخصات کاملتر در مرحله های بعدی تکمیل میشود.
                    مثال :
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    پیلاتس 10 جلسه
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    تی آر ایکس گروهی
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    کیک بوکسینگ
                </Typography>
            </Grid>
            <SubscribesList OnChangeList={ticketSubscribeChanges} />
            <CoursesList OnChangeList={ticketCourseChanges} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageTickets;
