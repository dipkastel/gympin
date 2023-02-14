import React from 'react';
import {Card, CardHeader, Typography} from "@mui/material";

const _ListItem = (props) => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000"}}
                href={props.destination}
                title={<Typography width={"100%"} variant={"body2"} noWrap={true} textAlign={"right"} component="div" sx={{
                    marginY:0.1
                }}>
                    {props.title}
                </Typography>}
                action={""}/>
        </Card>
    );
};


export default _ListItem;
