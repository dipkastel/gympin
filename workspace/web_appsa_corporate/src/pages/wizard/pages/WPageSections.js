import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";

const WPageSections = ({onNext}) => {
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="جیم پین چیه؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}>
                            جیم پین یک پلتفرم نوین برای ارتباط بین شرکت ها و مراکز ورزشی است که به طور خاص، به منظور مدیریت خدمات ورزشی و
                            سلامت کارکنان در سازمان ها و شرکت ها طراحی شده است.
                        </Typography>
                        <Typography variant={"subtitle1"}>
                            ما در جیم پین به فروش خدمات و رزرو مراکز ورزشی به صورت آنلاین برای پرسنل شرکت ها و سازمان ها می‌پردازیم.
                        </Typography>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="چطور کار می کنه؟"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> ------------ </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="----"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> ------------ </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>

                <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                    <CardHeader sx={{
                        backgroundColor: "primary.main", color: "#fff"
                    }} title="----"/>
                    <CardContent>
                        <Typography variant={"subtitle1"}> ------------ </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item sx={{p:2}} xs={12} md={12}>
                <Button fullWidth variant={"contained"} onClick={(e)=>onNext()} > مرحله بعد </Button>
            </Grid>
        </Grid>
    );
};

export default WPageSections;
