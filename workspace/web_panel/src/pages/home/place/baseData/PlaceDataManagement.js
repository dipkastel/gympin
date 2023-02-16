import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Place_getPlaceById, Place_updatePlace} from "../../../../network/api/place.api";
import PlaceBase from "./Base/PlaceBase";
import Gates from "./Gates/Gates";
import Wallet from "./walet/Wallet";
import SettlementRequest from "./GateTransActions/SettlementRequest";
import PlaceSports from "./placeSport/PlaceSport";
import OptionOfPlace from "./OptionsOfPlace/OptionOfPlace";
import GateEnter from "./GateEnter/GateEnter";
import DeletePlace from "./Delete/DeletePlace";
import Plans from "./Plans/Plans";
import PlacePersonnel from "./Personnel/PlacePersonnel";
import Notice from "../../../partials/content/Notice";
import PlaceAbout from "./About/PlaceAbout";
import PlaceQrMessages from "./QrMessages/PlaceQrMessages";
import PlaceImages from "./Images/PlaceImages";
import {Note} from "@mui/icons-material";
import Notes from "../../../partials/content/notes/Notes";
import PlaceBalance from "./Balance/PlaceBalance";

const PlaceDataManagement = () => {
    let {placeId} = useParams();
    const [place,setPlace] = useState(null);
    useEffect(() => {
        getPlace();
    }, []);

    function getPlace() {
        Place_getPlaceById({id: placeId}).then((result) => {
            setPlace(result.data.Data)
        }).catch(e=>console.log(e));
    }

    function updatePlace(place) {
        Place_updatePlace(place).then(data => {
            setPlace(data.data.Data)
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                {place && (
                    <p>مدیریت مشخصات باشگاه {place.Name}</p>
                )}
            </Notice>
            {place && <div className="row">
                <div className="col-md-5">
                    {place && <PlaceBase place={place} updatePlace={updatePlace}/>}
                    {place && <Gates place={place}/>}
                    {place && <Plans place={place}/>}
                    {place && <PlaceAbout place={place}/>}
                    {place && <Wallet place={place}/>}
                    {place && <DeletePlace place={place}/>}
                </div>
                <div className="col-md-5">
                    {place && <PlaceBalance place={place}/>}
                    {place && <SettlementRequest place={place}/>}
                    {place && <PlaceImages place={place}/>}
                    {place && <PlaceSports place={place}/>}
                    {place && <OptionOfPlace place={place}/>}
                    {place && <PlacePersonnel place={place}/>}
                    {place && <PlaceQrMessages place={place}/>}
                    {place && <GateEnter place={place}/>}
                </div>
                <div className="col-md-2">
                    {place && <Notes source={{Place:{Id:place.Id}}}/>}
                </div>
            </div>}
        </>
    );
};

export default PlaceDataManagement;
