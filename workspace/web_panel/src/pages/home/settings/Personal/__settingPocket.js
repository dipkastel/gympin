import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Typography} from "@mui/material";

const __settingPocket = () => {


    return(<>

        {Object.keys(localStorage).map(key=>(
            <Portlet key={key}>
                    <PortletHeader
                        title={<>
                            <Typography variant={"subtitle1"} >{key}</Typography>
                        </>}
                    />
                    <PortletBody className={"p-2"}>
                        <Typography variant={"subtitle1"} ><code>{localStorage.getItem(key)}</code></Typography>
                    </PortletBody>
            </Portlet>
            ))}
    </>)
};

export default __settingPocket;
