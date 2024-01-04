import React, {useEffect, useState} from 'react';
import __wizardSports from "./otherInfos/__wizardSports";
import __wizardPersonel from "./otherInfos/__wizardPersonel";
import __wizardBeneficiaries from "./beneficiaries/__wizardBeneficiaries";

const _wizardBeneficiaries = ({allowNext}) => {

    return (
        <div className={"row"}>
            <__wizardBeneficiaries allowNext={allowNext} />
        </div>
    );
};

export default _wizardBeneficiaries;
