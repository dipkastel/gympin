import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import _CateringMenuFoodList from "./_CateringMenuFoodList";
import {TicketFoodMenu_query} from "../../../network/api/TicketFoodMenu.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Card, Typography} from "@mui/material";
import {Edit, ExpandMore} from "@mui/icons-material";
import _CateringMenuFoodImageList from "./_CateringMenuFoodImageList";

const _CateringListImageMenu = ({selectedDate, catering, addOrder,minusOrder,deleteOrder,orders}) => {
    const error = useContext(ErrorContext);
    const [foods, setFoods] = useState(null);

    useEffect(() => {
        var date = new Date(selectedDate);
        if (!date) return;
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


    function addItem(e,item) {
        e.preventDefault();
        addOrder(item.Id)
    }

    function minusItem(e,item) {
        e.preventDefault();
        minusOrder(item)
    }

    function deleteItem(e,item) {
        e.preventDefault();
        deleteOrder(item)
    }

        return (
            <>


                <Grid sx={{m: 1}} container columns={12} spacing={2}>
                    {Object.keys(foods || [])?.map(item => (
                        <Grid size={{xs: 12, sm: 12, md: 12, lg: 12, xl: 12}}>
                            <_CateringMenuFoodImageList
                                title={item}
                                Items={foods[item]}
                                onAddClick={addItem}
                                onDeleteClick={deleteItem}
                                onMinusClick={minusItem}
                                selected={orders}/>
                        </Grid>
                    ))}
                </Grid>
            </>
        );

};

export default _CateringListImageMenu;
