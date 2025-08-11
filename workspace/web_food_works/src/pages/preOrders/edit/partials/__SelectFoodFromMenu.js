import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import AsyncSelect from "react-select/async";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../../../helper/utils";
import {TicketFoods_query} from "../../../../network/api/TicketFoods.api";
import {TicketFoodMenu_query} from "../../../../network/api/TicketFoodMenu.api";

const __SelectFoodFromMenu = ({hidden,onChange,cateringId,name,date}) => {

    const error = useContext(ErrorContext);

    useEffect(() => {
        if(hidden)
            onChange({value:null});
    }, [hidden]);


    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm.Food.Name}</Typography>
                    <Typography variant={"body2"}>{toPriceWithComma(itm.Food.Price)}</Typography>
                </Grid>)
            }

            TicketFoodMenu_query({
                queryType: "FILTER",
                Name: inputValue,
                PlaceId:cateringId,
                Date:date,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: getLabelOfUser(itm), value: itm.Id}
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
                         name={name}
                         label="آیتم"
                         placeholder="آیتم"
                         onChange={onChange}
                         loadOptions={promiseUserOptions}/>}
        </>
    );
};

export default __SelectFoodFromMenu;
