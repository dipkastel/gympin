import React from 'react';
import CateringAbout from "../About/CateringAbout";
import CateringPersonnel from "../Personnel/CateringPersonnel";

const PlaceManagementDataTab = ({catering, updatePlace}) => {
    return (
        <>
            {catering && <div className="row">
                <div className="col-md-6">
                    <CateringAbout catering={catering}/>
                </div>
                <div className="col-md-6">
                    <CateringPersonnel place={catering}/>
                </div>
            </div>}
        </>
    );
};

export default PlaceManagementDataTab;
