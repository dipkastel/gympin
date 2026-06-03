import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RTicketBySport = () => {
    return (
        <>
            <BaseReportBox title={"تعداد رزروها بر اساس نوع ورزش"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*تعداد رزروها بر اساس نوع ورزش: نمودار تعداد رزروهای انجام شده برای هر رشته ورزشی. (نمودار میله‌ای)*/}

        </>
    );
};

export default _RTicketBySport;
