import React from 'react';
import _ListItem from "../../components/_ListItem";
import _CheckoutTypes from "./partials/_CheckoutTypes";

const Settings = () => {
    return (
        <>
            <_CheckoutTypes />
            <_ListItem title="خروج" destination="/auth/logout"/>
        </>
    );
};

export default Settings;
