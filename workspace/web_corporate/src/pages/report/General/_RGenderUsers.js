import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RGenderUsers = () => {
    return (
        <>
            <BaseReportBox title={"توزیع جنسیتی کاربران"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>

            {/*توزیع جنسیتی کاربران: نمودار درصد استفاده از خدمات ورزشی بر اساس جنسیت (زن و مرد). (نمودار دایره‌ای یا میله‌ای)*/}
        </>
    );
};

export default _RGenderUsers;
