import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, Paper, Tab, Tabs, Typography} from "@mui/material";
import {TicketFoodMenu_getDates} from "../../../network/api/TicketFoodMenu.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import Grid from "@mui/material/Grid2";


const _FoodSelectDate = ({selectedDate, setSelectedDate, catering}) => {

    const error = useContext(ErrorContext);
    const [activeDates, setActiveDates] = useState(null);

    const [dates, setDates] = useState([]);
    var day = 86400000;

    useEffect(() => {
        var initDates = [];
        var tmpDate = new Date().getTime();
        for (var i = 0; i < 30; i++) {
            tmpDate = tmpDate + day;
            initDates.push({Date: new Date(tmpDate)})
        }
        setDates(initDates);
    }, []);
    useEffect(()=>{
       console.log(selectedDate);
    },[selectedDate])


    useEffect(() => {
        getActiveDates();
    }, []);

    function getActiveDates() {
        TicketFoodMenu_getDates({cateringId: catering}).then(result => {
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

    function getLabel(itemDate) {
        return (<Grid sx={{p:2,borderRadius:3,border:"1px solid"}} disabled={isDisable(itemDate)}>
                    <Typography sx={{textDecoration:isDisable(itemDate)?"line-through":"none"}} variant={"h6"}> {new Date(itemDate).toLocaleDateString('fa-IR', {
                        weekday: 'long'
                    })}</Typography>
                    <Typography variant={"caption"}> {new Date(itemDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })} </Typography>
        </Grid>)
    }


    return (
        <Paper sx={{m: 1}}>
            <Tabs
                value={selectedDate}
                onChange={(e, n) => setSelectedDate(n)}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >

                {dates?.map((item, number) => (
                    <Tab key={item.Date} color={"secondary"} label={getLabel(item.Date)} value={item.Date.toLocaleDateString()}
                         disabled={isDisable(item.Date)} />
                ))}
            </Tabs>

        </Paper>
    );
};

export default _FoodSelectDate;
