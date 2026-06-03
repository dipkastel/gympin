import React from 'react';
import __wizardBeneficiaries from "./beneficiaries/__wizardBeneficiaries";

const _wizardBeneficiaries = ({allowNext}) => {

    return (
        <div className={"row"}>
            <__wizardBeneficiaries allowNext={allowNext}/>
        </div>
    );
};

export default _wizardBeneficiaries;
