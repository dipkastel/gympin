import React from 'react';
import _EpBase from "../partials/_EpBase";
import {Crop169, Vrpano} from "@mui/icons-material";
import {PagesViewTypes} from "../../../../../../helper/enums/PagesViewTypes";
import _EpBannerFull from "./_epBanner/_EpBannerFull";

const _EpBannerCore = ({item, elements,reloadPage}) => {

    function renderView(viewType){
        switch (viewType){
            case PagesViewTypes.BANNER.BANNER_FULL:return <_EpBannerFull items={item?.Items} parent={item} elements={elements} icon={<Vrpano /> } reloadPage={reloadPage}/>;
            default:return<>نامشخص</>;
        }
    }

    return (
        <_EpBase item={item} elements={elements} icon={<Crop169/>} reloadPage={reloadPage}>
            {renderView(item.ViewType)}
        </_EpBase>
    );
};

export default _EpBannerCore;
