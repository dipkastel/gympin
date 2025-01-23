import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RActiveUsers = () => {
    return (<>

            <BaseReportBox title={"درصد کارکنان فعال"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*درصد کارکنان فعال: نمودار درصد کارکنانی که حداقل یک بار از خدمات ورزشی استفاده کرده‌اند نسبت به کل کارکنان ثبت‌نام شده. (نمودار دایره‌ای یا میله‌ای)*/}

        </>
    );
};

export default _RActiveUsers;
