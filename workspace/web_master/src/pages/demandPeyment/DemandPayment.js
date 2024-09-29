import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider, Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Pagination, Typography
} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import {TransactionTypes} from "../../helper/enums/TransactionTypes";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import {SettlementUserDeposit_query} from "../../network/api/settlement.api";
import {Image} from "react-bootstrap";

const DemandPayment = () => {
    const error = useContext(ErrorContext);
    const currentUser = useSelector(({auth}) => auth.user);
    const [transactions, SetTransactions] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);

    useEffect(() => {
        document.title = 'درخواست های تسویه';
        getSettelmentRequests()
    }, [page]);

    function getSettelmentRequests() {

        SettlementUserDeposit_query({
            queryType: "FILTER",
            FinanceUserId: 1084,
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

    function Empty() {
        return (<Grid
            container
            sx={{width: "100%", height: "80vh"}}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
            <Typography variant={"body"} sx={{m: 2}}>
                درخواستی وجود ندارد!
            </Typography>

        </Grid>);
    }
    return (
        <>
            {(transactions.length > 0)? <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={"درخواست های تسویه"}/>
                <CardContent>
                    <List disablePadding>
                        {transactions.content && transactions.content.map((row) => (
                            <div key={"transaction-" + row.Id}>
                                <ListItem disablePadding sx={{direction: "rtl", textAlign: "right"}}>
                                    <ListItemText>
                                        <ListItemText primary={toPriceWithComma(row.Amount) + " تومان"}
                                                      secondary={TransactionTypes[row.TransactionType]}/>
                                        {row.SettlementStatus == "CONFIRMED" &&
                                        <Alert severity="success" sx={{px: 1}}><Typography variant={"caption"}
                                                                                           sx={{px: 1}}>{row.Description}</Typography></Alert>}
                                        {row.SettlementStatus == "REJECTED" &&
                                        <Alert severity={"error"} sx={{px: 1}}><Typography variant={"caption"}
                                                                                           sx={{px: 1}}>{row.Description}</Typography></Alert>}
                                        <ListItemText
                                            secondary={"تاریخ : " + new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}/>
                                        <ListItemText secondary={"سریال : " + row.Serial.Serial}/>
                                    </ListItemText>
                                    <ListItemIcon sx={{minWidth: "auto"}}>
                                        {row.SettlementStatus == "REQUESTED" && <HourglassEmptyIcon color={"error"}/>}
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
            </Card> : Empty()}
        </>
    );
};

export default DemandPayment;
