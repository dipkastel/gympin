import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {LinearProgress, ListItemText} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";
import {InvoiceStatus} from "../../../../../helper/enums/InvoiceStatus";
import PopoverUser from "../../../../../components/popover/PopoverUser";

const _Invoice = ({serialInvoice}) => {

    if (!serialInvoice)
        return (<>
            <Portlet>
                <PortletHeader title={"فاکتور ها"}/>
                <LinearProgress/>
                <PortletBody>
                </PortletBody>
            </Portlet>
        </>);
    if (serialInvoice.length < 1)
        return (<></>);
    return (
        <div>

            <div className="kt-portlet ">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">فاکتور ها</h3>
                    </div>
                </div>
                <div className="kt-portlet__body" >
                    <div className="kt-widget4">
                        {serialInvoice.map(item => (
                            <div key={item.Id + "in"}>
                                <div className="kt-widget4__item">
                                    <PopoverUser user={item?.User} />
                                    <ListItemText
                                        primary={"مبلغ فاکتور : " + toPriceWithComma(item.TotalPrice) + " تومان"}
                                        secondary={"قابل پرداخت : " + toPriceWithComma(item.PriceToPay) + " تومان"}
                                        sx={{textAlign: "right"}}/>
                                    <ListItemText
                                        primary={InvoiceStatus[item.Status]}
                                        secondary={new Date(item?.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                        sx={{textAlign: "right"}}/>
                                </div>
                                {item?.InvoiceBuyables?.map(buyable => (
                                    <div key={"bb" + buyable.Id} className={"kt-widget4__item"}>

                                        <ListItemText
                                            primary={buyable?.Name}
                                            secondary={buyable?.Place?.Name}
                                            sx={{textAlign: "right"}}/>
                                        <ListItemText
                                            primary={toPriceWithComma(buyable?.UnitPrice) + " تومان"}
                                            secondary={buyable?.Count + " عدد"}
                                            sx={{textAlign: "left"}}/>
                                    </div>
                                ))}
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default _Invoice;
