import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RPeakUsageTimes = () => {
    return (
        <>
            <BaseReportBox title={"زمان‌های اوج استفاده از خدمات"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>

            {/*زمان‌های اوج استفاده از خدمات (روزهای هفته/ساعات روز): نمودار نشان‌دهنده زمان‌هایی که بیشترین و کمترین استفاده از خدمات ورزشی توسط کارکنان انجام می‌شود. (نمودار خطی یا heatmap)*/}

        </>
    );
};

export default _RPeakUsageTimes;
