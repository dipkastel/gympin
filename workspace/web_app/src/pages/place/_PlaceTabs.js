import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import _PlaceReserve from "./_PlaceReserve";
import _PlaceAbout from "./_PlaceAbout";
import _PlaceFacilities from "./_PlaceFacilities";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const _PlaceTabs = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' ,marginTop:-1}}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="رزرو" {...a11yProps(0)} />
                    <Tab label="درباره مرکز" {...a11yProps(1)} />
                    <Tab label="امکانات" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}

                onChangeIndex={handleChangeIndex}
            >
                <TabPanel  value={value} index={0} dir={theme.direction}>
                    <_PlaceReserve/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <_PlaceAbout/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <_PlaceFacilities/>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
};

export default _PlaceTabs;
