import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ListItemText} from "@mui/material";
import {userGenders} from "../../../../../helper/enums/genders";

const InvoiceDetailBaseData = ({invoice}) => {
    return (
        <Portlet>
            <PortletHeader
                title={"اطلاعات"}
            />
            <PortletBody>

                <ListItemText
                    primary={"نام و نام خانوادگی"}
                    secondary={invoice.UserFullName}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"تلفن کاربر"}
                    secondary={invoice.UserPhoneNumber}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"تاریخ و زمان ایجاد فاکتور"}
                    secondary={new Date(invoice.CreatedDate).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"جنسیت"}
                    secondary={userGenders[invoice.Gender]}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"کد ملی"}
                    secondary={invoice.NationalCode}
                    sx={{ textAlign:"right" }}/>

            </PortletBody>
        </Portlet>
    );
};

export default InvoiceDetailBaseData;
