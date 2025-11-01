import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import {useNavigate} from "react-router";

const Event = () => {
    const navigate = useNavigate();
    return (
        <>
            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/ajil.jpg"},
                    ]}/>
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"آجیل و تنقلات"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/khoshbaro.png"}/>}
                        describe={"خرید آجیل و تنقلات سازمانی با کیفیت ممتاز و بسته‌بندی‌های شکیل، راهی ساده برای ایجاد نشاط، انرژی و لحظات دل‌پذیر در محیط کار است. انتخابی خوش‌طعم که نشان‌دهنده‌ی توجه سازمان به رفاه و رضایت کارکنان است."}
                        onClick={() => navigate("/EmployeeHampers/nuts")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"ارزاق"} />
                </Grid>
                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            سبد کالای سازمانی
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سبد کالای سازمانی نشان‌دهنده‌ی توجه واقعی شرکت به رفاه، آسایش و آرامش ذهنی کارکنان و خانواده‌های آنان است. این اقدام تنها یک مزیت مالی یا امتیاز شغلی ساده نیست، بلکه پیامی صمیمانه از سوی سازمان است مبنی بر اینکه سلامت و کیفیت زندگی نیروهایش، حتی خارج از محیط کار، برای او ارزش و اهمیت دارد.
                            سازمانی که چنین رفاهیاتی را در نظر میگیرد، در واقع به کارمندانش یادآوری می‌کند که تلاش‌ها و تعهدشان دیده می‌شود و قدردانی از آن صرفاً به ساعات کاری محدود نیست.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Event;
