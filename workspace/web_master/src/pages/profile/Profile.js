import React, {useState} from 'react';
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
let user = {
    userId: 1,
    gateName: "ورودی بدنسازی",
    sportName: "بدنسازی",
    image: "/assets/images/2.jpg",
    userName: "ابراهیم گلستان",
    nationalCode: "0020596891",
    birthday: "1360/05/07",
    phoneNumber: "09126548595",
    birthLocation: "تهران",
    fathersName: "حمید",

}

const Profile = (props) => {
    const [nationalCode, SetNationalCode] = useState(false)
    const [birthDay, SetBirthDay] = useState(false)
    const [fatherName, SetFatherName] = useState(false)
    const [birthLocation, SetBirthLocation] = useState(false)
    const [phoneNumber, SetPhoneNumber] = useState(false)

    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={user.userName}
            />
            <CardContent>
                <Avatar
                    sx={{width: 120, height: 120}}
                    alt="Remy Sharp"
                    src={toAbsoluteUrl(user.image)}/>
                <Grid container direction="row" justifyContent="space-between" sx={{marginY: 2}}>
                    کدملی :
                    <Typography
                        sx={{display: "inline"}}
                        className={!nationalCode && "blur"}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.nationalCode}
                    </Typography>
                    <Button size={"small"} variant={"contained"} onClick={() => SetNationalCode(true)}> دریافت
                        اطلاعات</Button>
                </Grid>
                <Grid container direction="row" justifyContent="space-between" sx={{marginY: 2}}>
                    تاریخ تولد :
                    <Typography
                        sx={{display: "inline"}}
                        className={!birthDay && "blur"}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.birthday}
                    </Typography>
                    <Button size={"small"} variant={"contained"} onClick={() => SetBirthDay(true)}> دریافت
                        اطلاعات</Button>
                </Grid>
                <Grid container direction="row" justifyContent="space-between" sx={{marginY: 2}}>
                    نام پدر :
                    <Typography
                        sx={{display: "inline"}}
                        className={!fatherName && "blur"}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.fathersName}
                    </Typography>
                    <Button size={"small"} variant={"contained"} onClick={() => SetFatherName(true)}> دریافت
                        اطلاعات</Button>
                </Grid>
                <Grid container direction="row" justifyContent="space-between" sx={{marginY: 2}}>
                    محل تولد :
                    <Typography
                        sx={{display: "inline"}}
                        className={!birthLocation && "blur"}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.birthLocation}
                    </Typography>
                    <Button size={"small"} variant={"contained"} onClick={() => SetBirthLocation(true)}> دریافت
                        اطلاعات</Button>
                </Grid>
                <Grid container direction="row" justifyContent="space-between" sx={{marginY: 2}}>
                    شماره همراه :
                    <Typography
                        sx={{display: "inline"}}
                        className={!phoneNumber && "blur"}
                        component="P"
                        variant="h6"
                        color="text.primary"
                    >
                        {user.phoneNumber}
                    </Typography>
                    <Button size={"small"} variant={"contained"} onClick={() => SetPhoneNumber(true)}> دریافت
                        اطلاعات</Button>
                </Grid>

            </CardContent>
        </Card>
    );
};


export default Profile;
