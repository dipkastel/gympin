import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {toPriceWithComma} from "../../../../../../helper";
import {SubscribeStatus} from "../../../../../../helper/enums/SubscribeStatus";

const _SubscribeSerial = ({subscribe}) => {
    return (
        <Portlet>
            <PortletHeader title="سریال" />

            <PortletBody>
                <Typography variant={"h5"}
                            sx={{my: 1}} component="p">{subscribe?.Serial?.Serial}</Typography>
            </PortletBody>
        </Portlet>
    );
};

export default _SubscribeSerial;
