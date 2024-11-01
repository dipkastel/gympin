import React from 'react';
import {Card, CardHeader} from "@mui/material";

const _ListItem = (props) => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000",bgcolor:props.bgColor}}
                href={props.destination}
                target={props.target}
                onClick={props.onClick}
                title={props.title}
                action={""}/>
        </Card>
    );
};


export default _ListItem;
