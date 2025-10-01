import React from 'react';
import CateringAbout from "../About/CateringAbout";
import CateringFoods from "../foods/CateringFoods";
import CateringPersonnel from "../Personnel/CateringPersonnel";

const PlaceManagementItemsTab = ({catering, updatePlace}) => {
    return (
        <>
            {catering && <div className="row">
                    <CateringFoods catering={catering}/>
            </div>}
        </>
    );
};

export default PlaceManagementItemsTab;
