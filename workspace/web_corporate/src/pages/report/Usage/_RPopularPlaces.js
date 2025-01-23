import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RPopularPlaces = () => {
    return (
        <>
            <BaseReportBox title={"محبوب‌ترین مراکز ورزشی"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*محبوب‌ترین مراکز ورزشی: نمودار نشان‌دهنده پربازدیدترین و پرطرفدارترین مراکز ورزشی بین کارکنان. (نمودار میله‌ای)*/}

        </>
    );
};

export default _RPopularPlaces;
