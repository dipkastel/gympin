import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Grid, ListItemText, Typography} from "@mui/material";
import {transaction_increaseQuery, transactions_query} from "../../network/api/transactions.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {getUserFixedName, toPriceWithComma} from "../../helper/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {QuestionMark} from "@mui/icons-material";

const IncreaseHistory = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [transactions, SetTransactions] = useState([])

    useEffect(() => {
        document.title = 'تاریخچه افزایش اعتبار';
        transaction_increaseQuery({
            queryType: "FILTER",
            CorporateId: corporate.Id,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
        }).then((data) => {
            console.log(data.data.Data);
            SetTransactions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    const groupBySerial = (result, {Serial, ...cats}) => {
        if (!result.some(r => r.Serial == Serial)) result.push({Serial: Serial, Items: []})
        result.find(r => r.Serial == Serial).Items.push(cats);
        return result;
    }

    return (
        <>
            {transactions.content && transactions.content.map((row, index) => {
                return (
                    <div key={"tr-" + row.Serial}>
                        <Card elevation={3} sx={{margin: 1}}>
                            <CardContent sx={{pb: "0!important"}}>
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
                                    primary={row ? (
                                        <Typography variant={"subtitle1"}>
                                            {row.Description}
                                            {row.DepositStatus  == "CONFIRMED" &&<CheckCircleIcon color={"success"}/>}
                                            {row.DepositStatus  == "REJECTED" &&<RemoveCircleIcon color={"error"}/>}
                                            {row.DepositStatus  == "REQUESTED" &&<>
                                                در انتظار بررسی
                                                <HourglassBottomIcon color={"warning"}/>
                                            </>}
                                        </Typography>
                                    ) : (
                                        <Typography variant={"subtitle2"}>
                                            <QuestionMark color={"warning"}/>
                                            در انتظار بررسی
                                        </Typography>
                                    )}
                                    secondary={row && (
                                        <Typography variant={"caption"}>
                                            {row.CreatorUser&&('درخواست شده توسط : ' + getUserFixedName(row.CreatorUser))}
                                        </Typography>)}
                                />
                            </CardContent>
                        </Card>
                    </div>
                );
            })}

        </>

    );
};

export default IncreaseHistory;
