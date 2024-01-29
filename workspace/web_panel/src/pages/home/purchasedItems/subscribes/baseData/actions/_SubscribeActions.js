import React from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {Button} from "@mui/material";

const _SubscribeActions = ({subscribe,transactions}) => {
    return (
        <Portlet>
            <PortletHeader title="عملیات" />

            <PortletBody>
                <Button
                    fullWidth
                    variant="contained" color={"error"}
                    size="large"
                    sx={{my: 1}}
                    // onClick={(e) => setItemToDelete(row)}
                    // disabled={invoice.Status !== "COMPLETED"}
                >
                    باز پرداخت
                </Button>
            </PortletBody>
        </Portlet>
    );
};

export default _SubscribeActions;
