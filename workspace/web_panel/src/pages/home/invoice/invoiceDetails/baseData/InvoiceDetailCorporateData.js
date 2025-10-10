import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ListItemText} from "@mui/material";
import {userGenders} from "../../../../../helper/enums/genders";

const InvoiceDetailCorporateData = ({invoice}) => {
    return (
        <Portlet>
            <PortletHeader
                title={"سازمان"}
            />
            <PortletBody>

                <ListItemText
                    primary={"نام سازمان"}
                    secondary={invoice.Corporate.Name}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"وضعیت سازمان"}
                    secondary={invoice.Corporate.Status}
                    sx={{ textAlign:"right" }}/>

            </PortletBody>
        </Portlet>
    );
};

export default InvoiceDetailCorporateData;
