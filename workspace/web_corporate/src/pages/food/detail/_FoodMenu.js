import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import _RChargeUsage from "../../report/Finance/_RChargeUsage";
import {Card, CardContent} from "@mui/material";
import _FoodMenuList from "./_FoodMenuList";
import {TicketFoodMenu_query} from "../../../network/api/TicketFoodMenu.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _FoodMenu = ({selectedDate,catering}) => {
    const error = useContext(ErrorContext);
    const [foods,setFoods] = useState(null);

    useEffect(() => {
        console.log("catering",catering);
        var date = new Date(parseInt(selectedDate));
        TicketFoodMenu_query({
            queryType: "FILTER",
            PlaceId:catering,
            Date: date?.toISOString()?.split('T')[0],
            paging: {
                Page: 0,
                Size: 500,
                Desc: true
            }
        }).then(result => {
            setFoods( Object.groupBy(result.data.Data.content, ({ Category }) => Category))
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, [selectedDate]);


    return  (
            <Grid sx={{m:1}} container columns={12} spacing={2}>
                {Object.keys(foods||[])?.map(item=>(
                    <Grid size={{xs: 12, sm: 12, md: 12,lg:6,xl:6}}>
                        <_FoodMenuList title={item} Items={foods[item]} />
                    </Grid>
                ))}

            </Grid>
    );
};

export default _FoodMenu;
