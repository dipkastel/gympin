import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RCreditByGroup = () => {
    return (<>
            <BaseReportBox title={"میزان اعتبار تخصیص داده شده به هر گروه"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*میزان اعتبار تخصیص داده شده به هر بخش/واحد: نمودار نشان‌دهنده میزان اعتباری که به هر بخش یا واحد سازمانی برای استفاده از خدمات ورزشی اختصاص داده شده است. (نمودار میله‌ای)*/}

        </>
    );
};

export default _RCreditByGroup;
