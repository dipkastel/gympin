import React from 'react';
import {AccountBalanceWallet, AttachMoney, Description, NotInterested} from "@mui/icons-material";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {LinearProgress, ListItemText, Tooltip} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {CorporateContractType} from "../../../../../helper/enums/CorporateContractType";

const _CorporateTransactions = ({corporateTransaction}) => {
    if (!corporateTransaction)
        return (<>
            <Portlet>
                <PortletHeader title={"تراکنش‌های شارژ شرکت"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (corporateTransaction.length < 1)
        return (<></>);

    function getColorClassByAmount(Amount) {
        return (Amount > 0) ? "kt-font-success" : "kt-font-danger";
        // kt-font-warning
        // kt-font-primary
    }

    function getColorClassByTrStatus(trst) {
        return (trst === "COMPLETE") ? "kt-font-success" : "kt-font-warning";
    }

    function getCorporate(Corporate) {
        return (<span className={(Corporate.Status === "ACTIVE") ? "kt-font-dark" : "kt-font-danger"}>
                {Corporate?.Name + " ( " + CorporateContractType[Corporate?.ContractType] + " )"}
        </span>);
    }


    function getCurrentAmount(tr) {
        if (tr.TransactionType === "CREDIT") {
            return <>{"اعتبار فعلی پرسنل : " + toPriceWithComma(tr?.CorporateFinance?.TotalCredits)}

                {tr?.Description &&
                <Tooltip title={tr?.Description} placement="top">
                    <Description sx={{color: "#f44fd3"}}/>
                </Tooltip>}
                {tr?.SerialDescription &&
                <Tooltip title={tr?.SerialDescription} placement="top">
                    <Description sx={{color: "#267272"}}/>
                </Tooltip>}
            </>
        } else if (tr.TransactionType === "DEPOSIT") {
            return <>{"شارژ فعلی سازمان : " + toPriceWithComma(tr?.CorporateFinance?.TotalDeposit)}
                {tr?.Description &&
                <Tooltip title={tr?.Description} placement="top">
                    <Description sx={{color: "#f44fd3"}}/>
                </Tooltip>}
                {tr?.SerialDescription &&
                <Tooltip title={tr?.SerialDescription} placement="top">
                    <Description sx={{color: "#267272"}}/>
                </Tooltip>}</>
        }
        return "";
    }

    function getCalc(tr) {
        return "تغییر مبلغ از " + toPriceWithComma(tr?.LatestBalance) + " به " + toPriceWithComma(tr?.LatestBalance + tr?.Amount);
    }

    return (
        <>
            {corporateTransaction.filter(tr => tr.TransactionType == "DEPOSIT").length > 0 &&
            <div className="kt-portlet ">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">تراکنش‌های شارژ شرکت</h3>
                    </div>
                </div>
                <div className="kt-portlet__body">
                    <div className="kt-widget4">
                        {corporateTransaction.filter(tr => tr.TransactionType == "DEPOSIT").map((tr, num) => (
                            <div key={num} className="kt-widget4__item">
                        <span className="kt-widget4__icon">
                                    {(tr?.TransactionStatus !== "COMPLETE") && (
                                        <Tooltip title={TransactionStatus[tr?.TransactionStatus]} placement="top">
                                            <NotInterested className={getColorClassByTrStatus(tr.TransactionStatus)}
                                                           sx={{fontSize: 15}}/>
                                        </Tooltip>)}
                            {(tr?.TransactionType == "CREDIT") &&
                            <Tooltip title={"اعتبار"} placement="top">
                                <AttachMoney className={getColorClassByAmount(tr?.Amount)} sx={{fontSize: 25}}/>
                            </Tooltip>
                            }
                            {(tr?.TransactionType == "DEPOSIT") &&
                            <Tooltip title={"شارژ"} placement="top">
                                <AccountBalanceWallet className={getColorClassByAmount(tr?.Amount)}
                                                      sx={{fontSize: 25}}/>
                            </Tooltip>
                            }
                        </span>
                                <ListItemText
                                    primary={getCorporate(tr?.CorporateFinance?.Corporate)}
                                    secondary={getCalc(tr)}
                                    sx={{textAlign: "right"}}/>
                                <ListItemText
                                    primary={getCurrentAmount(tr)}
                                    secondary={"انجام شده در : " + new Date(tr?.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                    sx={{textAlign: "right"}}/>
                                <span
                                    className={"kt-widget4__number " + getColorClassByAmount(tr?.Amount)}>{toPriceWithComma(tr?.Amount) + " تومان"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
            {corporateTransaction.filter(tr => tr.TransactionType == "CREDIT").length > 0 &&
            <div className="kt-portlet ">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">تراکنش‌های اعتبار شرکت</h3>
                    </div>
                </div>
                <div className="kt-portlet__body">
                    <div className="kt-widget4">
                        {corporateTransaction.filter(tr => tr.TransactionType == "CREDIT").map((tr, num) => (
                            <div key={num} className="kt-widget4__item">
                        <span className="kt-widget4__icon">
                                    {(tr?.TransactionStatus !== "COMPLETE") && (
                                        <Tooltip title={TransactionStatus[tr?.TransactionStatus]} placement="top">
                                            <NotInterested className={getColorClassByTrStatus(tr.TransactionStatus)}
                                                           sx={{fontSize: 15}}/>
                                        </Tooltip>)}
                            {(tr?.TransactionType == "CREDIT") &&
                            <Tooltip title={"اعتبار"} placement="top">
                                <AttachMoney className={getColorClassByAmount(tr?.Amount)} sx={{fontSize: 25}}/>
                            </Tooltip>
                            }
                            {(tr?.TransactionType == "DEPOSIT") &&
                            <Tooltip title={"شارژ"} placement="top">
                                <AccountBalanceWallet className={getColorClassByAmount(tr?.Amount)}
                                                      sx={{fontSize: 25}}/>
                            </Tooltip>
                            }
                        </span>
                                <ListItemText
                                    primary={getCorporate(tr?.CorporateFinance?.Corporate)}
                                    secondary={getCalc(tr)}
                                    sx={{textAlign: "right"}}/>
                                <ListItemText
                                    primary={getCurrentAmount(tr)}
                                    secondary={"انجام شده در : " + new Date(tr?.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                    sx={{textAlign: "right"}}/>
                                <span
                                    className={"kt-widget4__number " + getColorClassByAmount(tr?.Amount)}>{toPriceWithComma(tr?.Amount) + " تومان"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default _CorporateTransactions;
