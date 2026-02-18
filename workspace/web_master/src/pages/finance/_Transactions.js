import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, CircularProgress, Grid, List, Pagination, Typography} from "@mui/material";
import {transactionUser_query} from "../../network/api/transaction.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {Image} from "react-bootstrap";
import __TransactionListItem from "./__TransactionListItem";

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
        if (!place || !currentUser)
            return (<></>);
        SetTransactions(null);
        transactionUser_query({
            queryType: "FILTER",
            UserId: currentUser.Id,
            PlaceId: place.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            SetTransactions(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (transactions != null) ? (
        <>
            <Card sx={{mt: 2}} variant={"outlined"}>
                <CardHeader
                    title={"تراکنش ها"}
                />
                {transactions?.content?.length > 0 && <>
                    <CardContent>
                        <List disablePadding>
                            {transactions?.content?.map((item, Num) => (
                                <Card key={"transaction-" + Num} elevation={3} sx={{borderRadius: 3, margin: 1}}>
                                    <__TransactionListItem item={item}/>
                                </Card>
                            ))}
                        </List>
                        <Grid container direction={"row"} alignItems={"center"} justifyContent={"center"}>
                            <Pagination
                                variant="outlined"
                                count={transactions?.totalPages}
                                onChange={(f, p) => setPage(p - 1)}
                                color="primary"/>
                        </Grid>
                    </CardContent>
                </>}
                {transactions?.content?.length < 1 &&
                <CardContent>
                    <Grid
                        container
                        sx={{width: "100%"}}
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
                        <Typography variant={"body"} sx={{m: 2}}>
                            تراکنش یافت نشد
                        </Typography>
                    </Grid>
                </CardContent>
                }
            </Card>
        </>

    ) : (<>
        <Card sx={{mt: 2}} variant={"outlined"}>
            <CardHeader title={"تراکنش ها"}/>
            <CardContent>
                <Grid container direction={"row"} alignItems={"center"} justifyContent={"center"}>
                    <CircularProgress/>
                </Grid>
            </CardContent></Card>
    </>);
};

export default _transactions;
