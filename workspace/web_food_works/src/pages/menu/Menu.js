import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Button, ListItemText, Paper, Tab, Tabs} from "@mui/material";
import {Add} from "@mui/icons-material";
import MenuOfTheDay from "./MenuOfTheDay";
import {ErrorContext} from "../../components/GympinPagesProvider";

const Menu = () => {


    const error = useContext(ErrorContext);
    const [selectedTab, setSelectedTab] = useState(null);
    const catering = useSelector(({catering}) => catering.catering);
    const [dates, setDates] = useState([]);
    var day = 86400000;

    useEffect(() => {
        var initDates = [];
        var tmpDate = new Date().getTime();
        for(var i = 0 ; i<30;i++){
            tmpDate = tmpDate+day;
            initDates.push({Date: new Date(tmpDate)})
        }
        setDates(initDates);
    }, []);


    function getNextDate() {
        var today = new Date();
        var maxDate = null;
        if (dates[0]) {
            var lastMaxDate = dates.map(d => new Date(d.Date).getTime()).reduce((a, b) => Math.max(a, b), 0);
            maxDate = new Date(lastMaxDate + day);
        } else {
            maxDate = new Date(today.setDate(today.getDate() + 1));
        }
        return maxDate;
    }

    function addDate() {
        setDates([...dates, {Id: 100 * Math.random(), Name: "dsad", Date: getNextDate()}])
    }

    function getLabel(itemDate) {
        return (<><ListItemText secondary={new Date(itemDate).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })} primary={new Date(itemDate).toLocaleDateString('fa-IR', {
            weekday: 'long'
        })}/> </>)
    }



    return (
        <>
            <Paper sx={{borderBottom: 3,pb:1, borderColor: 'divider', mb: 2}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant={"scrollable"}
                >
                    {dates && dates.map(item => (
                        <Tab key={item.Date} label={getLabel(item.Date)} value={item.Date}/>
                    ))}
                    <Button sx={{height: "70px"}} size={"large"} variant={"text"} onClick={() => addDate()}><Add/></Button>

                </Tabs>
            </Paper>


            <MenuOfTheDay catering={catering} date={selectedTab?.toISOString()?.split('T')[0]} />

        </>
    );
};

export default Menu;
