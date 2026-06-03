import React from 'react';
import FoodMenuCatering from "../menu/FoodMenuCatering";

const PlaceManagementDataTab = ({catering, updatePlace}) => {
    return (
        <>
            {catering && <FoodMenuCatering catering={catering}/>}
        </>
    );
};

export default PlaceManagementDataTab;
