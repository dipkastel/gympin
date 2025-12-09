import React, {useContext, useEffect, useState} from 'react';
import {Badge, Tab, Tabs, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {TicketFoodMenu_getDates} from "../../network/api/TicketFoodMenu.api";


const _CateringSelectDate = ({selectedDate, setSelectedDate, catering, AllOrders}) => {

    const error = useContext(ErrorContext);
    const [activeDates, setActiveDates] = useState(null);
    const [dates, setDates] = useState([]);
    var day = 86400000;

    useEffect(() => {
        var initDates = [];
        var tmpDate = new Date().getTime();
        for (var i = catering.LastOrderDayCount; i < 30 + catering.LastOrderDayCount; i++) {
            initDates.push({Date: new Date(tmpDate + i * day)})
        }
        setDates(initDates);
    }, []);


    useEffect(() => {
        getActiveDates();
    }, []);


    function getActiveDates() {
        TicketFoodMenu_getDates({cateringId: catering.Id}).then(result => {
            setActiveDates(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function isDisable(item) {
        return !activeDates?.includes(new Date(item)?.toISOString()?.split('T')[0]);
    }


    function getDateItemCount(itemDate) {
        var orders = AllOrders?.filter(o => (new Date(o.Date).toDateString()) == itemDate.toDateString());
        if(!orders)
            return 0;
        return orders.map(o=>o.Count).reduce((a, b) => a + b, 0);
    }

    function getLabel(itemDate) {
        return (<Badge badgeContent={ getDateItemCount(itemDate)}
                       color={AllOrders?.filter(o => (new Date(o.Date).toDateString()) == itemDate.toDateString())?.Ordered ? "success" : "info"}
                       variant={"standard"}
                       sx={{mx:1.3,mt:1}}
        ><Grid sx={{p: 1, borderRadius: 3, border: "1px solid"}} disabled={isDisable(itemDate)}>

            <Typography sx={{textDecoration: isDisable(itemDate) ? "line-through" : "none"}}
                        variant={"h6"}>
                {new Date(itemDate).toLocaleDateString('fa-IR', {
                    weekday: 'long'
                })}
            </Typography>
            <Typography variant={"caption"}> {new Date(itemDate).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} </Typography>

        </Grid> </Badge>)
    }


    return (
        <Tabs
            value={selectedDate?? false}
            onChange={(e, v) => setSelectedDate(v)}
            variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile
        >

            {dates?.map((item, number) => (
                <Tab
                    key={item.Date}
                    color={"secondary"}
                    label={getLabel(item.Date)}
                    value={item.Date.toLocaleDateString("en-US")}
                    sx={{px: 0}}
                    disabled={isDisable(item.Date)}
                />
            ))}
        </Tabs>
    );
};

export default _CateringSelectDate;
