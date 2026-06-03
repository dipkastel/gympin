import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RAverageOfUserTickets = () => {
    return (<>
            <BaseReportBox title={"هزینه متوسط هر کاربر برای خدمات ورزشی"} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
            {/*هزینه متوسط هر کاربر برای خدمات ورزشی: محاسبه و نمایش میانگین هزینه‌ای که هر کاربر برای استفاده از خدمات ورزشی صرف کرده است.*/}

        </>
    );
};

export default _RAverageOfUserTickets;
