import React, {useContext, useState} from 'react';
import {useSelector} from "react-redux";
import {getCheckoutType} from "../../../helper/serverSettingsHelper";
import {Card, CardContent, CircularProgress, MenuItem, OutlinedInput, Select} from "@mui/material";
import {user_SetUserSettings} from "../../../network/api/user.api";
import store from "../../../helper/redux/store";
import {sagaActions} from "../../../helper/redux/actions/SagaActions";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _CheckoutTypes = () => {
    const error = useContext(ErrorContext);
    const [serverSettings] = useState(useSelector(settings => settings));
    const [currentCheckoutType, setCurrentCheckoutType] = useState(getCheckoutType(serverSettings))
    const user = useSelector(({auth: {user}}) => user);
    const [loading, setLoading] = useState(false);

    if (!getCheckoutType(serverSettings)) return (<></>);


    function changeUserSettings(value) {
        setLoading(true);
        user_SetUserSettings({
            Id: serverSettings?.settings?.server?.UserSettings?.find(s => s.Key === "USER_CHECKOUT_TYPE")?.Id,
            Value: value,
            Key: serverSettings?.settings?.server?.UserSettings?.find(s => s.Key === "USER_CHECKOUT_TYPE")?.Key,
            User: {Id: user.Id}
        }).then(result => {
            setCurrentCheckoutType(result.data.Data.Value);
            setLoading(false);
            store.dispatch(sagaActions.RequestServerSettings(user));
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <div>
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    {loading &&
                    <CircularProgress/>}
                    {!loading && <>
                        {"نوع پرداخت : "}
                        <Select
                            name="CheckoutType"
                            onChange={e => {
                                changeUserSettings(e.target.value)
                            }}
                            value={currentCheckoutType || "SIMPLE"}
                            input={<OutlinedInput label="توع پرداخت "/>}
                        >
                            <MenuItem value={"SIMPLE"}>ساده</MenuItem>
                            <MenuItem value={"MODERATE"}>مدیریت شده</MenuItem>
                            <MenuItem value={"ADVANCED"}>پیشرفته</MenuItem>
                        </Select>
                    </>}

                </CardContent>
            </Card>
        </div>
    );
};

export default _CheckoutTypes;
