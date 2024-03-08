import React, {useEffect, useState} from 'react';
import __SettingSmsConfigs from "./__SettingSmsConfigs";
import __SettingSmsList from "./__SettingSmsList";

const _SettingSms = () => {

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
                    <__SettingSmsConfigs updatePage={updatePage} />
                </div>
                <div className={"col-md-6"}>
                    <__SettingSmsList updatePage={updatePage} />
                </div>
            </div>}
        </>
    );
};

export default _SettingSms;
