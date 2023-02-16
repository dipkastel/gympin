import React, {useEffect, useState} from 'react';
import {
    Card, CardActions,
    CardContent, CardHeader, Chip,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Pagination
} from "@mui/material";
import {ControlPoint,RemoveCircleOutline } from '@mui/icons-material';
import {transaction_getByPlaceId, transaction_query} from "../../network/api/transaction.api";
import {getSupportPersianStatus, toPriceWithComma} from "../../helper/utils";
import {TransactionTypes} from "../../helper/enums/TransactionTypes";
import {TransactionStatus} from "../../helper/enums/TransactionStatus";

const _transactions = ({place}) => {

    const [transactions,SetTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getPlaceTransactions()
    }, [page]);

    function getPlaceTransactions() {

        transaction_query({
            queryType: "FILTER",
            TransactionType:"PLACE_TICKET_SETTLEMENT",
            PlaceId:place.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <Card elevation={3} sx={{margin: 1 }} >
            <CardHeader title={"تراکنش ها"} />
            <CardContent >
                <List disablePadding>
                    {transactions.content&&transactions.content.map((item,Num)=>(
                        <div key={"transaction-"+Num}>
                            <ListItem disablePadding key={Num} sx={{direction:"rtl",textAlign:"right"}}>
                                <ListItemText >
                                    <ListItemText primary={toPriceWithComma(item.Amount)+" تومان"} secondary={TransactionTypes[item.TransactionType]}/>
                                    <ListItemText secondary={"مانده اعتبار : "+ item.Balance}/>
                                    <ListItemText secondary={"سریال : "+ item.Serial}/>
                                </ListItemText>
                                    <ListItemIcon sx={{minWidth:"auto"}} >
                                        {(item.Amount>0)?<ControlPoint color={"success"}/>:<RemoveCircleOutline color={"error"}/>}
                                    </ListItemIcon>
                            </ListItem>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </div>
                    ))}
                </List>
            </CardContent>
            <CardActions>
                <Pagination variant="outlined" count={transactions.totalPages} onChange={(f,p)=>setPage(p-1)} color="primary" />
            </CardActions>
        </Card>
    );
};

export default _transactions;
