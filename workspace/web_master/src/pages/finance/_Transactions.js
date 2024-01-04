import React, {useContext, useEffect, useState} from 'react';
import {
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
import {ControlPoint, RemoveCircleOutline} from '@mui/icons-material';
import {transaction_query, transactionUser_query} from "../../network/api/transaction.api";
import {toPriceWithComma} from "../../helper/utils";
import {TransactionTypes} from "../../helper/enums/TransactionTypes";
import {ErrorContext} from "../../components/GympinPagesProvider";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import {useSelector} from "react-redux";

const _transactions = ({place}) => {

    const error = useContext(ErrorContext);
    const currentUser = useSelector(({auth}) => auth.user);
    const [transactions,SetTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getUserTransactions()
    }, [page]);

    if(!place)
        return (<></>);
    if(!currentUser)
        return (<></>);

    function getUserTransactions() {

        if(!currentUser?.FinanceUser?.Id) return;

        transactionUser_query({
            queryType: "FILTER",
            FinanceUserId:currentUser.FinanceUser.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data)
            console.log(data.data.Data)
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
                                    <ListItemText secondary={"اعتبار قبل از تراکنش : "+ toPriceWithComma(item.LatestBalance)}/>
                                    <ListItemText secondary={"سریال : "+ item.Serial.Serial}/>
                                </ListItemText>
                                    <ListItemIcon sx={{minWidth:"auto"}} >
                                        {(item.Amount>0)?<ControlPoint color={"success"}/>:<RemoveCircleOutline color={"error"}/>}
                                    </ListItemIcon>
                                    <ListItemIcon sx={{minWidth:"auto"}} >
                                        {(item.TransactionStatus=="COMPLETE")&&<DoneAllIcon color={"success"}/>}
                                        {(item.TransactionStatus=="CANCEL")&&<RemoveDoneIcon color={"error"}/>}
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
