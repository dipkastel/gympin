import React, {useEffect, useState} from 'react';
import __settingPocket from "./__settingPocket";

const _SettingPersonal = () => {
    const [updatePageP, SetUpdatePageP] = useState(false);
    useEffect(() => {
        if (updatePageP)
            SetUpdatePageP(false)
    }, [updatePageP]);

    function updatePage() {
        SetUpdatePageP(true)
    }


    return (
        <>
            {!updatePageP &&  <__settingPocket updatePage={updatePage} />}
        </>
    );
};

export default _SettingPersonal;
