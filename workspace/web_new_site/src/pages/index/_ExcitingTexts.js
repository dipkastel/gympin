import React from 'react';
import Grid from '@mui/material/Grid2';
import {Card, Typography} from "@mui/material";

const _ExcitingTexts = () => {
    return (
        <section>
            <Grid container className={"excitingBlock"}
                  columns={3}
                  sx={{mt:3}}
                  alignItems={"center"}
                  textAlign={"center"}
                  alignContent={"space-around"}>
                <Grid item size={{xs:3,sm:1}}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={0}>
                        <Typography variant={"subtitle2"}>
                            ۶۲% از کارفرمایان کاهش قابل توجهی در هزینه‌های درمانی را با اجرای ورزش کارکنان
                            تجربه کرده‌اند </Typography>
                    </Card>
                </Grid>
                <Grid item size={{xs:3,sm:1}}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={0}>
                        <Typography variant={"subtitle2"}>هر هزارتومانی که برای سلامتی هزینه می شود دوهزارتومان بازگشت سرمایه به همراه خواهد داشت</Typography>
                    </Card>
                </Grid>
                <Grid item size={{xs:3,sm:1}}>
                    <Card className={"text"} sx={{mx: 3,my: 5, p: 2, bgcolor: "#eae8e9", borderRadius: 3}} elevation={0}>
                        <Typography variant={"subtitle2"}>سواد کم سلامتی، عامل ۴۲% از بیماری های جسمی و روحی است که به صورت روزمره با آنها درگیر هستیم</Typography>
                    </Card>
                </Grid>
            </Grid>
        </section>
    );
};

export default _ExcitingTexts;
