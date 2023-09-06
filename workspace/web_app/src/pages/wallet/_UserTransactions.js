import React, {useContext, useEffect, useState} from 'react';
import {Box, Card, CardContent, Grid, ListItemText, Typography} from "@mui/material";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {transactions_query} from "../../network/api/transactions.api";
import {toPriceWithComma} from "../../helper/utils";
import {QuestionMark} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import __sharePersonelCreadits from "./__sharePersonelCreadits";
import __personalTransactions from "./__personalTransactions";

const _UserTransactions = ({user}) => {
    const error = useContext(ErrorContext);
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);


    const theme = useTheme();
    theme.direction = 'rtl';
    const {section} = useParams()
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        try {
            tabindexChange(Number.parseInt(section));
        } catch (e) {
        }
    }, [section]);


    function tabindexChange(e) {
        if ([0, 1].includes(e)) {
            setTabIndex(e)
        }
    }

    useEffect(() => {
        getTransActions()
    }, []);

    function getTransActions() {
        transactions_query({
            queryType: "FILTER",
            UserId: user.Id,
            paging: {Page: page, Size: 300, orderBy: "Serial", Desc: false}
        }).then((data) => {
            setTransactions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    return (
        <>
            <Box sx={{bgcolor: 'background.paper'}}>
                <AppBar position="static">
                    <Tabs
                        value={tabIndex}
                        onChange={(e, num) => setTabIndex(num)}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="شارژهای اشتراکی" id={"user-tab-0"} aria-controls={"user-tabpanel-0"}/>
                        <Tab label="تراکنش های شخصی" id={"user-tab-1"} aria-controls={"user-tabpanel-1"}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                    <__sharePersonelCreadits transactions={transactions} />
                </TabPanel>
                <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                    <__personalTransactions  transactions={transactions} />
                </TabPanel>
            </Box>
        </>
    );
};

export default _UserTransactions;

function TabPanel(props) {
    const {children, value, index} = props;

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
