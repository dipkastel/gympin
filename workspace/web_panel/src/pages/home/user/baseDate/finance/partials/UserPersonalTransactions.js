import React from 'react';
import {Portlet, PortletHeader} from "../../../../../partials/content/Portlet";
import _PersonalTransactions from "../../UserTransactions/_PersonalTransactions";
import {creditTypes} from "../../../../../../helper/enums/creditTypes";

const UserPersonalTransactions = ({currentUser, userFinance, updatePage}) => {


    if (!(userFinance.CreditType === "PERSONAL" || userFinance.CreditType === "INCOME" || userFinance.CreditType === "NON_WITHDRAWABLE"))
        return <></>
    return (
        <div>
            <Portlet>

                <PortletHeader title={"تراکنش های " + creditTypes[userFinance.CreditType] +
                (userFinance?.Corporate ? (" ( " + userFinance?.Corporate?.Name + " ) ") : "") +
                (userFinance?.Place ? (" ( " + userFinance?.Place?.Name + " ) ") : "")
                }
                />
                <_PersonalTransactions currentUser={currentUser} userFinance={userFinance} updatePage={updatePage}/>
            </Portlet>
        </div>
    );
};

export default UserPersonalTransactions;
