import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {LinearProgress, ListItemText, Tooltip, Typography} from "@mui/material";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {AccountBalanceWallet, AttachMoney, NotInterested} from "@mui/icons-material";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {CorporateContractType} from "../../../../../helper/enums/CorporateContractType";
import {UserFinanceTypesEnum} from "../../../../../helper/enums/UserFinanceTypesEnum";

const _IncomeTransactions = ({incomeTransactions}) => {
    if (!incomeTransactions)
        return (<>
            <Portlet>
                <PortletHeader title={"تراکنش‌های درآمد"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (incomeTransactions.length < 1)
        return (<></>);

    function getColorClassByAmount(Amount) {
        return (Amount > 0) ? "kt-font-success" : "kt-font-danger";
        // kt-font-warning
        // kt-font-primary
    }

    function getColorClassByTrStatus(trst) {
        return (trst === "COMPLETE") ? "kt-font-success" : "kt-font-warning";
    }

    function getCurrentAmount(tr) {


        return (<>
            {UserFinanceTypesEnum[tr?.FinanceUser?.FinanceType]+" "}
            <>{"با مبلغ : " + toPriceWithComma(tr?.FinanceUser?.TotalDeposit)}</>
        </>);
    }

    function getCalc(tr) {
        return "تغییر مبلغ از " + toPriceWithComma(tr?.LatestBalance) + " به " + toPriceWithComma(tr?.LatestBalance + tr?.Amount);
    }

    return (
        <>
            <div className="kt-portlet ">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">تراکنش‌های درآمد</h3>
                    </div>
                </div>
                <div className="kt-portlet__body">
                    <div className="kt-widget4">
                        {incomeTransactions.map((tr, num) => (
                            <div key={num} className="kt-widget4__item">

                                <Typography variant={"body2"}>درآمد ناخالص جیم پین ( بدون کسر مالیات و... ) </Typography>
                                <span
                                    className={"kt-widget4__number " + getColorClassByAmount(tr?.Amount)}>{toPriceWithComma(tr?.Amount) + " تومان"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default _IncomeTransactions;
