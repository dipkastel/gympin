import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader} from "../../../../partials/content/Portlet";
import {Divider, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import adapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers";
import Typography from "@mui/material/Typography";
import {toPriceWithComma} from "../../../../../helper";

const _TicketInfo = ({ticket}) => {

    return (
        <Portlet>
            <PortletHeader title="اطلاعات اولیه" />

            <PortletBody>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"خریدار : "}</Typography></div>
                    <div className={"col-8"}>
                        {ticket.User&&<Typography variant={"h6"} component="p">{`${ticket.User.FullName} (${ticket.User.Username})`}</Typography>}</div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"فروشنده : "}</Typography></div>
                    <div className={"col-8"}>
                        {ticket.Plan&&<Typography variant={"h6"} component="p">{`${ticket.Plan.Place.Name}`}</Typography>}</div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"نام پلن : "}</Typography></div>
                    <div className={"col-8"}>
                        <Typography variant={"h6"} component="p">{ticket.PlanName}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"توضیح پلن : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{ticket.Description}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تعداد ورود های مجاز : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{ticket.EntryTotalCount}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تعداد ورود ها تا کنون : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{ticket.EntryList?ticket.EntryList.length:0}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تاریخ انقضا : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{new Date(ticket.ExpireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تاریخ انقضا پلن : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{new Date(ticket.PlanExpireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"قیمت پلن : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{toPriceWithComma(ticket.Price)}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"سریال : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{ticket.Serial}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"وضعیت : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{ticket.Status}</Typography></div>
                </div>
            </PortletBody>
        </Portlet>
    );
};

export default _TicketInfo;
