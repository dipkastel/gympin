import React from 'react';
import _RViews from "../reports/_RViews";

const PlaceManagementReportsTab = ({place, updatePlace}) => {
    return (
        <>
            {place && <div className="row">

                <div className="col-md-12">
                    {place && <_RViews place={place} updatePlace={updatePlace}/>}

                </div>

            </div>}
        </>
    );
};

export default PlaceManagementReportsTab;
