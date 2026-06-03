import React from 'react';
import Grid from "@mui/material/Grid2";
import _InSectionSlider from "../../components/_InSectionSlider";
import {Card, Typography} from "@mui/material";
import _NeedNewService from "../../components/_NeedNewService";
import _MercheantSelerItem from "../../components/_MercheantSelerItem";
import {useNavigate} from "react-router";
import _InCoGames from "./InCoGames/_InCoGames";

const Learn = () => {

    const navigate = useNavigate();

    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_InSectionSlider sliders={[
                        {Image: "/assets/banners/yadgiri-dash.jpg"},
                        {Image: "/assets/banners/gamem.jpg"},
                    ]}/>
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_MercheantSelerItem
                        title={"تئاتر آموزش"}
                        icon={<img width={100} alt="icon" src={"/assets/images/btn/learnteather.png"}/>}
                        describe={"بسته‌ی کارگاه‌های خلاق سازمانی، مجموعه‌ای از کارگاه‌های تعاملی بر پایه‌ی تئاتر و ادبیات است که با رویکرد تجربه و بازی، به تقویت ارتباط، تمرکز، همدلی و خلاقیت تیم‌ها کمک می‌کند."}
                        onClick={() => navigate("/learn/theaterAndLearn")}
                        status={"ACTIVE"}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_InCoGames />
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}}>
                    <_NeedNewService category={"آموزش"} />
                </Grid>




                <Grid sx={{mb:8}} size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            آموزش و توسعه
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem",textAlign:"justify"}} variant={"body2"} color={"info"} >
                            سفارش خدمات آموزش و توسعه جیم پین، شامل دوره‌های حضوری، آنلاین و آموزش‌های گروهی و سازمانی، سرمایه‌گذاری هوشمندانه‌ای برای رشد کارمندان و سازمان است. این خدمات با ارتقای مهارت‌های حرفه‌ای و افزایش بهره‌وری، عملکرد سازمان را بهبود می‌دهند و همزمان رضایت و وفاداری کارمندان را بالا می‌برند. با رزرو آسان و هزینه‌های بهینه از طریق پلتفرم جیم پین، سازمان نه تنها تیمی توانمند و آماده برای چالش‌های جدید می‌سازد، بلکه برند کارفرمایی خودش رو به‌عنوان محیطی حرفه ای، پویا و حامی رشد تثبیت می‌کند.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Learn;
