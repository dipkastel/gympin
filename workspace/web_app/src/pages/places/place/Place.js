import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import _PlaceImages from "./_PlaceImages";
import {place_getById} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import "./place.css"
import {fixTextToSlug} from "../../../helper/utils";
import _TabPlaceBuyable from "./_TabPlaceBuyable";
import _placeBaseInfo from "./info/_placeBaseInfo";
import {Grid2 as Grid} from "@mui/material";
import _TabPlaceAbout from "./info/_TabPlaceAbout";
import _PlaceSingleAbout from "./info/_PlaceSingleAbout";
import {PlaceAbout_getByPlace} from "../../../network/api/placeAbout.api";
import _PlaceFacilities from "./info/_PlaceFacilities";

const Place = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const {placeId} = useParams();
    const [place, setPlace] = useState({});
    const [abouts,SetAbouts] = useState([]);

    useEffect(() => {
        let placeLongId = placeId.split('-')[0];
        getPlace(placeLongId);
    }, [placeId]);

    useEffect(() => {
        getAbouts();
    }, [place]);

    function getAbouts() {
        PlaceAbout_getByPlace({Id:place.Id}).then(result=>{
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
        place_getById(id).then(result => {
            setPlace(result.data.Data);
            if (placeId.includes("-") && !placeId.includes(fixTextToSlug(result.data.Data.Name)))
                navigate("/");
            document.title = 'مرکز ورزشی ' + result?.data?.Data?.Name + " - جیم پین پل ارتباطی مراکز ورزشی و سازمان ها";
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
            <Grid size={{sm: 12, md: 6}} sx={{float: "right"}}>
                {place.Multimedias && <_PlaceImages place={place}/>}
                <_placeBaseInfo place={place}/>
                <_PlaceFacilities place={place} />
                {abouts.map((item,number) => (
                        <_PlaceSingleAbout key={"a"+number} about={item} number={number}/>
                    )
                )}
            </Grid>
            <Grid size={{sm: 12, md: 6}} sx={{float: "right"}}>
                {place && <_TabPlaceBuyable place={place}/>}
            </Grid>
        </Grid>
    );
};

export default Place;
