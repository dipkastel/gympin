import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import {CateringStatus} from "../../helper/enums/CateringStatus";

const Event = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/gamem.jpg"},
                    ]}/>
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"نرمش سازمانی"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/sportIcon.png"}/>}
                        describe={"در زمان قطعی برق در سازمان خود، با مربیان جیم‌پین ورزش کنید! در زمان های خاموشی شرکت، می‌توانید با نرمش‌های گروهی و ساده، بدن خود را فعال نگه دارید."}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"رویداد"} />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            برگزاری رویداد، مراسم و مناسبت ها
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            برگزاری رویدادها، مراسم‌ها و مناسبت‌های مختلف توسط سازمان، سرمایه‌گذاری هوشمندانه‌ای برای تقویت روحیه و همبستگی بین کارمندان است. این برنامه‌ها با ایجاد فضایی صمیمی و انگیزشی، همکاری تیمی را بهبود می‌بخشند، استرس را کاهش می‌دهند و حس قدردانی و وفاداری را در پرسنل تقویت می‌کنند؛ در نتیجه، سازمان نه تنها بهره‌وری و خلاقیت کارمندان را افزایش می‌دهد، بلکه با ترویج فرهنگ مثبت و خوشایند، برند کارفرمایی خود را تقویت کرده و سازمان را به محیطی ایده‌آل برای جذب و حفظ استعدادها تبدیل می کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Event;
