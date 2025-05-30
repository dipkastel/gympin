import React, {useState} from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import _ProInvoice from "./_ProInvoice";
import _FoodSelectDate from "./_FoodSelectDate";
import _FoodMenu from "./_FoodMenu";
import {useParams} from "react-router-dom";

const FoodDetails = () => {

    let {cateringId} = useParams();
    const [selectedDate,setSelectedDate] = useState(false);
    const [order,setOrder] = useState({});

    return (
        <>
            <Grid columns={120} container>
                <Grid sx={{p: 1}} size={{xs: 90, sm: 96, md: 102, lg: 104, xl: 108}}>
                    <Card><CardContent sx={{p:2}}>
                        <Typography variant={"h4"}>فارسی در یک نگاه</Typography>
                        <Typography sx={{mt:2,lineHeight:1.9}} variant={"body1"}>شاد روان حاج محمدعلی فارسی بنیان گذار تهیه غذای فارسی در سال ١٣٤٤ در سایه الطاف الهی پذیرایی زائران سرزمین وحی را به عهده گرفت و پس از گذشت بیست سال مدیریت گروه حج ، در سال 1364 فعالیت خود را در تالارداری و خدمات مجالس شروع کرد و با توجه به رضایت و استقبال روز افزون مشتریان عزیز توانست روز به روز بر کیفیت کار خود بیفزاید. و در طی این سالها، انتقادات و پیشنهادهای سازنده مشتریان را سرلوحه کار خود قرار دادیم.</Typography>
                    </CardContent></Card>
                </Grid>
                <Grid sx={{p:1,alignContent:"top"}} size={{xs: 30, sm: 24, md: 18, lg: 16, xl: 12}}>
                    <Button sx={{my:1}} variant={"contained"} fullWidth size={"small"} >تاریخچه و پیگیری</Button>
                        <_ProInvoice order={order} setOrders={setOrder} />
                </Grid>
                <Grid size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}} >
                    <_FoodSelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} catering={cateringId} />
                </Grid>
                <Grid size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}} >
                    {selectedDate&&<_FoodMenu selectedDate={selectedDate} catering={cateringId}/>}
                </Grid>

            </Grid>
        </>
    );
};

export default FoodDetails;
