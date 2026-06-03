import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RCorporateTicketLocations = () => {
    return (<>
            <BaseReportBox title={"توزیع جغرافیایی کاربران"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*توزیع جغرافیایی کاربران (بر اساس محل سکونت یا کار): نمودار نشان‌دهنده پراکندگی جغرافیایی کاربرانی که از خدمات ورزشی استفاده می‌کنند. (نقشه یا نمودار میله‌ای بر اساس مناطق)*/}

        </>
    );
};

export default _RCorporateTicketLocations;
