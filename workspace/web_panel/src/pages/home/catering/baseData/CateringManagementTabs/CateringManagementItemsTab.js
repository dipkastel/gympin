import React from 'react';
import CateringFoods from "../foods/CateringFoods";

const PlaceManagementItemsTab = ({catering, updatePlace}) => {
    return (
        <>
            {catering && <div className="row">
                <div className="col-md-12">
                    <CateringFoods catering={catering}/>
                </div>
            </div>}
        </>
    );
};

export default PlaceManagementItemsTab;
