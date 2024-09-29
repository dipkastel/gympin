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
        <>

            <div>
                <div className={"section-title mt-3"}>
                    خرید های کاربر
                </div>
            </div>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {userPlaceSubscribes.map((item, num) => (
                            <Card key={"userSubscribes-" + num} elevation={3} sx={{margin: 1}}>
                                <CardContent>

                                <div >
                                <Link href={"/users/SingleSubscribe/" + item.Key}
                                      sx={{textDecoration: "none", color: "#666666"}}>

                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            {console.log(item)}

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Typography variant={"subtitle1"}> {item.Name}</Typography>
                                                {/*<Typography variant={"subtitle1"} color={(item.Status=="ACTIVE")?"primary":"green"}>{item.Status}</Typography>*/}
                                            </Grid>
                                            <Typography variant={"caption"} color={"gray"}>کد بلیت
                                                : {item?.Key}</Typography>
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
                            </div>
                                </CardContent>
                            </Card>
                        ))}

                    </List>
        </>

    );
};

export default _userSubscribes;
