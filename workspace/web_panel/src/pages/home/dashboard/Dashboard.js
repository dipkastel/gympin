import React, {useContext, useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import {Button, Card, CardContent, CardHeader, Grid,} from "@mui/material";
import {sport_query} from "../../../network/api/sport.api";
import {user_query} from "../../../network/api/user.api";
import {Place_query} from "../../../network/api/place.api";
import {Location_query} from "../../../network/api/location.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

export default function Dashboard() {
    const error = useContext(ErrorContext);
    const [userCount, setUserCount] = useState(0);
    const [cityCount, SetCityCount] = useState(0);
    const [regionCount, SetRegionCount] = useState(0);
    const [sportCount, SetSportCount] = useState(0);
    const [placeCount, SetPlaceCount] = useState(0);
    useEffect(() => {
        user_query({ paging:{Page:0,Size:1}}).then(data => {
            setUserCount(data.data.Data.totalElements)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);
    useEffect(() => {
        Location_query({ Type:"CITY",paging:{Page:0,Size:1}}).then(data => {
            SetCityCount(data.data.Data.totalElements)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);
    useEffect(() => {
        Location_query({ Type:"REGION",paging:{Page:0,Size:1}}).then(data => {
            SetRegionCount(data.data.Data.totalElements)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);
    useEffect(() => {
        sport_query({ paging:{Page:0,Size:1}}).then(data => {
            SetSportCount(data.data.Data.totalElements)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);
    useEffect(() => {
        Place_query({ paging:{Page:0,Size:1}}).then(data => {
            SetPlaceCount(data.data.Data.totalElements)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);


    return (
        <>

            <div className="container-fluid">
                <Row>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={"شهر های فعال"} color={"primary"}/>
                                <CardContent className={"kt-space-between"}>
                                    {cityCount} شهر فعال
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href="/locations"
                                        sx={{marginRight: "auto"}}
                                        size="large"
                                    >
                                        مدیریت
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={"محله های فعال"} color={"primary"}/>
                                <CardContent className={"kt-space-between"}>
                                    {regionCount} محله فعال
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href="/locations"
                                        sx={{marginRight: "auto"}}
                                        size="large"
                                    >
                                        مدیریت
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={"ورزش های فعال"} color={"primary"}/>
                                <CardContent className={"kt-space-between"}>
                                    {sportCount} ورزش فعال
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href="/sports"
                                        sx={{marginRight: "auto"}}
                                        size="large"
                                    >
                                        مدیریت
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={"مجموعه های فعال"} color={"primary"}/>

                                <CardContent className={"kt-space-between"}>
                                    {placeCount} مجموعه فعال

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href="/places"
                                        sx={{marginRight: "auto"}}
                                        size="large"
                                    >
                                        مدیریت
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title={"کاربر فعال"} color={"primary"}/>
                                <CardContent className={"kt-space-between"}>
                                    {userCount} کاربر فعال

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href="/users"
                                        sx={{marginRight: "auto"}}
                                        size="large"
                                    >
                                        مدیریت
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Row>
            </div>

        </>
    );
}
