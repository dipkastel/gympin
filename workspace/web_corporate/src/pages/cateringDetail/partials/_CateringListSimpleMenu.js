import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import _CateringMenuFoodList from "./_CateringMenuFoodList";
import {TicketFoodMenu_query} from "../../../network/api/TicketFoodMenu.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _CateringListSimpleMenu = ({selectedDate, catering, addOrder}) => {
    const error = useContext(ErrorContext);
    const [foods, setFoods] = useState(null);

    useEffect(() => {
        var date = new Date(selectedDate);
        TicketFoodMenu_query({
            queryType: "FILTER",
            PlaceId: catering,
            Date: date,
            paging: {
                Page: 0,
                Size: 500,
                Desc: true
            }
        }).then(result => {
            setFoods(Object.groupBy(result.data.Data.content, ({Category}) => Category))
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, [selectedDate]);


    function addItem(item) {
        addOrder(item.Id)
        // if(orders.some(p=>p.Id==item.Id)){
        //     item = {...item,Count:orders.filter(p=>p.Id==item.Id)[0].Count+1}
        //     setOrders([...orders.filter(p=>p.Id!==item.Id),item])
        // }else{
        //     item = {...item,Count:1}
        //     setOrders([...orders,item])
        // }
    }

        return (
            <Grid sx={{m: 1}} container columns={12} spacing={2}>
                {Object.keys(foods || [])?.map(item => (
                    <Grid size={{xs: 12, sm: 12, md: 12, lg: 6, xl: 6}}>
                        <_CateringMenuFoodList title={item} Items={foods[item]} onAddClick={(item) => addItem(item)}/>
                    </Grid>
                ))}

            </Grid>
        );

};

export default _CateringListSimpleMenu;
