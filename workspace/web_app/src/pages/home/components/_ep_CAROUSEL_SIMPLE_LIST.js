import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import _ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM from "./_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM";
import {gym_query} from "../../../network/api/gym.api";
import Slick from "react-slick";
import {CircularProgress, Grid2 as Grid} from "@mui/material";
import _ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_SUBSCRIBE from "./_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_SUBSCRIBE";
import {getListByViewType, getQueryResults} from "./_ep_queries";

const _ep_CAROUSEL_SIMPLE_LIST = ({carousel}) => {

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
            {items && carousel && <Slick {...JSON.parse(carousel?.Data)}>
                {[...items, ...items, ...items]?.map((item, index) => getListByViewType(itemType,item))}
            </Slick>}
            {!items &&
            <Grid container justifyContent="center" alignItems="center" sx={{width: "100%", height: "150px"}}>
                <CircularProgress/>
            </Grid>}
        </>
    );
};

export default _ep_CAROUSEL_SIMPLE_LIST;
