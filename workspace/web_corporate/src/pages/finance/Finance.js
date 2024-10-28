import React, {useEffect} from "react";
import _Wallet from "./_Wallet";
import _TotalCredits from "./_TotalCredits";
import _CorporatePlan from "./_CorporatePlan";


export default function Finance() {
    useEffect(() => {
        document.title = 'مالی';
    }, []);

    return (
        <div className={"container"}>
            <div className={"row"}>
                <_Wallet/>
                <_TotalCredits/>
                <_CorporatePlan />
                {/*<_FinanaceReport/>*/}
            </div>
        </div>
    );
}
