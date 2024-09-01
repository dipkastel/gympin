import React from 'react';
import {Button, Card, CardContent, CardHeader} from "@mui/material";

const _DashItem = ({itemText,href,title,buttonText}) => {
    return (
        <>
            <Card>
                <CardHeader title={title} color={"primary"}/>
                <CardContent className={"kt-space-between"}>
                    {itemText}
                    <Button
                        variant="contained"
                        color="secondary"
                        href={href}
                        sx={{marginRight: "auto"}}
                        size="large"
                    >
                        {buttonText}
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default _DashItem;
