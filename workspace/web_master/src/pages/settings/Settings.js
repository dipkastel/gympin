import React, {useEffect} from 'react';
import _SettingsPlaces from "./_SettingsPlaces";
import _ListItem from "../management/_ListItem";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import _PlaceGates from "../management/_PlaceGates";
import {connect, useSelector} from "react-redux";
import {sagaActions} from "../../helper/redux/actions/SagaActions";

const Settings = () => {

    return (
        <>
            <_SettingsPlaces/>
            {getAccessOf(personnelAccessEnumT.ManagementSettingsQr)&&<_ListItem title="کنترل qr کد ها" destination="/management/qrManagement"/>}
            <_ListItem title="خروج" destination="/auth/logout"/>
        </>
    );
};

export default Settings;
