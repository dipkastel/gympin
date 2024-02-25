import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ScanPage from "./scan/ScanPage";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import SellsOfPlace from "./sells/SellsOfPlace";

function Users() {
    const theme = useTheme();
    theme.direction = 'rtl';
    const [selectedSubscribe, setSelectedSubscribe] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        document.title = 'کاربران';
    }, []);


    if (!getAccessOf(personnelAccessEnumT.Users))
        return <AccessDenied/>;

    return (<>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <AppBar position="static">
                    <Tabs
                        value={selectedTab}
                        onChange={(e, n) => setSelectedTab(n)}
                        aria-label="usersTab"
                        textColor="inherit"
                        indicatorColor="secondary"
                        variant="fullWidth"
                    >

                        {getAccessOf(personnelAccessEnumT.Scan) &&
                        <Tab label="اسکن" id={"user-tab-0"} aria-controls={"user-tabpanel-0"}/>}
                        {getAccessOf(personnelAccessEnumT.Sells) &&
                        <Tab label="فروش ها" id={"user-tab-1"} aria-controls={"user-tabpanel-1"}/>}
                    </Tabs>
                </AppBar>
            </Box>

            <Box sx={{bgcolor: 'background.paper'}}>

                {getAccessOf(personnelAccessEnumT.Scan) &&


                <div
                    hidden={selectedTab !== 0}
                    id={`user-tabpanel-0`}
                    aria-labelledby={`user-tab-0`}
                >
                    {selectedTab === 0 && (
                        <Box>
                            <ScanPage selectedSubscribe={selectedSubscribe}/>
                        </Box>
                    )}
                </div>}
                {getAccessOf(personnelAccessEnumT.Sells) &&
                <div
                    hidden={selectedTab !== 1}
                    id={`user-tabpanel-1`}
                    aria-labelledby={`user-tab-1`}
                >
                    {selectedTab === 1 && (
                        <Box>
                            <SellsOfPlace selectedSubscribe={setSelectedSubscribe}/>
                        </Box>
                    )}
                </div>}
            </Box>
        </>
    );
}

export default Users;

