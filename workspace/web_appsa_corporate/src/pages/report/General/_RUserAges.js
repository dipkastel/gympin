import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const MyComponent = () => {
    return (<>
            <BaseReportBox title={"توزیع سنی کاربران"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*توزیع سنی کاربران: نمودار درصد استفاده از خدمات ورزشی در گروه‌های سنی مختلف (مثلاً زیر ۲۵ سال، ۲۵ تا ۳۵ سال، ۳۵ تا ۴۵ سال و غیره). (نمودار میله‌ای)*/}

        </>
    );
};

export default MyComponent;
