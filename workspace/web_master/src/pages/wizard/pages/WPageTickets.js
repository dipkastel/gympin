import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Sport from "../../sports/Sports";
import Personnel from "../../personnel/Personnel";
import About from "../../about/About";
import SubscribesList from "../../tickets/subscribe/SubscribesList";
import CoursesList from "../../tickets/course/CoursesList";

const WPageTickets = ({onNext,ticketSubscribeChanges,ticketCourseChanges}) => {

    const [introCanGoNext,setIntroCanGoNext] = useState(false);
    const [courses,setCourses] = useState(null);
    const [subscribes,setSubscribes] = useState(null);
    useEffect(() => {
        var ticketCount = (subscribes?.length||0)+(courses?.length||0)
        setIntroCanGoNext(ticketCount>0)
    }, [courses,subscribes]);

    function schanges(data){
        setSubscribes(data);
        ticketSubscribeChanges(data);
    }

    function cchanges(data){
        setCourses(data);
        ticketCourseChanges(data);
    }

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
                    تفاوت عضویت و کلاس در این است که برای کلاس باید زمان شروع و پایان مشخص، در نظر گرفته شود تا روند آموزشی کلاس طی شود اگر کلاسی داریم که پایان آنها به مدت مشخص از زمان ثبت نام میباشد مانند کلاس یوگا یک ماهه آن را به صورت عضویت وارد میکنیم.
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                کلاس مانند کلاس های درسی در هرجلسه موضوعی تدریس میشود و هر مرحله نیازمند شرکت در جلسات قبلی است مانند کلاس های آموزش داوری و..
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    در این بخش تنها نام یا عنوان فروشی وارد میشود و مشخصات کاملتر در مرحله های بعدی تکمیل میشود.
                    مثال عضویت :
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
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    مثال کلاس :
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    داوری کشتی
                </Typography>
                <Typography  sx={{width:"100%"}}  color={"#a2a2a2"} variant={"subtitle2"}>
                    مربیگری فوتبال
                </Typography>

            </Grid>
            <SubscribesList OnChangeList={schanges} />
            <CoursesList OnChangeList={cchanges} />
            <Grid sx={{p:2}}>
                <Button onClick={(e)=>onNext()} disabled={!introCanGoNext} fullWidth variant={"contained"} color={"primary"} >بعدی</Button>
            </Grid>
        </div>
    );
};

export default WPageTickets;
