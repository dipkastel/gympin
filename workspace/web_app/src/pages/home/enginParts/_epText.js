import React from 'react';
import Grid from "@mui/material/Grid2";
import {Typography} from "@mui/material";
import _ep_TEXT_SIMPLE_TITLE from "../components/_ep_TEXT_SIMPLE_TITLE";
import _ep_TEXT_TITLE_MORE from "../components/_ep_TEXT_TITLE_MORE";

const _epText = (item) => {


    switch (item?.ViewType) {
        case "SIMPLE_TITLE":
            return <_ep_TEXT_SIMPLE_TITLE texts={item?.Items}/>
        case "TITLE_MORE":
            return <_ep_TEXT_TITLE_MORE texts={item?.Items}/>
        default:
            return <></>
    }
};

export default _epText;
