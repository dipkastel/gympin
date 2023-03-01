import React from 'react';
import {Button, Card, CardContent, Fab, Grid, InputAdornment, TextField, Typography} from "@mui/material";
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

                <Fab variant={"contained"} sx={{margin:1}} color={"error"} size="large">
                    <WhatsAppIcon />
                </Fab>
                <Fab variant={"contained"} sx={{margin:1}} color={"error"} size="large">
                    <TelegramIcon />
                </Fab>
                <Fab variant={"contained"} sx={{margin:1}} color={"error"} size="large">
                    <InstagramIcon />
                </Fab>
                <Fab variant={"contained"} sx={{margin:1}} color={"error"} size="large">
                    <SmsIcon />
                </Fab>
                <Grid container columns={"rows"}>
                    <Typography sx={{marginTop:5}}  variant={"body1"}>کد خود را به دوستانتان بدهید تا هنگام ثبت نام از آن استفاده کنند و هر کدام 10 هزار تومان اعتبار دریافت کنید. </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default _Invite;
