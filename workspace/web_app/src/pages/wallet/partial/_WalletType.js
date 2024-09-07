import React from 'react';
import {creditTypes} from "../../../helper/enums/creditTypes";
import _LiCreditIncome from "./_LiCreditIncome";
import _LiCreditNonW from "./_LiCreditNonW";
import _LiCreditPersonal from "./_LiCreditPersonal";
import _LiCreditSponsor from "./_LiCreditSponsor";

const _WalletType = ({credit}) => {
    return (
        <>
            {credit.CreditType==="INCOME"&&<_LiCreditIncome credit={credit} />}
            {credit.CreditType==="NON_WITHDRAWABLE"&&<_LiCreditNonW credit={credit} />}
            {credit.CreditType==="PERSONAL"&&<_LiCreditPersonal credit={credit} />}
            {credit.CreditType==="SPONSOR"&&<_LiCreditSponsor credit={credit} />}

        </>
    );
};

export default _WalletType;
