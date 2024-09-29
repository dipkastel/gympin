import React from 'react';
import {getCorporateFixedName, getPlaceFixedName, getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {LinearProgress, ListItemText} from "@mui/material";
import {InvoiceStatus} from "../../../../../helper/enums/InvoiceStatus";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {PurchasedSubscribeStatus} from "../../../../../helper/enums/PurchasedSubscribeStatus";
import {BuyableType} from "../../../../../helper/enums/BuyableType";

const _PurchasedBases = ({purchasedBases}) => {

        if (!purchasedBases)
            return (<>
                <Portlet>
                    <PortletHeader title={"خرید ها"}/>
                    <LinearProgress/>
                    <PortletBody>
                    </PortletBody>
                </Portlet>
            </>);
        if (purchasedBases.length < 1)
            return (<></>);

        return (
            <div>

                <div className="kt-portlet ">
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">خرید ها</h3>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-widget4">
                            {purchasedBases.map(item => (
                                        <div key={"ff" + item.Id} className={"kt-widget4__item"}>
                                            <ListItemText
                                                primary={ item.Id +" - "+item?.Name+" ( "+getPlaceFixedName(item?.Place)+" )"}
                                                secondary={getUserFixedName(item?.Customer)}
                                                sx={{textAlign: "right"}}/>
                                            <ListItemText
                                                primary={BuyableType[item.PurchasedType] +(item?.PurchasedStatus?"  - ":"") +(PurchasedSubscribeStatus[item?.PurchasedStatus]||"")}
                                                secondary={toPriceWithComma(item?.SellPrice) + " تومان"}
                                                sx={{textAlign: "left"}}/>
                                        </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
export default _PurchasedBases;
