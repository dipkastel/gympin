import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Grid, ListItemText, Typography} from "@mui/material";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {transactions_query} from "../../network/api/transactions.api";
import {toPriceWithComma} from "../../helper/utils";
import {QuestionMark} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const _UserTransactions = ({user}) => {
    const error = useContext(ErrorContext);
    const [transactions,setTransactions]=useState([]);
    const [page,setPage]=useState(0);

    useEffect(() => {
        getTransActions()
    }, []);

    function getTransActions() {

        transactions_query({
            queryType: "FILTER",
            UserId:user.Id,
            TransactionType:"CHARGE_USER",
            paging: {Page: page, Size: 300,orderBy: "Serial", Desc: false}
        }).then((data) => {
            setTransactions(data.data.Data)
            console.log(user.Id)
            console.log(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    const groupBySerial = (result, { Serial, ...cats }) => {
        if (!result.some(r=>r.Serial==Serial))result.push({Serial:Serial,Items:[]})
        result.find(r=>r.Serial==Serial).Items.push(cats);
        return result;
    }
    const getRequest = (items) =>{
        // console.log("pa",items)
        return items.Items.find(o=>o.TransactionStatus=="REQUEST");
    }
    const getPayment = (items) =>{
        // console.log("pa",items)
        return items.Items.find(o=>o.TransactionStatus!="REQUEST");
    }


    return (
        <>
            <Card elevation={3} >
                <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Typography
                        sx={{display: "inline", m: 3}}
                        component="p"
                        variant="h2"
                        color="text.primary"
                    >
                        تراکنش های من
                    </Typography>
                </Grid>
            </Card>

            {transactions.content && transactions.content.reduce(groupBySerial, []).filter(row=>getRequest(row)).map((row, index) => {
                return (
                    <div key={"tr-" + row.Serial}>
                        <Card elevation={3} sx={{margin: 1}}>
                            <CardContent>
                                <Grid container justifyContent={"space-between"} alignItems={"center"}>

                                    <Typography variant={"subtitle1"}>
                                        {toPriceWithComma(getRequest(row).Amount)+" تومان"}
                                    </Typography>

                                    <Typography variant={"caption"}>
                                        {new Date(getRequest(row).CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </Typography>

                                </Grid>
                                <ListItemText
                                    primary={getRequest(row)&&(
                                        <Typography variant={"caption"}>
                                            {getRequest(row).Description}
                                            {/*<FeedIcon color={"success"} />*/}
                                        </Typography>)}
                                    secondary={getPayment(row)?(
                                        <Typography variant={"subtitle2"}>
                                            {getPayment(row).Description}
                                            {getPayment(row).TransactionStatus=="PAYMENT_COMPLETE"?
                                                <CheckCircleIcon color={"success"} />:
                                                <RemoveCircleIcon color={"error"} />}
                                        </Typography>
                                    ):(
                                        <Typography variant={"subtitle2"}>
                                            <QuestionMark color={"warning"} />
                                            در انتظار بررسی
                                        </Typography>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                );
            })}

        </>
    );
};

export default _UserTransactions;
