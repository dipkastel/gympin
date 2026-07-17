import {JSX} from "react";

import {Card, Container, Grid, Typography,} from "@mui/material";

interface SingleBoxProps {
    image: string;
    title: string;
    text: string;
    alt: string;
}

function SingleBox({image, title, text, alt}: SingleBoxProps): JSX.Element {
    return (
        <Grid size={{md: 3, xs: 9}}>
            <Card
                elevation={10}
                sx={{
                    m: "2vw",
                    bgcolor: "#f5ede0",
                    borderRadius: 4,
                }}
            >
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                    }}
                >
                    <img
                        src={image}
                        alt={alt}
                        width="40%"
                    />

                    <Typography
                        component="h3"
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            mt: 1,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 400,
                            mt: 1,
                            mb: 1,
                            minHeight: 105,
                        }}
                    >
                        {text}
                    </Typography>
                </Grid>
            </Card>
        </Grid>
    );
}

export default function Boxes(): JSX.Element {
    return (
        <section>
            <Container
                sx={{
                    mb: 5,
                }}
            >
                <Grid
                    container
                    columns={9}
                    className="box"
                    sx={{
                        alignContent: "center",
                        textAlign: "center",
                    }}
                >
                    <SingleBox
                        text="به مناسبت‌های خود رنگ و بوی سلامتی ببخشید! با هدیه‌ی دادن دسترسی به خدمات ورزشی برای مناسبت‌ها، سلامتی را به همکاران خود هدیه کنید."
                        title="ورزش برای مناسبت‌ها"
                        image="/images/corporateGift.svg"
                        alt="تخفیفات متنوع و متغیر روزانه"
                    />

                    <SingleBox
                        text="جیم پین برای کارمندان این امکان را فراهم کرده تا با پیشنهاد دادن مجموعه ورزشی، در مرکز مورد علاقه خود از ورزش کردن لذت ببرند."
                        title="افزودن مراکز درخواستی"
                        image="/images/shoes.svg"
                        alt="جیم پین به کارمندان کمک می‌کند تا ورزش‌های جدید را امتحان کرده"
                    />

                    <SingleBox
                        text="جیم پین با تیم پشتیبانی سریع، همیشه آماده پاسخ دادن به نیازهای کاربران است. این خدمات، تجربه همکاری با جیم پین را برای شما، آسان و لذت‌بخش می‌کند."
                        title="پاسخگویی و پشتیبانی سریع"
                        image="/images/protect.svg"
                        alt="از خدمات ورزشی بهره‌مند شوید"
                    />
                </Grid>
            </Container>
        </section>
    );
}
