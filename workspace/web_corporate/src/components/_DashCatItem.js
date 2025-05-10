import React from 'react';
import {Box, Card, CardContent, Typography} from "@mui/material";

const _DashCatItem = ({icon,title}) => {
    return (
        <Card sx={{m:2,p:4,textAlign:"center",alignContent:"center",justifyItems:"center"}}>

            <Box sx={{width: 48, height: 48,mb:3}}>{icon}</Box>
            <Typography variant={"h6"}>
                {title}
            </Typography>
        </Card>
    );
};

export default _DashCatItem;
