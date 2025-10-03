import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {LinearProgress, ListItemText, Tooltip, Typography} from "@mui/material";
import {TransactionStatus} from "../../../../../helper/enums/TransactionStatus";
import {AccountBalanceWallet, AttachMoney, Description, NotInterested} from "@mui/icons-material";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {UserFinanceTypesEnum} from "../../../../../helper/enums/UserFinanceTypesEnum";

const _UserTransactions = ({userTransactions}) => {
    if (!userTransactions)
        return (<>
            <Portlet>
                <PortletHeader title={"تراکنش‌های حساب کاربر"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (userTransactions.length < 1)
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

            {tr?.Description&&
            <Tooltip title={tr?.Description} placement="top">
                <Description sx={{color:"#f44fd3"}} />
            </Tooltip>}
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
                        <h3 className="kt-portlet__head-title">تراکنش‌های حساب کاربر</h3>
                    </div>
                </div>
                <div className="kt-portlet__body">
                    <div className="kt-widget4">
                        {userTransactions.map((tr, num) => (
                            <div>
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
                                    primary={getUserFixedName(tr?.FinanceUser?.User)}
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
                                <Typography variant={"overline"} >
                                    {"انجام شده توسط : " +getUserFixedName(tr?.CreatorUser)}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default _UserTransactions;
