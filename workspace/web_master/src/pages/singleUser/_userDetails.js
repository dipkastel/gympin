import React, {useState} from 'react';
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import {format} from "date-fns";

const _userDetails = ({user}) => {

    const [nationalCode, SetNationalCode] = useState(false)
    const [birthDay, SetBirthDay] = useState(false)
    const [phoneNumber, SetPhoneNumber] = useState(false)
    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={user.Username}
            />
            <CardContent>
                <Avatar
                    sx={{width: 120, height: 120}}
                    alt="Remy Sharp"
                    src={user.Avatar?.Url}/>
                <Grid container direction="row" justifyContent={"space-around"} sx={{marginY: 2}}>
                    نام :
                    <Typography
                        sx={{display: "inline"}}
                        component="p"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.FullName}
                    </Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-around" sx={{marginY: 2}}>
                    کدملی :
                    <Typography
                        sx={{display: "inline"}}
                        className={!nationalCode && "blur"}
                        component="p"
                        variant="h6"
                        color="text.primary"
                        onClick={() => SetNationalCode(true)}
                    >
                        {user.NationalCode}
                    </Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-around" sx={{marginY: 2}}>
                    تاریخ تولد :
                    <Typography
                        sx={{display: "inline"}}
                        className={!birthDay && "blur"}
                        component="p"
                        variant="h6"
                        color="text.primary"
                        onClick={() => SetBirthDay(true)}
                    >
                        {new Date(user.Birthday).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-around" sx={{marginY: 2}}>
                    شماره همراه :
                    <Typography
                        sx={{display: "inline"}}
                        className={!phoneNumber && "blur"}
                        component="p"
                        variant="h6"
                        color="text.primary"
                        onClick={() => SetPhoneNumber(true)}
                    >
                        {user.PhoneNumber}
                    </Typography>
                </Grid>

            </CardContent>
        </Card>
    );
};

export default _userDetails;
