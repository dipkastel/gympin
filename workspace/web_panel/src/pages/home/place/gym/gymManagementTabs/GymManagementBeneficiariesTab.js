import React from 'react';
import GymBeneficiaries from "../Beneficiaries/GymBeneficiaries";

const GymManagementBeneficiariesTab = ({place, updatePlace}) => {
    return (
        <>
            {place && <div className="row">
                <div className="col-md-12">
                    <GymBeneficiaries place={place} updatePlace={updatePlace}/>
                </div>

            </div>}
        </>
    );
};

export default GymManagementBeneficiariesTab;
