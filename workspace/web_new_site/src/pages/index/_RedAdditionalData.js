import React from 'react';
import Grid from "@mui/material/Grid2";
import {Card, CardContent, Typography} from "@mui/material";

const _RedAdditionalData = () => {
    return (
        <section>
            <div className={"allCompanies ltr"}>
                <Grid container alignItems={"center"} justifyContent={"center"} alignContent={"center"} textAlign={"center"} columns={7}>
                    <Grid size={{xs:7,sm:3}}>
                        <img alt={"رفاهی ورزشی"} width={"100%"} src={"/assets/images/bgex.jpg"}/>
                    </Grid>
                    <Grid size={{xs:7,sm:4}}>
                        <Card className={"additionalCard rtl"} elevation={0} sx={{m:4,borderRadius:10,p:3}} >
                            <CardContent>
                                <Typography sx={{fontWeight:600}} variant={"h4"}>بدون محدودیت در اندازه سازمان یا شرکت</Typography>
                                <Typography sx={{mt:3,textAlign:"justify"}} variant={"subtitle1"}>جیم پین این فرصت را فراهم کرده تا سازمان‌ها با هر تعداد پرسنل، بتوانند خدمات رفاهی خود را به شکلی نوین مدیریت کرده و برای کارکنان خود دسترسی به خدمات ورزشی ایجاد کنند.</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </section>
    );
};

export default _RedAdditionalData;
