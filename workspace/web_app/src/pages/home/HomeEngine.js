import React from 'react';
import _epCarousel from "./enginParts/_epCarousel";
import _epBanner from "./enginParts/_epBanner";
import _epText from "./enginParts/_epText";

const HomeEngine = ({items}) => {
    const enginSw = (i) => {
        switch (i.Type){
            case "CAROUSEL":return <div key={i.Id}>{_epCarousel(i)}</div> ;
            case "BANNER":return <div key={i.Id}>{_epBanner(i)}</div>;
            case "TEXT":return <div key={i.Id}>{_epText(i)}</div>;
            default : return <></>
        }
    }


    return items.map(i=>enginSw(i))
};

export default HomeEngine;
