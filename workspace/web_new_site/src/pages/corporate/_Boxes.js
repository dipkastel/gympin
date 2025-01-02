import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Container, Typography} from "@mui/material";

const _Boxes = () => {
    function SingleBox({image, title, text, alt}) {
        return (<>
            <Grid item size={{md: 3, xs: 9}}>
                <Card sx={{m: "2vw", bgcolor: "#f5ede0", borderRadius: 4}} elevation={10}>
                    <Grid sx={{p: 3}} direction={"column"}>
                        <img width={"30%"} alt={alt} src={image}/>
                        <Typography variant={"subtitle1"} sx={{fontWeight: 600, mt: 1}}>{title}</Typography>
                        <Typography variant={"subtitle2"} sx={{fontWeight: 400, mt: 0, mb: 1, minHeight: 105}}>{text}</Typography>
                    </Grid>
                </Card>
            </Grid>

        </>)
    }

    return (
        <section>
            <Container>
                <Grid container columns={9} alignContent={"center"} textAlign={"center"}>
                    <SingleBox
                        text={"به مناسبت‌های خود رنگ و بوی سلامتی ببخشید! با هدیه‌ی ورزش یرای مناسبت‌ها، سلامتی را یه همکاران خود هدیه کنید."}
                        title={"ورزش برای مناسبت‌ها"} image={"/assets/images/growth1.svg"} alt={"تخفیفات متنوع و متغیر روزانه"}/>
                    <SingleBox
                        text={"آیا مرکز خاصی در ذهنتان دارید؟ صدای شما مهم است! با پیشنهادات خود، به ما کمک کنید تا بهترین مراکز را به لیست خدمات‌مان اضافه کنیم."}
                        title={"افزودن مراکز درخواستی"} image={"/assets/images/shoes.svg"} alt={" جیم پین به کارمندان کمک می‌کند تا ورزش‌های جدید را امتحان کرده"}/>
                    <SingleBox
                        text={"در جیم پین، پاسخگویی سریع ما به شما این اطمینان را می‌دهد که همیشه در مسیر درست قرار دارید! هیچ سؤالی بی‌پاسخ نخواهد ماند."}
                        title={"پاسخگویی و پشتیبانی سریع"} image={"/assets/images/protect.svg"} alt={"از خدمات ورزشی بهره‌مند شوید"}/>
                </Grid>
            </Container>
        </section>
    );

};

export default _Boxes;
