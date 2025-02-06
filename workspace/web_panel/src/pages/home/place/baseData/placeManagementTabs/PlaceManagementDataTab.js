import React from 'react';
import Halls from "../halls/Halls";
import PlaceAbout from "../About/PlaceAbout";
import PlaceImages from "../Images/PlaceImages";
import PlaceSports from "../placeSport/PlaceSport";
import OptionOfPlace from "../OptionsOfPlace/OptionOfPlace";
import PlacePersonnel from "../Personnel/PlacePersonnel";
import PlaceTags from "../placeTags/PlaceTags";

const PlaceManagementDataTab = ({place, updatePlace}) => {
    return (
        <>
            {place && <div className="row">
                <div className="col-md-6">
                    {place && <PlaceSports place={place}/>}
                    {place && <OptionOfPlace place={place}/>}
                    {place && <PlaceAbout place={place}/>}
                </div>
                <div className="col-md-6">
                    {place && <PlacePersonnel place={place}/>}
                    {place && <PlaceImages place={place}/>}
                    {place && <PlaceTags place={place}/>}
                    {/*{place && <Halls place={place}/>}*/}
                </div>

            </div>}
        </>
    );
};

export default PlaceManagementDataTab;
