import React, {useState} from 'react';
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";
import {format} from "date-fns";
import {TransactionStatus} from "../../helper/enums/TransactionStatus";

const _userDetails = ({user}) => {

    const [nationalCode, SetNationalCode] = useState(false)
    const [birthDay, SetBirthDay] = useState(false)
    const [phoneNumber, SetPhoneNumber] = useState(false)
    return (

        <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
            <CardContent>

                <Grid  container spacing={1} >

                    <Grid item  xs={4}>
                        <Avatar
                            sx={{width: "100%",height:"auto",aspectRatio:"1"}}
                            alt={user?.Username}
                            src={user?.Avatar?.Url}/>
                    </Grid>

                    <Grid item  xs={8}>
                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography component={"p"} sx={{mt:1,mx:2,color:"#aaaaaa"}} variant={"caption"} >{"نام : "}</Typography>
                            <Typography component={"p"} sx={{mt:1,mx:2}} variant={"caption"} >{user.FullName}</Typography>
                        </Grid>
                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography component={"p"} sx={{mt:1,mx:2,color:"#aaaaaa"}} variant={"caption"} >{"کدملی : "}</Typography>
                            <Typography component={"p"} className={!nationalCode && "blur"} onClick={() => SetNationalCode(true)} sx={{mt:1,mx:2}} variant={"caption"} >{user.NationalCode}</Typography>
                        </Grid>
                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography component={"p"} sx={{mt:1,mx:2,color:"#aaaaaa"}} variant={"caption"} >{"تاریخ تولد : "}</Typography>
                            <Typography component={"p"} className={!birthDay && "blur"} onClick={() => SetBirthDay(true)} sx={{mt:1,mx:2}} variant={"caption"} >{new Date(user.Birthday).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</Typography>
                        </Grid>
                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography component={"p"} sx={{mt:1,mx:2,color:"#aaaaaa"}} variant={"caption"} >{"شماره همراه : "}</Typography>
                            <Typography component={"p"} className={!phoneNumber && "blur"} onClick={() => SetPhoneNumber(true)} sx={{mt:1,mx:2}} variant={"caption"} >{user.PhoneNumber}</Typography>
                        </Grid>
                     </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
};

export default _userDetails;
