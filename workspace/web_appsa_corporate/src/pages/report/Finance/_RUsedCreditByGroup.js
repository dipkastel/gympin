import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RCreditByGroup = () => {
    return (
        <>
            <BaseReportBox title={"میزان اعتبار استفاده شده و باقی‌مانده (کل سازمان و به تفکیک گروه ها)"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*میزان اعتبار استفاده شده و باقی‌مانده (کل سازمان و به تفکیک بخش): نمودار مقایسه‌ای بین میزان اعتبار استفاده شده و باقی‌مانده برای کل سازمان و همچنین به تفکیک هر بخش یا واحد. (نمودار میله‌ای یا دایره‌ای)*/}

        </>
    );
};

export default _RCreditByGroup;
