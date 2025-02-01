import React, {useEffect} from 'react';
import {Avatar, Button, Card, CardContent, Grid, IconButton, Typography} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";
import {EditNote} from "@mui/icons-material";

const Profile = (props) => {
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        document.title = 'پروفایل من';
        props.RequestUser()
    }, []);

    return (
        <>
            {user && <Grid sx={{width:"100%",position:"absolute",justifyItems:"center"}}>
                <Avatar
                    sx={{width: 150, height: 150, marginTop: 1, marginBottom: 1,border:"#FFFFFF solid 5px"}}
                    alt="Remy Sharp"
                    src={user.Avatar && user.Avatar.Url}/>
            </Grid>}
            <Card elevation={3} sx={{mt: 10, mx: 1}}>
                {user &&
                <Grid container direction={"column"} alignItems={"center"} justifyContent={"start"} item xs={12}>
                    <img width={"180px"} src={"/assets/images/userBg.jpg"}/>
                </Grid>}
                <CardContent sx={{textAlign:"end",pb:"10px !important"}}>
                    <Grid container>

                        {user &&
                        <Grid container direction={"column"} alignItems={"center"} justifyContent={"start"} item xs={12}>

                            <Typography variant={"h4"} color={"black"}>{(user.FullName) ? user.FullName : user.Username}</Typography>
                            {/*<Typography variant={"h6"} color={"darkgray"}>{user.PhoneNumber}</Typography>*/}
                            {/*<Rating name="read-only" value={user.rate} readOnly />*/}
                            <Typography variant={"body1"} color={"darkgray"} sx={{marginY: 1}}>{user.Bio}</Typography>
                            {/*<Grid  container direction={"row"} columns={13}   >*/}
                            {/*    <Grid container  xs={5} alignItems={"center"} justifyContent={"center"} >*/}
                            {/*        <Typography variant={"body2"} color={"darkgray"} sx={{marginY:1}}>دنبال کننده 123</Typography>*/}

                            {/*    </Grid>*/}
                            {/*    <Grid container  xs={1} alignItems={"center"} justifyContent={"center"} >*/}
                            {/*        <Divider xs={1} orientation="vertical" variant="middle" sx={{height:"25px !important"}} />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid container  xs={5} alignItems={"center"} justifyContent={"center"} >*/}
                            {/*        <Typography variant={"body2"} color={"darkgray"} sx={{marginY:1}}>دنبال شونده*/}
                            {/*            1123</Typography>*/}
                            {/*    </Grid>*/}

                            {/*</Grid>*/}

                        </Grid>}
                    </Grid>
                    <IconButton href={"/profile/edit"} color={"primary"} >
                        <EditNote/>
                    </IconButton>


                </CardContent>
            </Card>
            {/*<_ListItem title="خرید های قبلی" destination="/invoices"/>*/}
            {/*/!*<_ListItem title="دعوت از دوستان" destination="/profile/invitefriends"/>*!/*/}
            {/*<_ListItem title="سوالات متداول" destination="https://gympin.ir/faq/"/>*/}
            {/*/!*<_ListItem title="امتیاز و بازخورد" destination="/profile/survey"/>*!/*/}
            {/*<_ListItem title="شرایط و قوانین" destination="https://gympin.ir/term-and-conditions/"/>*/}
            {/*<_ListItem title="تماس با ما" destination="https://gympin.ir/contact/"/>*/}
            {/*<_ListItem title="تنظیمات" destination="/settings"/>*/}

        </>
    );
};


export default connect(null, sagaActions)(Profile);
