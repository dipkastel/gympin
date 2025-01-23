import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _SumOfUserDiscounts = () => {
    return (<>
            <BaseReportBox title={"صرفه‌جویی مالی ناشی از تخفیف‌های جیم پین"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*میزان صرفه‌جویی مالی ناشی از تخفیف‌های جیم پین: نمودار نشان‌دهنده میزان صرفه‌جویی مالی سازمان به دلیل استفاده از تخفیف‌های ارائه شده توسط جیم پین. (نمودار میله‌ای یا خطی)*/}

        </>
    );
};

export default _SumOfUserDiscounts;
