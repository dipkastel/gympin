import React from 'react';
import {Card, CardContent, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {QuestionMark} from "@mui/icons-material";

const __sharePersonelCreadits = ({transactions}) => {


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
                                {toPriceWithComma(row.Amount) + " تومان"}
                            </Typography>

                            <Typography variant={"caption"}>
                                {new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </Typography>

                        </Grid>
                        <ListItemText
                            primary={
                                <Typography variant={"caption"}>
                                    {row.Description}
                                    {/*<FeedIcon color={"success"} />*/}
                                </Typography>}
                            secondary={
                                <Typography variant={"subtitle2"}>
                                    {row.Corporate.Name}
                                    {row.TransactionStatus == "COMPLETE" ?
                                        <CheckCircleIcon color={"success"}/> :
                                        <RemoveCircleIcon color={"error"}/>}
                                </Typography>
                            }
                        />
                    </CardContent>
                </Card>
            </div>
        ))
    }
    if(transactions?.content?.filter(row => row.TransactionType=="CORPORATE_PERSONNEL_ADD_CREDIT")?.length){
        console.log(transactionList(transactions.content.filter(row => row.TransactionType=="CORPORATE_PERSONNEL_ADD_CREDIT")))
        return transactionList(transactions.content.filter(row => row.TransactionType=="CORPORATE_PERSONNEL_ADD_CREDIT"));
    }
    return itsEmpty();
};

export default __sharePersonelCreadits;
