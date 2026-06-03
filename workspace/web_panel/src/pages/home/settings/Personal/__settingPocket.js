import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {Typography} from "@mui/material";

const __settingPocket = () => {


    return (<>

        <div className={"row"}>
            {Object.keys(localStorage).map(key => (
                <div className={"col-md-6"} key={key}>
                    <Portlet className={"kt-portlet kt-portlet--height-fluid"}>
                        <PortletHeader
                            className={"kt-portlet__head"}
                            title={<>
                                <Typography variant={"subtitle1"}>{key}</Typography>
                            </>}
                        />
                        <PortletBody className={"kt-portlet__body"}>
                            <Typography variant={"subtitle1"}><code>{localStorage.getItem(key)}</code></Typography>
                        </PortletBody>
                    </Portlet>
                </div>
            ))}
        </div>
    </>)
};

export default __settingPocket;
