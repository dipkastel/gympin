import React from 'react';
import Grid from '@mui/material/Grid2';
import {Card, Typography} from "@mui/material";

const _ExcitingTexts = () => {
    return (
        <section >
            <Grid container className={"excitingBlock"}
                  columns={3}
                  alignItems={"center"}
                  textAlign={"center"}
                  alignContent={"space-around"}>
                <Grid item size={{xs:3,sm:1}} data-aos="fade-left" data-aos-delay={100}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={3}>
                        <Typography component={"span"} variant={"subtitle2"}>
                            {"150 دقیقه فعالیت بدنی متوسط در هفته، می‌تواند در درمان افسردگی های خفیف تا متوسط، به اندازه دارو های ضد افسردگی تاثیرگذار باشد. "}
                        </Typography>
                        <Typography href={"https://gympin.ir/blog-detail/215150461/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A7%D8%AA-%D8%AC%D8%AF%DB%8C%D8%AF-%D9%88-%D8%AA%D8%A7%D8%AB%DB%8C%D8%B1-%D9%88%D8%B1%D8%B2%D8%B4-%D8%A8%D8%B1-%D8%A7%D9%81%D8%B3%D8%B1%D8%AF%DA%AF%DB%8C"} component={"a"} color={"primary"} variant={"subtitle2"}>
                            {"[ 1 ]"}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item size={{xs:3,sm:1}} data-aos="fade-left" data-aos-delay={200}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={3}>
                        <Typography component={"span"} variant={"subtitle2"}>
                            {"سرمایه‌گذاری سازمان‌ها روی سلامت کارمندان، بازگشت سرمایه را در بیش از یک شکل به همراه دارد و 90% سازمان‌ها نرخ مثبت بازگشت را گزارش کرده‌اند."}
                        </Typography>
                        <Typography href={"https://gympin.ir/blog-detail/240175584/%D8%B3%D9%87-%D8%AF%D9%84%DB%8C%D9%84-%D8%AF%D8%B1-%D8%A7%D8%AB%D8%A8%D8%A7%D8%AA-%D8%A7%DB%8C%D9%86%DA%A9%D9%87-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%B5%D8%B1%D9%81%D9%87-%D8%AC%D9%88%DB%8C%DB%8C-%D8%AF%D8%B1-%D9%87%D8%B2%DB%8C%D9%86%D9%87-%D9%87%D8%A7%D8%B3%D8%AA"} component={"a"} color={"primary"} variant={"subtitle2"}>
                            {" [_2_] "}
                        </Typography>

                    </Card>
                </Grid>
                <Grid item size={{xs:3,sm:1}} data-aos="fade-left" data-aos-delay={300}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={3}>
                        <Typography component={"span"} variant={"subtitle2"}>
                            {"در نظر گرفتن بودجه ورزشی از سمت سازمان، به کارمندان احساس ارزشمند بودن می‌دهد و باعث کاهش روزهای غیبت از کار و نرخ خروج از سازمان میشود."}
                        </Typography>
                        <Typography href={"https://gympin.ir/blog-detail/239115591/%D9%85%D8%B2%D8%A7%DB%8C%D8%A7%DB%8C-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%AA%D8%AE%D8%B5%D8%B5%DB%8C-%D8%A7%D9%81%D8%B2%D8%A7%DB%8C%D8%B4-%D8%B3%D9%88%D8%AF%D8%A2%D9%88%D8%B1%DB%8C-%D9%88-%D8%AD%D9%81%D8%B8-%DA%A9%D8%A7%D8%B1%DA%A9%D9%86%D8%A7%D9%86"} component={"a"} color={"primary"} variant={"subtitle2"}>
                            {" [_3_] "}
                        </Typography>

                    </Card>
                </Grid>

            </Grid>
        </section>
    );
};

export default _ExcitingTexts;
