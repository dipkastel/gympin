import React from 'react';
import {Grid} from "@mui/material";
import _EpBase from "../partials/_EpBase";
import {HelpCenter} from "@mui/icons-material";

const _EpUnknownItem = ({item ,elements,destinations, reloadPage}) => {
    return (
        <_EpBase item={item} parent={item}  elements={elements} destinations={destinations}  icon={<HelpCenter />} reloadPage={reloadPage}>
            <div>ثبت نشده</div>
        </_EpBase>
    );
};

export default _EpUnknownItem;
