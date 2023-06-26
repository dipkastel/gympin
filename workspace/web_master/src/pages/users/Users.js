import * as React from 'react';
import {useEffect, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import _GateEntered from "./entered/_GateEntered";
import _ActiveTickets from "./activeTickets/_ActiveTickets";
import _Nqrscan from "./scan/_Nqrscan";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {useParams} from "react-router-dom";


function Users() {
    const theme = useTheme();
    theme.direction = 'rtl';
    const {section} = useParams()
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        try{
            tabindexChange(Number.parseInt(section));
        }catch (e){}
    }, [section]);



    function tabindexChange(e) {
        if([0,1,2].includes(e)){
            setTabIndex(e)
        }
    }

    if(!getAccessOf(personnelAccessEnumT.Users))
        return <AccessDenied/>;

    return (<>

        <Box sx={{ bgcolor: 'background.paper'}}>
            <AppBar position="static">
                <Tabs
                    value={tabIndex}
                    onChange={(e,num)=>setTabIndex(num)}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {getAccessOf(personnelAccessEnumT.Scan)&&<Tab label="اسکن" id={"user-tab-0"}  aria-controls={"user-tabpanel-0"}/>}
                    {getAccessOf(personnelAccessEnumT.Entered)&&<Tab label="وارد شده"  id={"user-tab-1"}  aria-controls={"user-tabpanel-1"} />}
                    {getAccessOf(personnelAccessEnumT.AllTickets)&&<Tab label="بلیط ها"  id={"user-tab-2"}  aria-controls={"user-tabpanel-2"} />}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabIndex}
                onChangeIndex={(e)=>tabindexChange(e)}
            >
                {getAccessOf(personnelAccessEnumT.Scan)&&<TabPanel  value={tabIndex} index={0}  dir={theme.direction}>
                    <_Nqrscan selectedTicket={selectedTicket}/>
                </TabPanel>}
                {getAccessOf(personnelAccessEnumT.Entered)&&<TabPanel value={tabIndex} index={1} dir={theme.direction}>
                    <_GateEntered SetSelectedTicket={(ticket)=>{
                        setSelectedTicket(ticket);
                        setTabIndex(0);
                    }}/>
                </TabPanel>}
                {getAccessOf(personnelAccessEnumT.AllTickets)&&<TabPanel value={tabIndex} index={2} dir={theme.direction}>
                    <_ActiveTickets/>
                </TabPanel>}
            </SwipeableViews>
        </Box>
    </>
    );
}

export default Users;

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}
