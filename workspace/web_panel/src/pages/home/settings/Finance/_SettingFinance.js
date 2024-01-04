import React, {useEffect, useState} from 'react';
import __SettingsGateways from "./__SettingsGateways";
import __SettingsApplicationGateways from "./__SettingsApplicationGateways";
import __SettingsApplicationAmountSuggest from "./__SettingsApplicationAmountSuggest";

const _SettingFinance = () => {

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
                    <__SettingsGateways updatePage={updatePage} />
                    <__SettingsApplicationGateways updatePage={updatePage} />
                </div>
                <div className={"col-md-6"}>
                    <__SettingsApplicationAmountSuggest updatePage={updatePage} />
                </div>
            </div>}
        </>
    );
};

export default _SettingFinance;
