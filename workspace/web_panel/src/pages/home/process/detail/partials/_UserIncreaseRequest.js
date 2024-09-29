import React from 'react';
import {LinearProgress, ListItemText, Tooltip, Typography} from "@mui/material";
import {CheckCircle, Dangerous, Description, HourglassTop, NewReleases} from "@mui/icons-material";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {DepositStatus} from "../../../../../helper/enums/DepositStatus";
import {getCorporateFixedName, getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {GatewayType} from "../../../../../helper/enums/GatewayType";

const _UserIncreaseRequest = ({UserIncreaseRequest}) => {
    if (!UserIncreaseRequest)
        return (<>
            <Portlet>
                <PortletHeader title={"درخواست افزایش شارژ"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (UserIncreaseRequest.length < 1)
        return (<></>);

    function getColorClassByAmount(Amount) {
        return (Amount > 0) ? "kt-font-success" : "kt-font-danger";
    }

    function getRequestInfo1(tr) {
        return (<>
            {GatewayType[tr.GatewayType]}
            {tr?.Description&&
            <Tooltip title={tr?.Description} placement="top">
                <Description sx={{color:"#f44fd3"}} />
            </Tooltip>}
            {tr?.SerialDescription&&
            <Tooltip title={tr?.SerialDescription} placement="top">
                <Description sx={{color:"#267272"}} />
            </Tooltip>}

        </>)
    }

    return (
        <div className="kt-portlet ">
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">درخواست افزایش شارژ</h3>
                </div>
            </div>
            <div className="kt-portlet__body">
                <div className="kt-widget4">

                    {UserIncreaseRequest.map((tr, num) => (
                        <div key={num} className="kt-widget4__item">
                        <span className="kt-widget4__icon">
                            <Tooltip title={DepositStatus[tr?.DepositStatus]} placement="top">
                                <div>
                                {(tr?.DepositStatus === "REQUESTED") && (
                                    <NewReleases className={"kt-font-primary"} sx={{fontSize: 15}}/>)}
                                    {(tr?.DepositStatus === "BANK_PENDING") && (
                                        <HourglassTop className={"kt-font-warning"} sx={{fontSize: 15}}/>)}
                                    {(tr?.DepositStatus === "CONFIRMED") && (
                                        <CheckCircle className={"kt-font-success"} sx={{fontSize: 15}}/>)}
                                    {(tr?.DepositStatus === "REJECTED") && (
                                        <Dangerous className={"kt-font-danger"} sx={{fontSize: 15}}/>)}
                                </div>
                            </Tooltip>
                        </span>
                                <ListItemText
                                    primary={getUserFixedName(tr?.User)}
                                    secondary={<Typography variant={"caption"} sx={{maxWidth:"165px"}} component={"p"}>{tr?.Refrence}</Typography>}
                                    sx={{textAlign: "right"}}/>
                                <ListItemText
                                    primary={getRequestInfo1(tr)}
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
    );
};

export default _UserIncreaseRequest;
