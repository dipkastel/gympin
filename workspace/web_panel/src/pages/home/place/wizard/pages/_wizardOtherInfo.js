import React, {useEffect, useState} from 'react';
import __wizardSports from "./otherInfos/__wizardSports";
import __wizardPersonel from "./otherInfos/__wizardPersonel";

const _wizardOtherInfo = ({place,allowNext}) => {
    const [allowNextSport,setAllowNextSport] = useState(false);
    const [allowNextPersonel,setAllowNextPersonel] = useState(false);
    useEffect(() => {
        allowNext(allowNextSport&&allowNextPersonel);
    }, [allowNextSport,allowNextPersonel]);

    return (
        <div className={"row"}>
            <__wizardSports setAllowNextSport={setAllowNextSport} />
            <__wizardPersonel setAllowNextPersonel={setAllowNextPersonel} />
        </div>
    );
};

export default _wizardOtherInfo;
