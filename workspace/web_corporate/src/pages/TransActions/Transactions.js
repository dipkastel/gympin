import React, {useState} from 'react';
import {
    Box,
    Tabs,
    Tab,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper} from "@mui/material";
import _CorporateChargeTransactions from "./partials/_CorporateChargeTransactions";
import _UserPayTransactions from "./partials/_UserPayTransactions";

// TabPanel Component
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

// Mock Data for Tables
const companyCreditPayments = [
    { id: 1, user: "کاربر ۱", ticket: "بلیط کنسرت", amount: "200,000", date: "1404/05/01" },
    { id: 2, user: "کاربر ۲", ticket: "بلیط سینما", amount: "100,000", date: "1404/05/03" },
];

const walletPayments = [
    { id: 1, user: "کاربر ۱", payment: "150,000", date: "1404/05/02" },
    { id: 2, user: "کاربر ۳", payment: "80,000", date: "1404/05/04" },
];
const Transactions = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Card variant={"outlined"} sx={{p:1,m:3}}>
                    <Tabs variant={"fullWidth"} value={tabValue} onChange={handleChange} centered>
                        <Tab label="پرداخت با اعتبار شرکت" />
                        <Tab label="پرداخت های شخصی" />
                    </Tabs>
                </Card>

                <TabPanel value={tabValue} index={0}>
                    <_CorporateChargeTransactions/>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <_UserPayTransactions />
                </TabPanel>
            </Box>
        </>

    );
};

export default Transactions;
