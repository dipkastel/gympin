import React from 'react';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

const BaseReportBox = (props) => {
    return (
        <div>
            <Card elevation={5} sx={{m:2}} >
                <CardHeader sx={{backgroundColor:"primary.boxBg"}}  title={<Typography variant={"body2"}>{props.title}</Typography>} />
                <CardContent sx={{minHeight:240,alignContent:"center"}}>
                    {props.children}
                </CardContent>
            </Card>
        </div>
    );
};

export default BaseReportBox;
