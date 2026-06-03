import React from 'react';
import PlaceBase from "../Base/PlaceBase";

const PlaceManagementPlaceTab = ({place,updatePlace}) => {
    return (
        <>
            {place && <div className="row">

                <div className="col-md-12">
                    {place && <PlaceBase place={place} updatePlace={updatePlace}/>}
                </div>

            </div>}
        </>
    );
};

export default PlaceManagementPlaceTab;
