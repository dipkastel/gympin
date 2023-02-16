import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Pagination
} from "@mui/material";
import {transaction_query} from "../../network/api/transaction.api";
import {toPriceWithComma} from "../../helper/utils";
import {TransactionTypes} from "../../helper/enums/TransactionTypes";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const DemandPayment = () => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [transactions, SetTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    useEffect(() => {
        getPlaceTransactions()
    }, [page]);

    function getPlaceTransactions() {

        transaction_query({
            queryType: "FILTER",
            TransactionType: "PLACE_SETTLEMENT",
            PlaceId: place.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    const groupBySerial = (result, {Serial, ...cats}) => {
        if (!result.some(r => r.Serial == Serial)) result.push({Serial: Serial, Items: []})
        result.find(r => r.Serial == Serial).Items.push(cats);
        return result;
    }

    const getRequest = (group) => {
        return group.Items.find(o => o.TransactionStatus == "REQUEST");
    }
    const getPayment = (group) => {
        return group.Items.find(o => o.TransactionStatus == "PAYMENT_COMPLETE");
    }
    return (
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader title={"تراکنش ها"}/>
            <CardContent>
                <List disablePadding>
                    {transactions.content && transactions.content.reduce(groupBySerial, []).map((row) => (
                        <div key={"transaction-" + row.Serial}>
                            <ListItem disablePadding sx={{direction: "rtl", textAlign: "right"}}>
                                {console.log(row)}
                                <ListItemText>
                                    <ListItemText primary={toPriceWithComma(getRequest(row).Amount) + " تومان"}
                                                  secondary={TransactionTypes[getRequest(row).TransactionType]}/>
                                    {getPayment(row) &&<Alert severity="success">{getPayment(row).Description}</Alert>}
                                    <ListItemText secondary={"مانده اعتبار : " + getRequest(row).Balance}/>
                                    <ListItemText secondary={"سریال : " + row.Serial}/>
                                </ListItemText>
                                <ListItemIcon sx={{minWidth: "auto"}}>
                                    {!getPayment(row) && <HourglassEmptyIcon color={"error"}/>}
                                </ListItemIcon>
                            </ListItem>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </div>
                    ))}
                </List>
            </CardContent>
            <CardActions>
                <Pagination variant="outlined" count={transactions.totalPages} onChange={(f, p) => setPage(p - 1)}
                            color="primary"/>
            </CardActions>
        </Card>
    );
};

export default DemandPayment;
