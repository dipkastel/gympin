import React from 'react';
import {Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

const _TextBox = () => {
    return (
        <section  data-aos="fade-up">
            <Paper elevation={3} sx={{p:2,my:3,background:"#f0f0f0"}} >
                <Grid  sx={{p:2}} textAlign={"center"}>
                    <Typography variant={"subtitle1"} sx={{color:"#656565"}} >ما در جیم پین دو مانع بزرگ کارمندان در مسیر ورزش کردن را از سر راه برداشته ایم</Typography>
                    <Typography variant={"subtitle1"} sx={{color:"#656565"}} > مشکل فاصله‌ی مراکز ورزشی از
                        <b style={{color:"#000000"}}> محل زندگی کارمندان </b>
                        و مشکل
                        <b style={{color:"#000000"}}> تنوع ورزش‌ها </b>
                    </Typography>
                    <Typography variant={"subtitle1"} sx={{color:"#656565"}} > ما در حال حاضر با تعداد زیادی مجموعه ورزشی مشغول به همکاری هستیم که این تعداد  روزانه در حال افزایش است</Typography>
                </Grid>
            </Paper>
        </section>
    );
};

export default _TextBox;
