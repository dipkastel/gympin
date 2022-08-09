import React from "react";
import _Wallet from "./_Wallet";
import _Transactions from "./_Transactions";
import _FinanaceReport from "./_FinanceReport";


export default function Finance(){
    return (
        <>
            <_Wallet/>
            <_FinanaceReport/>
            <_Transactions/>

        </>
    );
}
