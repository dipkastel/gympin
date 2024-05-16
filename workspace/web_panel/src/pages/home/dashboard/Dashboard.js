import React, {useContext, useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import {Grid} from "@mui/material";
import {sport_query} from "../../../network/api/sport.api";
import {user_query} from "../../../network/api/user.api";
import {Place_query} from "../../../network/api/place.api";
import {Location_query} from "../../../network/api/location.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _DashItem from "./_DashItem";
import _DashNotes from "./_DashNotes";
import _DashSupport from "./_DashSupport";

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
                        <Grid item xs={6}>
                            <_DashNotes />
                        </Grid>
                        <Grid item xs={6}>
                            <_DashSupport />
                        </Grid>
                        <Grid item xs={4}>
                            <_DashItem title={"شهر های فعال"} itemText={cityCount+" شهر فعال"} buttonText={"مدیریت"} href={"/locations/2"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <_DashItem title={"محله های فعال"} itemText={regionCount+" محله فعال"} buttonText={"مدیریت"} href={"/locations/3"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <_DashItem title={"ورزش های فعال"} itemText={sportCount+" ورزش فعال"} buttonText={"مدیریت"} href={"/sports"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <_DashItem title={"مجموعه های فعال"} itemText={placeCount+" مجموعه فعال"} buttonText={"مدیریت"} href={"/places"}/>
                        </Grid>
                        <Grid item xs={4}>
                            <_DashItem title={"کاربر فعال"} itemText={userCount+" کاربر فعال"} buttonText={"مدیریت"} href={"/users"}/>
                        </Grid>
                    </Grid>
                </Row>
            </div>

        </>
    );
}
