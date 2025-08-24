import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Container, Typography} from "@mui/material";

const _Boxes = () => {
    function SingleBox({image, title, text, alt,dataAos}) {
        return (<>
            <Grid item size={{md: 3, xs: 9}}
                  data-aos={dataAos}>
                <Card sx={{m: "2vw", bgcolor: "#f5ede0", borderRadius: 4}} elevation={10}>
                    <Grid sx={{p: 3}} direction={"column"}>
                        <img width={"40%"} alt={alt} src={image}/>
                        <Typography variant={"subtitle1"} sx={{fontWeight: 600, mt: 1}}>{title}</Typography>
                        <Typography variant={"subtitle2"} sx={{fontWeight: 400, mt: 1, mb: 1, minHeight: 105}}>{text}</Typography>
                    </Grid>
                </Card>
            </Grid>

        </>)
    }

    return (
        <section >
            <Container sx={{mb:5}}>
                <Grid className={"box"} container columns={9} alignContent={"center"} textAlign={"center"}>
                    <SingleBox
                        dataAos="fade-left"
                        text={"به مناسبت‌های خود رنگ و بوی سلامتی ببخشید! با هدیه‌ی ورزش برای مناسبت‌ها، سلامتی را به همکاران خود هدیه کنید."}
                        title={"ورزش برای مناسبت‌ها"} image={"/assets/images/corporateGift.svg"} alt={"تخفیفات متنوع و متغیر روزانه"}/>
                    <SingleBox
                        dataAos="fade-up"
                        text={"جیم پین برای کارمندان این امکان را فراهم کرده تا با پیشنهاد مجموعه ورزشی، در مرکز مورد علاقه خود از ورزش کردن لذت ببرند."}
                        title={"افزودن مراکز درخواستی"} image={"/assets/images/shoes.svg"} alt={" جیم پین به کارمندان کمک می‌کند تا ورزش‌های جدید را امتحان کرده"}/>
                    <SingleBox
                        dataAos="fade-right"
                        text={"جیم پین با تیم پشتیبانی سریع، همیشه آماده پاسخ به نیازهای کاربران است. این خدمات، تجربه ورزشی شما را آسان و لذت‌بخش می‌کند."}
                        title={"پاسخگویی و پشتیبانی سریع"} image={"/assets/images/protect.svg"} alt={"از خدمات ورزشی بهره‌مند شوید"}/>
                </Grid>
            </Container>
        </section>
    );

};

export default _Boxes;
