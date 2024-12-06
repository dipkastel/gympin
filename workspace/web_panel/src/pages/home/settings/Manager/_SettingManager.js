import React from 'react';
import __MaximumDiscount from "./__MaximumDiscount";
import __RemoveAllDescounts from "./__RemoveAllDescounts";
import __SetAutoDiscountToAll from "./__SetAutoDiscountToAll";
import __UpdateAutoDiscount from "./__UpdateAutoDiscount";
import __MaximumManagedDiscount from "./__MaximumManagedDiscount";

const _SettingManager = () => {
    return (<>
            {<div className={"row"}>
                <div className={"col-6"}>
                    <__MaximumManagedDiscount />
                    <__MaximumDiscount />
                    <__SetAutoDiscountToAll />
                </div>
                <div className={"col-6"}>
                    <__RemoveAllDescounts />
                    <__UpdateAutoDiscount />
                </div>
            </div>
            }

        </>
    );
};

export default _SettingManager;
