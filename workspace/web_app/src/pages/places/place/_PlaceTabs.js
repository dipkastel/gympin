import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import _PlaceReserve from "./_PlaceReserve";
import _PlaceAbout from "./_PlaceAbout";
import _PlaceFacilities from "./_PlaceFacilities";


const _PlaceTabs = ({place}) => {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = React.useState(0);

    return (
        <Box sx={{bgcolor: 'background.paper', marginTop: -1}}>
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
                    <Tab label="امکانات"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                slideClassName={"rtl"}
                index={selectedTab}
                onChangeIndex={(e) => setSelectedTab(e)}>
                <_PlaceReserve place={place}/>
                <_PlaceAbout place={place}/>
                <_PlaceFacilities place={place}/>
            </SwipeableViews>
        </Box>
    );
};

export default _PlaceTabs;
