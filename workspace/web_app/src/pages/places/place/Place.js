import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import {gym_getById} from "../../../network/api/gym.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import "./place.css"
import {fixTextToSlug} from "../../../helper/utils";
import _TabPlaceBuyable from "./_TabPlaceBuyable";
import _placeBaseInfo from "./info/_placeBaseInfo";
import {Grid2 as Grid} from "@mui/material";
import _PlaceSingleAbout from "./info/_PlaceSingleAbout";
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";
import _PlaceFacilities from "./info/_PlaceFacilities";
import {useSelector} from "react-redux";
import _SinglePlaceGeneralHeader from "./partial/_SinglePlaceGeneralHeader";
import _SinglePlaceGeneralFooter from "./partial/_SinglePlaceGeneralFooter";
import _PlaceComments from "./comments/_PlaceComments";
import _PlaceSports from "./info/_PlaceSports";
import _PlaceAddress from "./info/_PlaceAddress";
import {Masonry} from "@mui/lab";
import _GympinIntro from "./partial/_GympinIntro";
import _CallToPlace from "./partial/_CallToPlace";

const Place = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const {placeId} = useParams();
    const [place, setPlace] = useState(null);
    const [abouts, SetAbouts] = useState([]);
    const currentUser = useSelector(state => state.auth.user)

    useEffect(() => {
        let placeLongId = placeId.split('-')[0];
            getPlace(placeLongId);
    }, [placeId]);

    useEffect(() => {
        if(!!place)
            getAbouts();
    }, [place]);

    function getAbouts() {
        PlaceAbout_getByPlace({Id: place?.Id}).then(result => {
            SetAbouts(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getPlace(id) {
        gym_getById(id).then(result => {
            setPlace(result.data.Data);
            if (placeId.includes("-") && !placeId.includes(fixTextToSlug(result.data.Data.Name)))
                navigate("/");
            document.title = 'مرکز ' + result?.data?.Data?.Name + " - جیم پین پل ارتباطی مراکز ورزشی و سازمان ها";
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <Grid container alignItems={"flex-start"}>
            {!currentUser && <Grid size={{xs: 12, sm: 12, md: 12}} sx={{float: "right"}}>
                <_SinglePlaceGeneralHeader/>
            </Grid>}
            <Grid size={{xs: 12, sm: 12, md: 12}} >
                <_CallToPlace place={place} currentUser={currentUser} />
            </Grid>
            <Masonry columns={{xs: 1, sm: 1,md:2,lg:2}} >
                <Grid>
                    {place&&!currentUser&& <Grid sx={{mx: 2, mt: 4, mb: 2, padding: 1}}><_GympinIntro/></Grid>}
                    {place&&currentUser&& <_placeBaseInfo place={place} currentUser={currentUser}/>}
                    {place&&place?.Multimedias && <_PlaceImages place={place}/>}
                </Grid>

                <Grid sx={{float: "right"}}>

                    {place&&<_PlaceAddress place={place}/>}
                    {place&&<_PlaceFacilities place={place}/>}
                    {abouts.map((item, number) => (<_PlaceSingleAbout key={"a" + number} about={item} number={number}/>))}
                    {place && <_TabPlaceBuyable place={place}/>}
                </Grid>
                <Grid  sx={{float: "right"}}>
                    {place&&<_PlaceSports place={place}/>}
                    {place&&<_PlaceComments place={place} currentUser={currentUser}/>}
                </Grid>
            </Masonry>
            {!currentUser && <Grid size={{sm: 12, md: 12}} sx={{float: "right"}}>
                <_SinglePlaceGeneralFooter/>
            </Grid>}
        </Grid>
    );
};

export default Place;
