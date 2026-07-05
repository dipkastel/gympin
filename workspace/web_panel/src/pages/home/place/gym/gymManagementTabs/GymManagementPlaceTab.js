import React from 'react';
import GymBase from "../Base/GymBase";

const GymManagementPlaceTab = ({place,updatePlace}) => {
    return (
        <>
            {place && <div className="row">

                <div className="col-md-12">
                    {place && <GymBase place={place} updatePlace={updatePlace}/>}
                </div>

            </div>}
        </>
    );
};

export default GymManagementPlaceTab;
