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
import {Image} from "react-bootstrap";

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
            {transactions?.content && transactions.content.map((row, index) => {
                return (
                    <div key={"tr-" + row.Serial}>
                        <Card elevation={3} sx={{margin: 1,borderRadius:3}}>
                            <CardContent sx={{pb: "0!important"}}>
                                <Grid container justifyContent={"space-between"} alignItems={"start"} >
                                    <Typography variant={"subtitle1"}>
                                        {console.log(row)}
                                        {row.Description}
                                        {row.DepositStatus  == "CONFIRMED" &&<>
                                            تکمیل شده
                                            <CheckCircleIcon color={"success"}/>
                                        </>}
                                        {row.DepositStatus  == "REJECTED" &&<>
                                            رد شده
                                            <RemoveCircleIcon color={"error"}/>
                                        </>}
                                        {row.DepositStatus  == "REQUESTED" &&<>
                                            در انتظار بررسی
                                            <HourglassBottomIcon color={"warning"}/>
                                        </>}
                                    </Typography>

                                    <ListItemText
                                        primaryTypographyProps={{variant:"caption",textAlign:"left"}}
                                        secondaryTypographyProps={{variant:"overline",textAlign:"left"}}
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
                                    primary={toPriceWithComma(row.Amount) + " تومان" }
                                    secondaryTypographyProps={{variant:"overline"}}
                                    secondary={row?.CreatorUser&&('توسط : ' + getUserFixedName(row.CreatorUser))}
                                />
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
            {transactions?.content?.length<1&&<>

                <Grid
                    container
                    sx={{width:"100%",height:"80vh"}}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Image src={"https://api.gympin.ir/resource/image?Id=100"}  width={"40%"}/>
                    <Typography variant={"body"} sx={{m:2}} >
                        تراکنشی یافت نشد
                    </Typography>

                </Grid>

            </>}

        </>

    );
};

export default IncreaseHistory;
