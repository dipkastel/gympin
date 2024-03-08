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
            {!updatePageP && <div className={"row"}>
                <div className={"col-md-6"}>
                </div>
                <div className={"col-md-6"}>
                    <__settingPocket updatePage={updatePage} />
                </div>
            </div>}
        </>
    );
};

export default _SettingPersonal;
