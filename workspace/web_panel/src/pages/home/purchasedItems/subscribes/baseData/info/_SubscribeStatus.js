import React, {useContext} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {PurchasedSubscribeStatus} from "../../../../../../helper/enums/PurchasedSubscribeStatus";
import {purchasedSubscribe_updateStatus} from "../../../../../../network/api/purchasedSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";

const _SubscribeStatus = ({subscribe, updatePage}) => {
    const error = useContext(ErrorContext);

    function updateStatus(value) {
        purchasedSubscribe_updateStatus({
            Id: subscribe.Id,
            Status:value
        }).then(result => {
            updatePage();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <Portlet>
            <PortletHeader title="وضعیت"/>

            <PortletBody>
                <div className={"row"}>

                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">وضعیت</InputLabel>
                        <Select

                            sx={{my: 1}}
                            label="status"
                            value={subscribe.Status || "null"}
                            onChange={e => updateStatus(e.target.value)}>
                            {Object.keys(PurchasedSubscribeStatus).map((item, number) => (
                                <MenuItem key={number} value={item}>{PurchasedSubscribeStatus[item]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </PortletBody>
        </Portlet>
    );
};

export default _SubscribeStatus;
