import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import _TabPlaceReserve from "./_TabPlaceReserve";
import _TabPlaceAbout from "./_TabPlaceAbout";
import _PlaceFacilities from "./_PlaceFacilities";
import _TabPlaceComments from "./_TabPlaceComments";


const _TabsPlace = ({place}) => {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = React.useState(0);

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
                    <Tab label="رزرو"/>
                    <Tab label="درباره مرکز"/>
                    {/*<Tab label="نظرات"/>*/}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                slideClassName={"rtl"}
                index={selectedTab}
                onChangeIndex={(e) => setSelectedTab(e)}>
                <_TabPlaceReserve place={place}/>
                <_TabPlaceAbout place={place}/>
                {/*<_TabPlaceComments place={place}/>*/}
            </SwipeableViews>
        </Box>
    );
};

export default _TabsPlace;
