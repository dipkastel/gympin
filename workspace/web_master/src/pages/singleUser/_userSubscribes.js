import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Divider, Grid, Link, List, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {purchasedSubscribe_getUserPlaceSubscribe} from "../../network/api/subscribe.api";
import {SubscribeStatusEnum} from "../../helper/enums/SubscribeStatusEnum";

const _userSubscribes = ({user}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [userPlaceSubscribes, setUserPlaceSubscribes] = useState([]);

    useEffect(() => {
        getUserPlaceSubscribes();
    }, []);


    function getUserPlaceSubscribes() {

        purchasedSubscribe_getUserPlaceSubscribe({UserId: user.Id, PlaceId: place.Id}).then(result => {
            setUserPlaceSubscribes(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (

        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader
                title={"خرید های کاربر از این مرکز"}
            />
            <CardContent>

                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {userPlaceSubscribes.map((item, num) => (
                        <div key={"userSubscribes-" + num}>
                            <Link href={"/users/SingleSubscribe?id=" + item.Id}
                                  sx={{textDecoration: "none", color: "#666666"}}>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>

                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Typography variant={"subtitle1"}> {item.Name}</Typography>
                                            {/*<Typography variant={"subtitle1"} color={(item.Status=="ACTIVE")?"primary":"green"}>{item.Status}</Typography>*/}
                                        </Grid>
                                        <Typography variant={"caption"} color={"gray"}>سریال
                                            : {item?.Serial?.Serial}</Typography>
                                    </Grid>

                                    <Grid item justifyContent={"center"} alignContent={"center"}>

                                        <Typography
                                            variant={"body2"}>{"انقضا : "}{new Date(item.ExpireDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                        })}</Typography>
                                        <Typography variant={"body2"}
                                                    color={(item.Status != "ACTIVE") ? "primary" : "green"}>{SubscribeStatusEnum[item.Status]}</Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </div>
                    ))}

                </List>
            </CardContent>
        </Card>
    );
};

export default _userSubscribes;
