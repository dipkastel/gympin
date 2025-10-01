import React from 'react';
import MainPageList from "./MainPageList";
import Notice from "../../partials/content/Notice";
import {Button, Card, CardContent, CardHeader, Grid} from "@mui/material";

const MainPageManagement = () => {
    return (
        <div>
            <Notice icon="flaticon-warning kt-font-primary">
                <p>صفحه جیم پین در اپلیکیشن موبایل از طریق این قسمت چیدمان می شود</p>
                <p>
                    میتوان از ویجت های قراردادی برای ساخت صفحه اصلی اپلیکیشن موبایل
                    استفاده کرد که در این قسمت آنها را مدیریت میکنیم
                </p>

            </Notice>

            <Grid container sx={{mb: 3}} spacing={3}>
                <Grid item size={{xs:12,md:4}}>
                    <Card>
                        <CardHeader title={"مدیریت المان های لیست"} color={"primary"}/>
                        <CardContent className={"kt-space-between"}>
                            مدیریت المان ها
                            <Button
                                variant="contained"
                                color="secondary"
                                href="/homePage/types"
                                sx={{marginRight: "auto"}}
                                size="large"
                            >
                                مدیریت
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <MainPageList/>

        </div>
    );
};

export default MainPageManagement;
