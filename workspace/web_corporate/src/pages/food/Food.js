import React from 'react';
import Grid from "@mui/material/Grid2";
import _RChargeUsage from "../report/Finance/_RChargeUsage";
import _DashCatItem from "../../components/_DashCatItem";
import _DashSlider from "../dashboard/_DashSlider";
import {Card, Typography} from "@mui/material";
import _FoodSelerItem from "../../components/_FoodSelerItem";
import _FoodSlider from "./_FoodSlider";

const Food = () => {
    return (
        <>

            <Grid container columns={12}>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <_FoodSlider />
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 6,lg:4}}>
                    <_FoodSelerItem
                        title={"فارسی"}
                        icon={<img width={100} alt="icon" src="/assets/logos/farsi.png" />}
                        averagePrice={260000}
                        minOrder={50}
                        orderFrom={7}
                    />
                </Grid>
                <Grid  size={{xs: 12, sm: 12, md: 6,lg:4}}>
                    <_FoodSelerItem
                        title={"کترینو"}
                        icon={<img width={100} alt="icon" src="/assets/logos/ketrino.png" />}
                        averagePrice={290000}
                        minOrder={20}
                        orderFrom={2}
                    />
                </Grid>
                <Grid  size={{xs: 12, sm: 12, md: 6,lg:4}}>
                    <_FoodSelerItem
                        title={"ناهار تایم"}
                        icon={<img width={100} alt="icon" src="/assets/logos/nahartime.png" />}
                        averagePrice={320000}
                        minOrder={30}
                        orderFrom={1}
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 12, md: 12 ,lg:12}}>
                    <Card elevation={10} sx={{m:2,p:3}}>
                        <Typography variant={"h3"} color={"info"} >
                            چرا غذای سازمانی؟
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem"}} variant={"body2"} color={"info"} >
                            سفارش غذا توسط سازمان برای پرسنل، سرمایه‌گذاری هوشمندانه‌ای است که دستاوردهای قابل توجهی برای سازمان به همراه دارد.
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem"}} variant={"body2"} color={"info"} >
                            این اقدام با ارائه وعده‌های غذایی سالم و به موقع، رضایت و انگیزه کارکنان را افزایش می‌دهد و با کاهش استرس و صرفه‌جویی در زمان، بهره‌وری آن‌ها را بهبود می‌بخشد.
                        </Typography>
                        <Typography sx={{mt:2,lineHeight:"1.4rem"}} variant={"body2"} color={"info"} >
                            همچنین، غذا خوردن مشترک، روحیه تیمی و همکاری را تقویت می‌کند که به نوآوری و عملکرد بهتر منجر می‌شود. در نتیجه، سازمان نه تنها کیفیت زندگی کاری پرسنل را ارتقا می‌دهد، بلکه با افزایش تعهد و کارایی آن‌ها، به اهداف بلندمدت خود سریع‌تر دست می‌یابد.
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default Food;
