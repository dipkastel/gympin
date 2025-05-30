import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Location_query} from "../../../../network/api/location.api";
import {user_query} from "../../../../network/api/user.api";
import {sport_query} from "../../../../network/api/sport.api";
import {PlaceGym_query} from "../../../../network/api/place.api";
import {Grid} from "@mui/material";
import _DashItem from "../partials/_DashItem";
import QuickStatsIcon from "../../../widgets/QuickStatsIcon";
import {
    Apartment,
    EmojiTransportation,
    FitnessCenter, Group, Groups,
    LocationCity,
    NoteAlt,
    Sports,
    SportsBasketball
} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

const DashTasksTab = ({updatePage}) => {

    const error = useContext(ErrorContext);
    const history = useHistory();
    const [userCount, setUserCount] = useState(0);
    const [cityCount, SetCityCount] = useState(0);
    const [regionCount, SetRegionCount] = useState(0);
    const [sportCount, SetSportCount] = useState(0);
    const [placeCount, SetPlaceCount] = useState(0);
    useEffect(() => {
        user_query({paging: {Page: 0, Size: 1}}).then(data => {
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
        Location_query({Type: "STATE", paging: {Page: 0, Size: 1}}).then(data => {
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
        Location_query({Type: "REGION", paging: {Page: 0, Size: 1}}).then(data => {
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
        sport_query({paging: {Page: 0, Size: 1}}).then(data => {
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
        PlaceGym_query({
            Status:"ACTIVE",
            paging: {Page: 0, Size: 1}}).then(data => {
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
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <QuickStatsIcon
                        onClick={()=>{history.push("/locations/1")}}
                        title="استان های فعال"
                        text={cityCount + " استان فعال"}
                        icon={<LocationCity sx={{fontSize: 40, color: "#218dbb"}}/>}
                    />
                </Grid>
                <Grid item xs={3}>

                    <QuickStatsIcon
                        onClick={()=>{history.push("/locations/3")}}
                        title={"محله های فعال"}
                        text={regionCount + " محله فعال"}
                        icon={<EmojiTransportation sx={{fontSize: 40, color: "#21bb9f"}}/>}
                    />
                </Grid>
                <Grid item xs={3}>

                    <QuickStatsIcon
                        onClick={()=>{history.push("/sports")}}
                        title={"ورزش های فعال"}
                        text={sportCount + " ورزش فعال"}
                        icon={<SportsBasketball sx={{fontSize: 40, color: "#8555e8"}}/>}
                    />
                </Grid>
                <Grid item xs={3}>

                    <QuickStatsIcon
                        onClick={()=>{history.push("/places")}}
                        title={"مجموعه های فعال"}
                        text={placeCount + " مجموعه فعال"}
                        icon={<FitnessCenter sx={{fontSize: 40, color: "#d455e8"}}/>}
                    />
                </Grid>
                <Grid item xs={3}>
                    <QuickStatsIcon
                        onClick={()=>{history.push("/users")}}
                        title={"کاربر فعال"}
                        text={userCount + " کاربر فعال"}
                        icon={<Groups sx={{fontSize: 40, color: "#9bb236"}}/>}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default DashTasksTab;
