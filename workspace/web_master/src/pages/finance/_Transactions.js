import React, {useContext, useEffect, useState} from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Pagination, Typography
} from "@mui/material";
import {ControlPoint, RemoveCircleOutline} from '@mui/icons-material';
import {transactionUser_query} from "../../network/api/transaction.api";
import {toPriceWithComma} from "../../helper/utils";
import {TransactionTypes} from "../../helper/enums/TransactionTypes";
import {ErrorContext} from "../../components/GympinPagesProvider";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import {useSelector} from "react-redux";
import {Image} from "react-bootstrap";

const _transactions = ({place}) => {

    const error = useContext(ErrorContext);
    const currentUser = useSelector(({auth}) => auth.user);
    const [transactions, SetTransactions] = useState(null)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getUserTransactions()
    }, [page]);

    if (!place || !currentUser)
        return (<></>);

    function getUserTransactions() {
        SetTransactions(null);
        transactionUser_query({
            queryType: "FILTER",
            UserId: currentUser.Id,
            PlaceId: place.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            console.log(data.data.Data);
            SetTransactions(data.data.Data);
        }).catch(e => {
            console.log("err", e);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (transactions != null) ? (
        <>
            {transactions?.content?.length > 0 && <Card elevation={3} sx={{margin: 1}}>
                <CardHeader title={"تراکنش ها"}/>
                <CardContent>
                    <List disablePadding>
                        {transactions?.content?.map((item, Num) => (
                            <div key={"transaction-" + Num}>
                                <ListItem disablePadding key={Num} sx={{direction: "rtl", textAlign: "right"}}>
                                    <ListItemText>
                                        <ListItemText primary={toPriceWithComma(item.Amount) + " تومان"}
                                                      secondary={TransactionTypes[item?.TransactionType]}/>
                                        <ListItemText
                                            secondary={"اعتبار قبل از تراکنش : " + toPriceWithComma(item?.LatestBalance)}/>
                                        <ListItemText secondary={"سریال : " + item?.Serial?.Serial}/>
                                    </ListItemText>
                                    <ListItemIcon sx={{minWidth: "auto"}}>
                                        {(item?.Amount > 0) ? <ControlPoint color={"success"}/> :
                                            <RemoveCircleOutline color={"error"}/>}
                                    </ListItemIcon>
                                    <ListItemIcon sx={{minWidth: "auto"}}>
                                        {(item?.TransactionStatus === "COMPLETE") && <DoneAllIcon color={"success"}/>}
                                        {(item?.TransactionStatus === "CANCEL") && <RemoveDoneIcon color={"error"}/>}
                                    </ListItemIcon>
                                </ListItem>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                            </div>
                        ))}
                    </List>
                </CardContent>
                <CardActions>
                    <Pagination
                        variant="outlined"
                        count={transactions?.totalPages}
                        onChange={(f, p) => setPage(p - 1)}
                        color="primary"/>
                </CardActions>
            </Card>}
            {transactions?.content?.length < 1 &&
                <Card elevation={3} sx={{margin: 1}}>
                    <CardContent>
                        <Grid
                            container
                            sx={{width:"100%"}}
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Image src={"https://api.gympin.ir/resource/image?Id=100"}  width={"40%"}/>
                            <Typography variant={"body"} sx={{m:2}} >
                                تراکنش یافت نشد
                            </Typography>

                        </Grid>
                    </CardContent>
                </Card>
            }
        </>

    ) : (<>
        <Card elevation={3} sx={{margin: 1}}>
            <CardHeader title={"تراکنش ها"}/>
            <CardContent>
                <Grid container direction={"row"} alignItems={"center"} justifyContent={"center"}>
                    <CircularProgress/>
                </Grid>
            </CardContent></Card>
    </>);
};

export default _transactions;
