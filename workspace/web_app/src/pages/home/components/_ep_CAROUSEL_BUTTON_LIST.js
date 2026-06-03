import React, {useContext, useEffect, useState} from 'react';
import Slick from "react-slick";
import {Grid2 as Grid, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {getListByViewType, getQueryResults} from "./_ep_queries";
import _ep_CAROUSEL_BUTTON_LIST_ITEM from "./_ep_CAROUSEL_BUTTON_LIST_ITEM";

const _ep_CAROUSEL_BUTTON_LIST = ({carousel}) => {

    const error = useContext(ErrorContext);
    const [items, setItems] = useState(null);
    const itemType = carousel?.Items?.[0]?.ViewType;

    useEffect(() => {
        if(carousel&&error)
            getQueryResults(carousel,error).then(result=>{
                setItems(result);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, [carousel,error]);

    return (
        <>
            {items&&<Slick {...JSON.parse(carousel?.Data)}>
                {[...items, ...items, ...items]?.map((item, index) => (getListByViewType(itemType,item)))}
            </Slick>}
        </>
    );
};

export default _ep_CAROUSEL_BUTTON_LIST;
