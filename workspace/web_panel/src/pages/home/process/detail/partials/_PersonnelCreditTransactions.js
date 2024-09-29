import React from 'react';
import {LinearProgress, ListItemText, Tooltip} from "@mui/material";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {AccountBalanceWallet, AttachMoney, NotInterested} from "@mui/icons-material";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";

const _PersonnelCreditTransactions = ({personelCreditTransaction}) => {

    if (!personelCreditTransaction)
        return (<>
            <Portlet>
                <PortletHeader title={"تراکنش‌های حساب اعتباری"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (personelCreditTransaction.length < 1)
        return (<></>);



    function getColorClassByAmount(Amount) {
        return (Amount > 0) ? "kt-font-success" : "kt-font-danger";
    }

    function getColorClassByTrStatus(trst) {
        return (trst === "COMPLETE") ? "kt-font-success" : "kt-font-warning";
    }

    function getCurrentAmount(tr) {
        return (<>
            {"سازمان "+tr.CorporateName+" - اعتبار فعلی : "+toPriceWithComma(tr?.CurrentTotalCredit)}
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
                        <h3 className="kt-portlet__head-title">تراکنش‌های حساب اعتباری</h3>
                    </div>
                </div>
                <div className="kt-portlet__body">
                    <div className="kt-widget4">
                        {personelCreditTransaction.map((tr, num) => (
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
                                    primary={getUserFixedName(tr?.Credit?.CorporatePersonnel?.User)}
                                    secondary={getCalc(tr)}
                                    sx={{textAlign: "right"}}/>
                                <ListItemText
                                    primary={getCurrentAmount(tr)}
                                    secondary={"انجام شده در : "+new Date(tr?.CreatedDate).toLocaleDateString('fa-IR', {
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
        </>
    );
};

export default _PersonnelCreditTransactions;
