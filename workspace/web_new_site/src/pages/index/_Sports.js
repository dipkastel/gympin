import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardContent, CardHeader, Container} from "@mui/material";

const _Sports = () => {
    function SportItem({title,alt,image}) {
        return (
            <Grid size={{xs: 3, sm: 3, md: 2}}>
                <Card className={"sportCard"} elevation={14} >
                    <CardHeader sx={{p: 1.5}} className={"sportCardHeader"} title={title} titleTypographyProps={{variant: "body2"}}/>
                    <img  alt={alt} src={image}/>
                </Card>
            </Grid>
        );
    }

    return (
        <section>
            <Container>
                <Grid sx={{mb: 8,mt:12}} container columns={6}>
                    <SportItem image={"/assets/images/estakhr.jpg"} alt={"ورزش های آبی که برای کارمندان ایجاد نشاط می کند"} title={"ورزش های آبی"}/>
                    <SportItem image={"/assets/images/bodybuilding.jpg"} alt={"ورزش هایی که برای عموم مردم جذاب است"} title={"باشگاه های بدنسازی"}/>
                    <SportItem image={"/assets/images/shamshir.jpg"} alt={"پدل برد ورزش مورد علاقه مدیران"} title={"ورزش های رزمی"}/>
                    <SportItem image={"/assets/images/zorkhane.jpg"} alt={"از زورخانه تا پارکور ، آرامش تا هیجان"} title={"ورزش های برگزیده"}/>
                    <SportItem image={"/assets/images/padel.jpg"} alt={"تفریحاتی برای ایجاد انرژی و انگیزه"} title={"ورزش های تفریحی"}/>
                    <SportItem image={"/assets/images/spa.jpg"} alt={"آرامش و حس خوب برای کارمندان"} title={"ماساژ و اسپا"}/>
                </Grid>
            </Container>
        </section>
    );
};

export default _Sports;
