import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import _GateAwaitingEntry from "./_GateAwaitingEntry";
import _GateEntered from "./_GateEntered";
import _AllUsers from "./_AllUsers";
import Nqrscan from "../qr-scan/Nqrscan";

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
                <Box>
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

export default function Users() {
    const theme = useTheme();
    theme.direction = 'rtl';
    const [value, setValue] = React.useState(0);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const selectUser = (value) => {
        setSelectedUser(value);
        setValue(0);
    }
    return (
        <Box sx={{ bgcolor: 'background.paper'}}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="اسکن" {...a11yProps(0)} />
                    <Tab label="وارد شده" {...a11yProps(1)} />
                    <Tab label="همه کاربران" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel  value={value} index={0}  dir={theme.direction}>
                    <Nqrscan user={selectedUser}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <_GateEntered selectUser={selectUser}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <_AllUsers/>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
