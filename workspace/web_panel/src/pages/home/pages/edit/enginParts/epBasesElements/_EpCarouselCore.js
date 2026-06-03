import React from 'react';
import _EpBase from "../partials/_EpBase";
import { Square, ViewCarousel, ViewColumn} from "@mui/icons-material";
import {PagesViewTypes} from "../../../../../../helper/enums/PagesViewTypes";
import _EpCarouselSimpleList from "./_epCarousel/_EpCarouselSimpleList";
import _EpCarouselButtonList from "./_epCarousel/_EpCarouselButtonList";
import _EpCarouselIncredibleList from "./_epCarousel/_EpCarouselIncredibleList";

const _EpCarouselCore = ({item, elements,reloadPage}) => {

    function renderView(viewType){
        switch (viewType){
            case PagesViewTypes.CAROUSEL.SIMPLE_LIST:return <_EpCarouselSimpleList items={item?.Items} parent={item} elements={elements} icon={<ViewColumn /> } reloadPage={reloadPage}/>;
            case PagesViewTypes.CAROUSEL.BUTTON_LIST:return<_EpCarouselButtonList items={item?.Items} parent={item} elements={elements} icon={<Square /> } reloadPage={reloadPage}/>;
            case PagesViewTypes.CAROUSEL.INCREDIBLE_LIST:return<_EpCarouselIncredibleList items={item?.Items} parent={item} elements={elements} icon={<Square /> } reloadPage={reloadPage}/>;
            default:return<>نامشخص</>;
        }
    }

    return (
        <_EpBase item={item} elements={elements} icon={<ViewCarousel/>} reloadPage={reloadPage}>
            {renderView(item.ViewType)}
        </_EpBase>
    );
};

export default _EpCarouselCore;
