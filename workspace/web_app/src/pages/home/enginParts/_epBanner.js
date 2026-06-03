import React from 'react';
import _ep_BANNER_BANNER_FULL from "../components/_ep_BANNER_BANNER_FULL";

const _epBanner = (banner) => {

    switch (banner?.ViewType) {
        case "BANNER_FULL":
            return <_ep_BANNER_BANNER_FULL banners={banner?.Items}/>
        default:
            return <></>
    }
};

export default _epBanner;
