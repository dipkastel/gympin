import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RPopularSports = () => {
    return (
        <>
            <BaseReportBox title={"محبوب‌ترین رشته‌های ورزشی"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*محبوب‌ترین رشته‌های ورزشی: نمودار نشان‌دهنده پرطرفدارترین رشته‌های ورزشی بین کارکنان. (نمودار میله‌ای)*/}

        </>
    );
};

export default _RPopularSports;
