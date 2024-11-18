import React, {useEffect} from 'react';
import _PlacesList from "./placesList/_PlacesList";
import {Fab} from "@mui/material";
import {Public} from "@mui/icons-material";

const Places = () => {
    useEffect(() => {
        document.title = 'مراکز';
    }, []);


    return (
        <>
            <div className={"mapIcon"}>
                <Fab color={"primary"} href={"/placesMap"} aria-label="map">
                    <Public />
                </Fab>
            </div>
            <_PlacesList/>
        </>
    );
};

export default Places;
