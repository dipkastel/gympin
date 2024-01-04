import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {toPriceWithComma} from "../../../../../../helper";
import {SubscribeStatus} from "../../../../../../helper/enums/SubscribeStatus";

const _SubscribeInfo = ({subscribe}) => {
    return (
        <Portlet>
            <PortletHeader title="اطلاعات اولیه" />

            <PortletBody>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"خریدار : "}</Typography></div>
                    <div className={"col-8"}>
                        {subscribe.User&&<Typography variant={"h6"} component="p">{`${subscribe?.User?.FullName} (${subscribe?.User?.Username})`}</Typography>}</div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"فروشنده : "}</Typography></div>
                    <div className={"col-8"}>
                        {subscribe.TicketSubscribe&&<Typography variant={"h6"} component="p">{`${subscribe.TicketSubscribe.Place.Name}`}</Typography>}</div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}>
                        <Typography variant={"h6"} component="p">{"نام عضویت : "}</Typography></div>
                    <div className={"col-8"}>
                        <Typography variant={"h6"} component="p">{subscribe.Name}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تعداد ورود های مجاز : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{subscribe.EntryTotalCount}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تعداد ورود ها تا کنون : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{subscribe.EntryList?subscribe.EntryList.length:0}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تاریخ انقضا : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{new Date(subscribe.ExpireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"تاریخ انقضا عضویت : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{new Date(subscribe.TicketSubscribeExpireDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"قیمت عضویت : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{toPriceWithComma(subscribe.Price)}</Typography></div>
                </div>
                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                <div className={"row"}>
                    <div className={"col-4"}><Typography variant={"h6"} component="p">{"توضیح عضویت : "}</Typography></div>
                    <div className={"col-8"}><Typography variant={"h6"} component="p">{subscribe.Description}</Typography></div>
                </div>
            </PortletBody>
        </Portlet>
    );
};

export default _SubscribeInfo;
