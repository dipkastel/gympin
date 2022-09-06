import React from 'react';
import {Button, Card, CardContent, CardHeader, TextField} from "@mui/material";

const IncreaseGroupCredit = () => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardHeader
                title={"افزایش اعتبار به همه کاربران"}
                />
            <CardContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="creadit"
                    label="مقدار اعتبار"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <Button variant={"outlined"} sx={{margin:1}}>ثبت</Button>
            </CardContent>
        </Card>
    );
};

export default IncreaseGroupCredit;
