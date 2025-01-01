import React from 'react';
import Grid from "@mui/material/Grid2";
import {Container, Typography} from "@mui/material";
import {Instagram} from "@mui/icons-material";

const _ContactData = () => {
    return (
        <section>
            <Container>
                <Grid container columns={9}>
                    <Grid sx={{p:2}} size={{md:3,xs:9}}>
                        <img className={"apps-img2"}  alt={"ورزش های اثر بخش بر سلامتی با دیسک کمر"} src={"/assets/images/support-man.jpg"}/>
                    </Grid>
                    <Grid sx={{p:2}} size={{md:6,xs:9}}>
                        <Typography variant={"h3"} sx={{fontSize:"1.3rem",fontWeight:600,mb:1,mt:2}} >اطلاعات تماس :</Typography>
                        <div>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:600}} >آدرس :</Typography>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:400}} > تهران - نارمک جنوبی - پلاک ۴۱۶ </Typography>
                        </div>
                        <div>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:600}} >تماس با جیم پین :</Typography>
                        </div>
                        <div>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:600}} >خـط ۱ :</Typography>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:400}} > ۰۲۱۷۷۱۶۲۱۹۱</Typography>
                        </div>
                        <div>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:600}} >خط ۲ :</Typography>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:400}} > ۰۲۱۷۷۱۶۲۱۹۲</Typography>
                        </div>
                        <div>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:600}} >ایمیل :</Typography>
                            <Typography variant={"caption"} sx={{fontSize:"1rem",lineHeight:"2rem",fontWeight:400}} > info@gympin.ir</Typography>
                        </div>
                        <Typography variant={"h3"} sx={{fontSize:"1.3rem",fontWeight:600,mt:4,mb:1}} >رسانه ها :</Typography>
                        <div>
                            <Typography variant={"subtitle1"} sx={{fontSize:"1rem",fontWeight:400}} >ما را در رسانه های اجتماعی دنبال کنید تا</Typography>
                            <Typography variant={"subtitle1"} sx={{fontSize:"1rem",fontWeight:400}} >از آخرین اخبار و رویدادها باخبر شوید :</Typography>

                            <Grid sx={{direction:"rtl",mt:1}} md={4}>
                                <Instagram sx={{fontSize:"2rem",mt:1,mx:0.5}}/>
                                <Instagram sx={{fontSize:"2rem",mt:1,mx:0.5}}/>
                                <Instagram sx={{fontSize:"2rem",mt:1,mx:0.5}}/>
                                <Instagram sx={{fontSize:"2rem",mt:1,mx:0.5}}/>
                            </Grid>
                        </div>
                      </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default _ContactData;
