import React from 'react';
import {LinearProgress, ListItemText, Tooltip, Typography} from "@mui/material";
import {CheckCircle, Dangerous, Description, HourglassTop, NewReleases} from "@mui/icons-material";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {DepositStatus} from "../../../../../helper/enums/DepositStatus";
import {getCorporateFixedName, getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {GatewayType} from "../../../../../helper/enums/GatewayType";
import {UserFinanceTypesEnum} from "../../../../../helper/enums/UserFinanceTypesEnum";

const _SettlementRequest = ({settlementRequest}) => {
    if (!settlementRequest)
        return (<>
            <Portlet>
                <PortletHeader title={"درخواست تسویه حساب"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (settlementRequest.length < 1)
        return (<></>);

    function getColorClassByAmount(Amount) {
        return (Amount > 0) ? "kt-font-success" : "kt-font-danger";
    }

    return (
        <div className="kt-portlet ">
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">درخواست تسویه حساب</h3>
                </div>
            </div>
            <div className="kt-portlet__body">
                <div className="kt-widget4">

                    {settlementRequest.map((tr, num) => (
                        <div key={num} className="kt-widget4__item">
                                <ListItemText
                                    primary={"توسط : "+getUserFixedName(tr?.CreatorUser)}
                                    secondary={"درخواست شده در : "+new Date(tr?.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                    sx={{textAlign: "right"}}/>
                                <ListItemText
                                    primary={"برای  : "+getUserFixedName(tr?.FinanceUser?.User)}
                                    secondary={"مربوط به : "+ UserFinanceTypesEnum[tr?.FinanceUser?.FinanceType]}
                                    sx={{textAlign: "right"}}/>
                                <span
                                    className={"kt-widget4__number " + getColorClassByAmount(tr?.Amount)}>{toPriceWithComma(tr?.Amount) + " تومان"}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default _SettlementRequest;
