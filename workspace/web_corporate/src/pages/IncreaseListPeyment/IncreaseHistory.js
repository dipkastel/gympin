import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Grid2 as Grid, ListItemText, Typography} from "@mui/material";
import {transaction_increaseQuery} from "../../network/api/transactions.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {getUserFixedName, toPriceWithComma} from "../../helper/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {Image} from "react-bootstrap";

const IncreaseHistory = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [transactions, SetTransactions] = useState([])

    useEffect(() => {
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
            <title>تاریخچه تراکنش ها</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>تاریخچه تراکنش ها</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}></Grid>
            </Grid>


            <Grid container textAlign={"center"} columns={2}>
                {transactions?.content && transactions.content.map((row, index) => {
                    return (
                        <Grid key={"tr-" + row.Serial} size={2} textAlign={"center"}>
                            <Card elevation={3} sx={{m: 1, borderRadius: 3,maxWidth:500,width:"100%",justifySelf:"center"}}>
                                <CardContent sx={{pb: "0!important"}}>
                                    <Grid container justifyContent={"space-between"} alignItems={"start"}>
                                        <Typography variant={"subtitle1"} textAlign={"start"}>
                                            {row.DepositStatus == "CONFIRMED" && <>
                                                تکمیل شده
                                                <CheckCircleIcon color={"success"}/>
                                            </>}
                                            {row.DepositStatus == "REJECTED" && <>
                                                رد شده
                                                <RemoveCircleIcon color={"error"}/>
                                            </>}
                                            {row.DepositStatus == "REQUESTED" && <>
                                                در انتظار بررسی
                                                <HourglassBottomIcon color={"warning"}/>
                                            </>}
                                        </Typography>

                                        <ListItemText
                                            primaryTypographyProps={{variant: "caption", textAlign: "end"}}
                                            secondaryTypographyProps={{variant: "overline", textAlign: "end"}}
                                            primary={new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                            secondary={row.Serial.Serial.split("-")[0]}
                                        />

                                    </Grid>
                                    <ListItemText
                                        primary={toPriceWithComma(row.Amount) + " تومان"}
                                        secondaryTypographyProps={{variant: "overline"}}
                                        secondary={row?.CreatorUser && ('توسط : ' + getUserFixedName(row.CreatorUser))}
                                    />
                                    <ListItemText
                                        primary={row.Description}
                                        primaryTypographyProps={{variant: "overline"}}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            {transactions?.content?.length < 1 && <>

                <Grid
                    container
                    sx={{width: "100%", height: "80vh"}}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Image src={"https://api.gympin.ir/resource/image?Id=100"} width={"40%"}/>
                    <Typography variant={"body"} sx={{m: 2}}>
                        تراکنشی یافت نشد
                    </Typography>

                </Grid>

            </>}

        </>

    );
};

export default IncreaseHistory;
