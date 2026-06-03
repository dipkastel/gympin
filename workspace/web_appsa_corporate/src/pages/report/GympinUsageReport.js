import React from 'react';
import {Typography} from "@mui/material";
import BaseReportBox from "./BaseReportBox";

const GympinUsageReport = () => {
    return (

        <BaseReportBox title={"میانگین دفعات استفاده از خدمات ورزشی توسط هر کارمند (ماهانه/فصلی)"}>
            <Typography sx={{color: "primary.boxBg"}} textAlign={"center"} variant={"h5"}>دیتای کافی وجود ندارد</Typography>
        </BaseReportBox>
    );
};

export default GympinUsageReport;
