import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RUsageByUser = () => {
    return (
        <>
            <BaseReportBox title={"میانگین دفعات استفاده از خدمات ورزشی توسط هر کارمند (ماهانه/فصلی)"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*میانگین دفعات استفاده از خدمات ورزشی توسط هر کارمند (ماهانه/فصلی): نمودار میانگین تعداد دفعاتی که هر کارمند در یک بازه زمانی مشخص از خدمات ورزشی استفاده کرده است. (نمودار میله‌ای یا خطی)*/}

        </>
    );
};

export default _RUsageByUser;
