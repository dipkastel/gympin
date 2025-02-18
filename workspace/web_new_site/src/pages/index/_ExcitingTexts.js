import React from 'react';
import Grid from '@mui/material/Grid2';
import {Card, Typography} from "@mui/material";

const _ExcitingTexts = () => {
    return (
        <section>
            <Grid container className={"excitingBlock"}
                  columns={3}
                  alignItems={"center"}
                  textAlign={"center"}
                  alignContent={"space-around"}>
                <Grid item size={{xs:3,sm:1}}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={0}>
                        <Typography component={"span"} variant={"subtitle2"}>
                            {"150 دقیقه فعالیت بدنی متوسط در هفته، می‌تواند هم اندازه داروهای ضدافسردگی تاثیر گذار باشد. "}
                        </Typography>
                        <Typography href={"https://gympin.ir/blog-detail/215150461/%D9%85%D8%B7%D8%A7%D9%84%D8%B9%D8%A7%D8%AA-%D8%AC%D8%AF%DB%8C%D8%AF-%D9%88-%D8%AA%D8%A7%D8%AB%DB%8C%D8%B1-%D9%88%D8%B1%D8%B2%D8%B4-%D8%A8%D8%B1-%D8%A7%D9%81%D8%B3%D8%B1%D8%AF%DA%AF%DB%8C"} component={"a"} color={"primary"} variant={"subtitle2"}>
                            {"[ 1 ]"}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item size={{xs:3,sm:1}}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={0}>
                        <Typography component={"span"} variant={"subtitle2"}>
                            توجه سازمان به سلامت ذهن و بدن کارمندان، اکنون بیشتر از هر زمان دیگری برای جذب و نگه‌داشت نیرو حیاتی‌ است.
                        </Typography>
                        {/*<Typography component={"span"} color={"primary"} variant={"subtitle2"}>*/}
                        {/*    {" [_2_] "}*/}
                        {/*</Typography>*/}

                    </Card>
                </Grid>
                <Grid item size={{xs:3,sm:1}}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={0}>
                        <Typography component={"span"} variant={"subtitle2"}>
                            در نظر گرفتن بودجه ورزشی از سمت سازمان، به کارمندان احساس ارزشمند بودن می‌دهد.
                        </Typography>
                        {/*<Typography component={"span"} color={"primary"} variant={"subtitle2"}>*/}
                        {/*    {" [_3_] "}*/}
                        {/*</Typography>*/}

                    </Card>
                </Grid>

            </Grid>
        </section>
    );
};

export default _ExcitingTexts;
