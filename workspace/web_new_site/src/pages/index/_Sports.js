import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardContent, CardHeader, Container, Typography} from "@mui/material";

const _Sports = () => {
    function SportItem({title,alt,image,text,size}) {
        return (
            <Grid size={size} justifyItems={"center"}>
                <Card className={"sportCard"} elevation={14} sx={{backgroundImage:image}} >
                    <img className={"bgImage"} alt={alt} src={image}/>
                    <div className={"overlay"}>
                        <Grid container columns={12}>
                            <Grid sx={{pt:2}} textAlign={"center"} size={2}>
                                <img className={"shape"} src={"/assets/images/shape3.svg"}/>
                            </Grid>
                            <Grid size={10} direction={"row"}>
                                <Grid> <Typography className={"title"} >{title}</Typography></Grid>
                                <Grid> <Typography className={"description"} >{text}</Typography></Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </Grid>
        );
    }

    return (
        <section>
            <Container>
                <Grid sx={{mb: 8,mt:12}} container columns={6}  >
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/estakhr.jpg"} alt={"ورزش‌های آبی که برای کارمندان ایجاد نشاط می‌کند"} title={"ورزش‌های آبی"} text={"قدرت و شادابی را در دل آب پیدا کنید! با ورزش‌های آبی، تغییرات مثبت را در بدن و ذهن خود تجربه کنید و توانایی های خود را افزایش دهید."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/bodybuilding.jpg"} alt={"ورزش‌هایی که برای عموم مردم جذاب است"} title={"باشگاه‌های بدنسازی"} text={"هر بار که به باشگاه می‌آیید، یک قدم به هدف‌های خود نزدیک‌تر می‌شوید! هر تمرین فرصتی برای ایجاد تغییر و تحول است."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/shamshir.jpg"} alt={"پدل برد ورزش مورد علاقه مدیران"} title={"ورزش‌های رزمی"} text={"آماده‌اید تا مرزهای خود را بشکنید؟ با ورزش‌های رزمی، هر جلسه تمرین فرصتی برای ارتقاء مهارت‌ها و تقویت روحیه‌تان است."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/zorkhane.jpg"} alt={"از زورخانه تا پارکور، آرامش تا هیجان"} title={"ورزش‌های برگزیده"} text={"هر ورزشی که انتخاب کنید، فرصتی برای کشف قدرت‌های نهفته شماست! بیایید با هم به سمت موفقیت‌های بزرگ‌تر حرکت کنیم."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/padel.jpg"} alt={"تفریحاتی برای ایجاد انرژی و انگیزه"} title={"ورزش‌های تفریحی"} text={"ورزش را به یک ماجراجویی تبدیل کنید! با فعالیت‌های تفریحی، استرس را کنار بگذارید و از هر لحظه لذت ببرید."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/spa.jpg"} alt={"آرامش و حس خوب برای کارمندان"} title={"ماساژ و اسپا"} text={"با خدمات اسپا و ماساژ، به بدن و ذهن خود یک هدیه ویژه بدهید! احساس آرامش و تازگی را با هر لمس تجربه کنید."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/analiz-badan.jpg"} alt={"آنالیز بدن "} title={"آنالیز بدن"} text={"از بدن خود اطلاعات بیشتری به دست بیاورید و با ورزش مناسب از بیماری‌ها جلوگیری کنید."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/harakate-eslahi.jpg"} alt={"حرکات اصلاحی "} title={"حرکات اصلاحی"} text={"عموما کارمندان پشت میز نشین دچار گرفتگی های عضلانی و بیماری های مفصلی می شوند که بهترین درمان برای آنان حرکات اصلاحی است."}/>
                    <SportItem size={{xs: 3, sm: 3, md: 2,xl:2}} image={"/assets/images/toopi.jpg"} alt={"ورزش‌های گروهی و تیمی"} title={"ورزش‌های گروهی"} text={"با ورزش های گروهی احساس تعامل و همکاری در گروه‌ها بیشتر شده و در کارهای گروهی موفقیت بیشتری به دست می‌آورند."}/>
                </Grid>
            </Container>
        </section>
    );
};

export default _Sports;
