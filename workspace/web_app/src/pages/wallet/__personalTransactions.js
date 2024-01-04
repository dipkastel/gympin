import React from 'react';
import {Card, CardContent, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {QuestionMark} from "@mui/icons-material";

const __personalTransactions = ({transactions}) => {



    const groupBySerial = (result, {Serial, ...cats}) => {
        if (!result.some(r => r.Serial == Serial)) result.push({Serial: Serial, Items: []})
        result.find(r => r.Serial == Serial).Items.push(cats);
        return result;
    }
    const getRequest = (items) => {
        return items.Items.find(o => o.TransactionStatus == "REQUEST"&&o.TransactionType=="CHARGE_USER");
    }
    const getPayment = (items) => {
        return items.Items.find(o => o.TransactionStatus != "REQUEST"&&o.TransactionType=="CHARGE_USER");
    }


    function itsEmpty() {
        return ( <Card elevation={3} sx={{margin: 1}}>
            <CardContent>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"body1"}>
                        لیست خالی است
                    </Typography>
                </Grid>
            </CardContent>
        </Card>);
    }

    function transactionList(transactions) {
       return  transactions.map((row, index) => (
            <div key={"tr-" + row.Serial}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardContent>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>

                            <Typography variant={"subtitle1"}>
                                {toPriceWithComma(getRequest(row).Amount) + " تومان"}
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
                            primary={getRequest(row) && (
                                <Typography variant={"caption"}>
                                    {getRequest(row).Description}
                                    {/*<FeedIcon color={"success"} />*/}
                                </Typography>)}
                            secondary={getPayment(row) ? (
                                <Typography variant={"subtitle2"}>
                                    {getPayment(row).Description}
                                    {getPayment(row).TransactionStatus == "PAYMENT_COMPLETE" ?
                                        <CheckCircleIcon color={"success"}/> :
                                        <RemoveCircleIcon color={"error"}/>}
                                </Typography>
                            ) : (
                                <Typography variant={"subtitle2"}>
                                    <QuestionMark color={"warning"}/>
                                    در انتظار بررسی
                                </Typography>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>
        ));
    }

    if(transactions?.content?.length&&transactions?.content?.reduce(groupBySerial, [])?.filter(row => getRequest(row))?.length)
        return transactionList(transactions?.content?.reduce(groupBySerial, [])?.filter(row => getRequest(row)));
    return itsEmpty();


};

export default __personalTransactions;
