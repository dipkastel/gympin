import React from 'react';
import {Button, Card, CardContent, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import SmsIcon from '@mui/icons-material/Sms';

const _Invite = () => {
    return (
        <Card elevation={3} sx={{margin:1}}>
            <CardContent>
                <Typography variant={"h3"}>کد دعوت شما : </Typography>
                <Typography  variant={"body1"}>با دعوت از دوستان خود 10 هزار تومان اعتبار دریافت کنید. </Typography>
                <div className="form-group">
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="code"
                        type="text"
                        value={"458G525"}
                        label={"کد"}
                        InputProps={{
                            style: { fontSize: 40 },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Button
                                        edge="start"
                                        aria-label="Toggle password visibility"
                                        variant={"contained"}
                                    > کپی
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <Typography sx={{marginTop:5}} variant={"body1"}>اشتراک گذاری : </Typography>

                <Button variant={"contained"} sx={{borderRadius:"50%",width:"4vw",height:"4vw",margin:1}} aria-label="delete" size="large">
                    <WhatsAppIcon sx={{width:"3vw",height:"3vw"}} fontSize="inherit" />
                </Button>
                <Button variant={"contained"} sx={{borderRadius:"50%",width:"4vw",height:"4vw",margin:1}} aria-label="delete" size="large">
                    <TelegramIcon sx={{width:"3vw",height:"3vw"}} fontSize="inherit" />
                </Button>
                <Button variant={"contained"} sx={{borderRadius:"50%",width:"4vw",height:"4vw",margin:1}} aria-label="delete" size="large">
                    <InstagramIcon sx={{width:"3vw",height:"3vw"}} fontSize="inherit" />
                </Button>
                <Button variant={"contained"} sx={{borderRadius:"50%",width:"4vw",height:"4vw",margin:1}} aria-label="delete" size="large">
                    <SmsIcon sx={{width:"3vw",height:"3vw"}} fontSize="inherit" />
                </Button>
                <Grid container columns={"rows"}>

                    <Typography sx={{marginTop:5}}  variant={"body1"}>کد خود را به دوستانتان بدهید تا هنگام ثبت نام از آن استفاده کنند و هر کدام 10 هزار تومان اعتبار دریافت کنید. </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default _Invite;
