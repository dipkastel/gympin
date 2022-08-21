import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    InputAdornment,
    Switch,
    TextField
} from "@mui/material";

const _UserPlanDetail = () => {
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"جزئیات پلن کاربر"}
            />
            <CardContent>
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="name"
                        type="text"
                        label={"نام کاربر"}
                        defaultValue="ابراهیم گلستان"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="plan"
                        type="text"
                        label={"پلن"}
                        defaultValue="12 جلسه"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="plan"
                        type="text"
                        label={"تاریخ پرداخت"}
                        defaultValue={new Date().toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="plan"
                        type="text"
                        label={"تاریخ انقضای پلن"}
                        defaultValue={new Date().toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="plan"
                        type="text"
                        label={"پرداختی"}
                        defaultValue="700000"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="plan"
                        type="text"
                        label={"جلسات مانده"}
                        defaultValue="10"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
            </CardContent>
        </Card>
    );
};

export default _UserPlanDetail;
