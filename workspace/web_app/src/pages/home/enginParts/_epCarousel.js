import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Slick from "react-slick";
import {Grid2 as Grid, Paper, Typography} from "@mui/material";
import __placeListItemSlick from "../components/_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM";
import {gym_query} from "../../../network/api/gym.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _ep_CAROUSEL_SIMPLE_LIST from "../components/_ep_CAROUSEL_SIMPLE_LIST";
import _ep_CAROUSEL_INCREDIBLE_LIST from "../components/_ep_CAROUSEL_INCREDIBLE_LIST";
import _epCarouselCounselingList from "./carousels/_epCarouselCounselingList";
import _ep_CAROUSEL_BUTTON_LIST from "../components/_ep_CAROUSEL_BUTTON_LIST";

const _epCarousel = (carousel) => {





    switch (carousel?.ViewType){
        case "BUTTON_LIST": return <_ep_CAROUSEL_BUTTON_LIST carousel={carousel} />
        case "SIMPLE_LIST": return <_ep_CAROUSEL_SIMPLE_LIST carousel={carousel} />
        case "INCREDIBLE_LIST": return <_ep_CAROUSEL_INCREDIBLE_LIST carousel={carousel} />
        // case "QUERY_Counselings": return <_epCarouselCounselingList />
    }
};

export default _epCarousel;
