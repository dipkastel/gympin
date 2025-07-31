import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import _NeedNewService from "../../components/_NeedNewService";
import {Card, Typography} from "@mui/material";

const Employment = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/gamem.jpg"},
                    ]}/>
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"استخدام"} />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            استخدام
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            جذب و استخدام نیروی انسانی از اهمیت بسزایی برای سازمان‌ها برخوردار است، زیرا انتخاب افراد مناسب با مهارت‌ها، ارزش‌ها و فرهنگ سازمانی، مستقیماً بر بهره‌وری، نوآوری و موفقیت بلندمدت سازمان تأثیر می‌گذارد. استخدام افراد شایسته نه‌تنها عملکرد تیم‌ها را بهبود می‌بخشد، بلکه به تقویت فرهنگ سازمانی، افزایش انگیزه کارکنان و کاهش نرخ ترک کار کمک می‌کند. همچنین، یک فرآیند جذب مؤثر می‌تواند تصویر مثبتی از برند سازمان ایجاد کرده و استعدادهای برتر را به خود جلب نماید، که در نهایت به مزیت رقابتی سازمان در بازار منجر می‌شود.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Employment;
