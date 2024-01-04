import React from 'react';
import {Card, CardHeader, Typography} from "@mui/material";

const _ListItem = ({destination,title,onClick}) => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000"}}
                href={destination}
                onClick={onClick}
                title={<Typography width={"100%"} variant={"body2"} noWrap={true} textAlign={"right"} component="div" sx={{
                    marginY:0.1
                }}>
                    {title}
                </Typography>}
                action={""}/>
        </Card>
    );
};


export default _ListItem;
