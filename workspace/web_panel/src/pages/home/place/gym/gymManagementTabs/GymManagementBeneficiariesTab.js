import React from 'react';
import PlaceBeneficiaries from "../gymBeneficiaries/PlaceBeneficiaries";

const GymManagementBeneficiariesTab = ({place, updatePlace}) => {
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

export default GymManagementBeneficiariesTab;
