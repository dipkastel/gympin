import React, {useEffect} from 'react';
import _PlacesList from "./placesList/_PlacesList";
import {Alert, Card, Link} from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {useNavigate} from "react-router-dom";

const Places = () => {
    useEffect(() => {
        document.title = 'مراکز';
    }, []);


    return (
        <>
            {/*<div className={"mapIcon"}>*/}
            {/*    <Fab color={"primary"} href={"/placesMap"} aria-label="map">*/}
            {/*        <Public />*/}
            {/*    </Fab>*/}
            {/*</div>*/}
            <_PlacesList/>
        </>
    );
};

export default Places;
