import React, {useContext, useEffect, useState} from "react";
import __AlertPlaceActivity from "./__AlertPlaceActivity";
import __AlertNotifications from "./__AlertNotifications";
import __AlertPlaceContract from "./__AlertPlaceContract";
import __AlertPlacePeymentMethods from "./__AlertPlacePeymentMethods";
import {useSelector} from "react-redux";
import {gym_getMyPlaceGymById} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _DashAlerts = () => {

    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [inplace, setInplace] = useState(null)

    const [notificationPermission, SetNotificationPermission] =
        useState("granted");
    useEffect(() => {
        try {
            SetNotificationPermission(Notification?.permission);
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        if(!place) return;
        gym_getMyPlaceGymById(place.Id).then((result) => {
            setInplace(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [place]);

    if (!inplace?.HasContract)
        return <__AlertPlaceContract/>
    else if (!inplace?.HasPaymentMethod)
        return <__AlertPlacePeymentMethods/>
    else if (!inplace?.Status == "ACTIVE")
        return <__AlertPlaceActivity ShowIfActive={false}/>
    else if (!notificationPermission == "granted")
        return <__AlertNotifications notificationPermission={notificationPermission} SetNotificationPermission={SetNotificationPermission} />;
    else
        return (<></>)
};

export default _DashAlerts;
