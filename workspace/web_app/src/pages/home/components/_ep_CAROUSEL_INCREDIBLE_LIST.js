import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {gym_query} from "../../../network/api/gym.api";
import __placeListItemSlick from "./_ep_CAROUSEL_SIMPLE_LIST_ITEM_SIMPLE_GYM";
import Slick from "react-slick";
import {CircularProgress, Grid2 as Grid, Typography} from "@mui/material";
import {getListByViewType, getQueryResults} from "./_ep_queries";

const _ep_CAROUSEL_INCREDIBLE_LIST = ({carousel}) => {

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
            {items&&carousel&&<Grid sx={{bgcolor:"#d7222d",py:2,mt:4,mb:2}}>
                <Grid sx={{mx:2}}>
                    <img src={"/assets/images/svg/incredibleicon.svg"} width={"35px"}/>
                    <Typography variant={"caption"} sx={{fontSize:"1.2rem",fontWeight:600,color:"#FFFFFF",ml:2}}>{carousel?.Description}</Typography>
                </Grid>
                <Slick {...JSON.parse(carousel?.Data)}>
                    {[...items,...items,...items]?.map((item, index) => getListByViewType(itemType,item))}
                </Slick>
            </Grid>}
            {!items&&
            <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%", height: "150px" }}>
                <CircularProgress />
            </Grid>}
        </>
    );
};

export default _ep_CAROUSEL_INCREDIBLE_LIST;
