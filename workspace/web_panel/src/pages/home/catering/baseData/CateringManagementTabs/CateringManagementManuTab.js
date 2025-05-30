import React from 'react';
import CateringAbout from "../About/CateringAbout";
import CateringFoods from "../foods/CateringFoods";
import FoodMenuCatering from "../menu/FoodMenuCatering";

const PlaceManagementDataTab = ({catering, updatePlace}) => {
    return (
        <>
            {catering && <FoodMenuCatering catering={catering}/>}
        </>
    );
};

export default PlaceManagementDataTab;
