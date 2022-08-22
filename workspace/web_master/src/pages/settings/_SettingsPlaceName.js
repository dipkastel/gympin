import React from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";

const _SettingsPlaceName = () => {
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"نام مجموعه"}
                action={(<>
                    <Button variant={"outlined"}>ثبت</Button>
                </>)}
            />
            <CardContent>
                <TextField
                    id="outlined-message"
                    className="w-100"
                    aria-multiline
                    variant="outlined"
                    margin="normal"
                    name="message"
                    type="text"
                    defaultValue={"مجموعه ورزشی بهروز"}
                    label={"نام مجموعه"}
                    multiline
                />
            </CardContent>
        </Card>
    );
};

export default _SettingsPlaceName;
