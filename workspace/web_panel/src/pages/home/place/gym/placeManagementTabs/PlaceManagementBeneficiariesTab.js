import React from 'react';
import PlaceBeneficiaries from "../placeBeneficiaries/PlaceBeneficiaries";

const PlaceManagementBeneficiariesTab = ({place, updatePlace}) => {
    return (
        <>
            {place && <div className="row">
                <div className="col-md-12">
                    <PlaceBeneficiaries place={place} updatePlace={updatePlace}/>
                </div>

            </div>}
        </>
    );
};

export default PlaceManagementBeneficiariesTab;
