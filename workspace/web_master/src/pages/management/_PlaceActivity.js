import React from 'react';
import {Card, CardHeader, Switch} from "@mui/material";

const _ListItem = (props) => {
    return (
        <Card elevation={3} sx={{margin: 1}} >
            <CardHeader
                component={"a"}
                sx={{textDecoration:"none",color:"#000000"}}
                href={props.destination}
                title={"وضعیت مرکز"}
                action={(<>
                فعال
                    <Switch  defaultChecked />
                </>)}/>
        </Card>
    );
};


export default _ListItem;
