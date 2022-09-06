import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardHeader, TextField} from "@mui/material";

const CorporateDetail = () => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardHeader
                title="مشخصات سازمان"/>
            <CardContent  >
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="نام سازمان"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <Button variant={"outlined"} sx={{margin:1}}>ثبت</Button>
            </CardContent>

        </Card>
    );
};

export default CorporateDetail;
