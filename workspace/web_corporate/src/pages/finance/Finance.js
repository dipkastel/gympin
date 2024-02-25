import React, {useEffect} from "react";
import _Wallet from "./_Wallet";
import _TotalCredits from "./_TotalCredits";


export default function Finance(){
    useEffect(() => {
        document.title = 'مالی';
    }, []);

    return (
        <>
            <_Wallet/>
            <_TotalCredits/>
            {/*<_FinanaceReport/>*/}
        </>
    );
}
