import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import {useEffect} from "react";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BadgeIcon from '@mui/icons-material/Badge';
import InfoIcon from '@mui/icons-material/Info';
import _TabPlaceBuyable from "./_TabPlaceBuyable";
import _TabPlaceAbout from "./info/_TabPlaceAbout";


const _TabsPlace = ({place}) => {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = React.useState(0);

    useEffect(() => {
        document.title = 'مرکز ورزشی '+place?.Name;
    }, []);
    return (
        <Box sx={{bgcolor: 'background.paper',zIndex:1005,position:"relative"}}>
            <AppBar position="static">
                <Tabs
                    value={selectedTab}
                    onChange={(e, newValue) => setSelectedTab(newValue)}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label={<BadgeIcon fontSize={"large"} />}/>
                    <Tab label={<InfoIcon fontSize={"large"} />}/>
                    {/*<Tab label="نظرات"/>*/}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                slideClassName={"rtl"}
                index={selectedTab}
                onChangeIndex={(e) => setSelectedTab(e)}>
                <_TabPlaceBuyable place={place}/>
                <_TabPlaceAbout place={place}/>
                {/*<_TabPlaceComments place={place}/>*/}
            </SwipeableViews>
        </Box>
    );
};

export default _TabsPlace;
