import React from "react";
import _PlaceTrafic from "./_PlaceTraffic";
import _PlacePersonel from "./_PlacePersonel";
import _PlaceGates from "./_PlaceGates";
import _PlaceAbout from "./_PlaceAbout";
import _PlaceStall from "./_PlaceStall";
import _Profile from "./_Profile";
import _PlaceFacilities from "./_PlaceFacilities";


export default function Management(){
    return (
        <>
            <_PlaceTrafic/>
            <_PlaceGates/>
            <_PlacePersonel/>
            <_PlaceAbout/>
            <_PlaceFacilities/>
            <_Profile/>
        </>
    );
}
