import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import Typography from "@mui/material/Typography";
import {ProcessTypeEnum} from "../../../../../../helper/enums/ProcessTypeEnum";

const _SubscribeSerial = ({subscribe}) => {
    return (
        <Portlet>
            <PortletHeader title="سریال"/>

            <PortletBody>
                {subscribe?.Serial?.map(ser => (
                    <a href={"/process/detail/" + ser.Id} key={ser?.Serial}>
                        <Typography variant={"h5"}
                                    sx={{my: 1}}>{ProcessTypeEnum[ser?.ProcessType] + " : "}</Typography>
                        <Typography variant={"h6"}
                                    sx={{my: 1}} component="p">{ser?.Serial}</Typography>
                    </a>
                ))}
            </PortletBody>
        </Portlet>
    );
};

export default _SubscribeSerial;
