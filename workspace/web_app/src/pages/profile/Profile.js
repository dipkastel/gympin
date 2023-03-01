import React, {useContext, useEffect} from 'react';
import {Avatar, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {Image} from "react-bootstrap";
import _ListItem from "../../components/_ListItem";
import {connect, useSelector} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

const Profile = (props) => {
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        props.RequestUser(user)
    }, []);

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={3}>
                            <Button href={"/profile/edit"} variant={"outlined"}>ویرایش</Button>
                            <Image fluid width={"100%"} src={"/assets/images/charcter_orang.png"}/>
                        </Grid>
                        {user &&
                        <Grid container direction={"column"} alignItems={"center"} justifyContent={"start"} item xs={9}>
                            <Avatar
                                sx={{width: 120, height: 120, marginTop: 3}}
                                alt="Remy Sharp"
                                src={user.Avatar&&user.Avatar.Url}/>
                            <Typography variant={"h4"} color={"black"}>{user.Username}</Typography>
                            <Typography variant={"h6"} color={"darkgray"}>{user.PhoneNumber}</Typography>
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

                </CardContent>
            </Card>
            <_ListItem title="شرایط و قوانین" destination="https://gympin.ir/term-and-conditions/"/>
            <_ListItem title="دعوت از دوستان" destination="/profile/invitefriends"/>
            <_ListItem title="سوالات متداول" destination="https://gympin.ir/faq/"/>
            {/*<_ListItem title="امتیاز و بازخورد" destination="/profile/survey"/>*/}
            <_ListItem title="تماس با ما" destination="https://gympin.ir/contact/"/>
            <_ListItem title="خروج" destination="/auth/logout"/>

        </>
    );
};


export default connect(null, sagaActions)(Profile);
