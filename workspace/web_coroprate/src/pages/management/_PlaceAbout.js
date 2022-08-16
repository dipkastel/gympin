import React from 'react';
import {
    Avatar,
    Card,
    CardContent, CardHeader,
    Divider,
    List,
    ListItem, ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Pagination, Typography
} from "@mui/material";

import {toAbsoluteUrl} from "../../helper/utils";

const _PlaceAbout = () => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000"}}
                href={"/management/about"}
                title={"درباره مرکز"}
                action={""}/>
        </Card>
    );
};

export default _PlaceAbout;