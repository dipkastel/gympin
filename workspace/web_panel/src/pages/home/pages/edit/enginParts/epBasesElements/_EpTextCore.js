import React from 'react';
import _EpBase from "../partials/_EpBase";
import {FormatSize, Rtt, Title} from "@mui/icons-material";
import {PagesViewTypes} from "../../../../../../helper/enums/PagesViewTypes";
import _EpTextSimpleTitle from "./_epText/_EpTextSimpleTitle";
import _EpTextTitleMore from "./_epText/_EpTextTitleMore";

const _EpTextCore = ({item, elements,reloadPage}) => {

    function renderView(viewType){
        switch (viewType){
            case PagesViewTypes.TEXT.SIMPLE_TITLE:return <_EpTextSimpleTitle items={item?.Items} parent={item} elements={elements} icon={<Rtt /> } reloadPage={reloadPage}/>;
            case PagesViewTypes.TEXT.TITLE_MORE:return <_EpTextTitleMore items={item?.Items} parent={item} elements={elements} icon={<FormatSize /> } reloadPage={reloadPage}/>;
            default:return<>نامشخص</>;
        }
    }

    return (
        <_EpBase item={item} elements={elements} icon={<Title/>} reloadPage={reloadPage}>
            {renderView(item.ViewType)}
        </_EpBase>
    );
};

export default _EpTextCore;
