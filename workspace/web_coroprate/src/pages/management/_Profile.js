import React from 'react';
import {Card, CardHeader} from "@mui/material";

const _Profile = () => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000"}}
                href={"/management/profile"}
                title={"پروفایل من"}
                action={""}/>
        </Card>
    );
};


export default _Profile;
