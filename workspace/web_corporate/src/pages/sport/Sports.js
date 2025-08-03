import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import {useNavigate} from "react-router";
import _NeedNewService from "../../components/_NeedNewService";

const Sports = () => {

    const navigate = useNavigate();


    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/sport2.jpg"},
                        {Image: "/assets/banners/sport1.jpg"},
                    ]}/>
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"جیم پین"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/sportIcon.png"}/>}
                        describe={"جیم پین پل ارتباطی مراکز ورزشی و سازمان ها. اعتبار دهی گروهی و شخصی به کارمندان برای استفاده از مجموعه‌های ورزشی در اپلیکیشن جیم پین."}
                        onClick={() => navigate("/sport/gympin")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"ورزش"} />
                </Grid>


                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            ورزش کارمندان
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem"}} variant={"body2"} color={"info"} >
                            ایجاد دسترسی به مراکز ورزشی با رشته‌های متنوع از طریق پلتفرم جیم پین، سرمایه‌گذاری هوشمندانه‌ای برای سلامت و انگیزه کارمندان است. این خدمات با فراهم کردن امکانات ورزشی در دسترس در هر نقطه از شهر، سلامت جسمی و روانی کارمندان را بهبود می‌دهند، استرس را کاهش داده و بهره‌وری و انرژی کارمندان را بالا می‌برند. با رزرو آسان مراکز ورزشی برای کارمندان، سازمان می‌تواند به‌ سادگی بودجه ی رفاهی سازمان را مدیریت کرده و از صرف وقت و انرژی برای جستجو، بستن قرارداد و پیگیری های بعدی، جلوگیری کند؛ همینطوربا افزایش رضایت و وفاداری کارمندان، برند کارفرمایی خود را تقویت کرده و به‌عنوان محیطی حامی و جذاب بین رقبا تثبیت کند، که به حفظ استعدادها و تقویت فرهنگ سازمانی کمک می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Sports;
