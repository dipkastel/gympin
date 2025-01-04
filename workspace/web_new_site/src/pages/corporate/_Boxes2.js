import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, Container, Typography} from "@mui/material";

const _Boxes2 = () => {
    function SingleBox({image, title, text, alt}) {
        return (<>
            <Grid  item size={{md: 3, xs: 9}}>
                <Card sx={{m:"2vw", bgcolor: "#f5ede0", borderRadius: 4}} elevation={10}>
                    <Grid sx={{p: 3}} direction={"column"}>
                        <img  width={"60%"} alt={alt} src={image}/>
                        <Typography variant={"h5"} sx={{fontWeight: 600, mt: 1}}>{title}</Typography>
                        <Typography variant={"subtitle2"} sx={{fontWeight: 400, mt: 2, mb: 1, minHeight: 105}}>{text}</Typography>
                    </Grid>
                </Card>
            </Grid>

        </>)
    }

    return (

        <section>
            <Container>
                <Grid container className={"box2"} columns={9} alignContent={"center"} textAlign={"center"}>
                    <SingleBox
                        text={"تخفیفات متنوع و متغیر روزانه استفاده از خدمات و ورزش‌های مختلف را برای همه پرسنل سازمان‌ها امکان‌پذیز کرده."}
                        title={"تخفیفات شگفت انگیز"} image={"/assets/images/strongman1.jpg"} alt={"تخفیفات شگفت انگیز"}/>
                    <SingleBox
                        text={"تنوع ورزشی بالا در جیم پین به کارمندان کمک می‌کند تا ورزش‌های جدید را امتحان کرده و ورزش مورد علاقه خود را پیدا کنند."}
                        title={"تنوع ورزشی بسیار زیاد"} image={"/assets/images/inhand1.jpg"} alt={"تنوع ورزشی بسیار زیاد"}/>
                    <SingleBox
                        text={"جیم پین به سازمان‌ها این امکان را می‌دهد که از خدمات ورزشی بهره‌مند شوند بدون اینکه هزینه اضافه‌ای  برای آن‌ها ایجاد شود."}
                        title={"بدون هزینه برای سازمان"} image={"/assets/images/savemoney1.jpg"} alt={"بدون هزینه برای سازمان"}/>
                </Grid>
            </Container>
        </section>
    );

};
export default _Boxes2;
