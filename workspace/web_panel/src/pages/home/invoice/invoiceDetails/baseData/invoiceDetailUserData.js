import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {ListItemText} from "@mui/material";
import {userGenders} from "../../../../../helper/enums/genders";

const InvoiceDetailUserData = ({invoice}) => {
    return (
        <Portlet>
            <PortletHeader
                title={"کاربر"}
            />
            <PortletBody>

                <ListItemText
                    primary={"نام و نام خانوادگی"}
                    secondary={invoice.User.FullName}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"تلفن کاربر"}
                    secondary={invoice.User.PhoneNumber}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"نام کاربری"}
                    secondary={invoice.User.Username}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"جنسیت"}
                    secondary={userGenders[invoice.User.Gender]}
                    sx={{ textAlign:"right" }}/>
                <ListItemText
                    primary={"وضعیت کاربر"}
                    secondary={invoice.User.UserStatus}
                    sx={{ textAlign:"right" }}/>

            </PortletBody>
        </Portlet>
    );
};

export default InvoiceDetailUserData;
