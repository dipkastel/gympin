import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import BaseReportBox from "../BaseReportBox";

const _RChargeUsage = () => {
    return (<>
            <BaseReportBox title={"میزان استفاده از شارژ سازمان "} >
                <Typography sx={{color:"primary.boxBg"}} textAlign={"center"} variant={"h5"} >دیتای کافی وجود ندارد</Typography>
            </BaseReportBox>
    </>
    );
};

export default _RChargeUsage;
