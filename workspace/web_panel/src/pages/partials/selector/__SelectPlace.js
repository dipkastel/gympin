import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import AsyncSelect from "react-select/async";
import {corporate_query} from "../../../network/api/corporate.api";
import {toPriceWithComma} from "../../../helper";
import {PlaceGym_query} from "../../../network/api/place.api";

const __SelectPlace = ({hidden,onChange,value}) => {

    const error = useContext(ErrorContext);

    useEffect(() => {
        if(hidden)
            onChange({value:null});
    }, [hidden]);


    const promisePlace = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfPlace(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm.Name}</Typography>
                    <Typography variant={"body2"}>{itm?.Location?.Name}</Typography>
                    <Typography variant={"body2"}>{itm?.Status}</Typography>
                </Grid>)
            }

            PlaceGym_query({
                queryType: "SEARCH",
                SearchStr: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: getLabelOfPlace(itm), value: itm.Id}
                }));
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        });
    }

    return (
        <>
            {!hidden&&<AsyncSelect cacheOptions defaultOptions
                         name={"selectPlace"}
                         label="مرکز"
                         placeholder="مرکز"
                         onChange={onChange}
                         loadOptions={promisePlace}/>}
        </>
    );
};

export default __SelectPlace;
