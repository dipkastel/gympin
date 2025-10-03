import React from 'react';
import {Portlet, PortletBody} from "../../../../partials/content/Portlet";
import {ListItemText} from "@mui/material";
import {toPriceWithComma} from "../../../../../helper";

const InvoiceDetailPricesData = ({invoice}) => {
    return (
        <Portlet>
            <PortletBody>
                <ListItemText
                    primary={"قیمت قابل پرداخت"}
                    secondary={toPriceWithComma(invoice.PriceToPay)}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"مبلغ کل"}
                    secondary={toPriceWithComma(invoice.TotalPrice)}
                    sx={{ textAlign:"right" }}/>

            </PortletBody>
        </Portlet>
    );
};

export default InvoiceDetailPricesData;
