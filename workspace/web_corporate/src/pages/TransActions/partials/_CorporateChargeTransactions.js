import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Card, CardActions,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table, TableBody,
    TableCell,
    TableHead, TablePagination,
    TableRow,
    Grid2 as Grid,
    TableSortLabel, Tooltip
} from "@mui/material";
import SearchTextField from "../../../components/SearchTextField";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {transactionCorporate_query} from "../../../network/api/TransactionsCorporate";
import {encodeId, toPriceWithComma} from "../../../helper/utils";
import {ProcessTypeEnum} from "../../../helper/enums/ProcessTypeEnum";
import {InvoiceStatus} from "../../../helper/enums/InvoiceStatus";
import {AirplaneTicketOutlined, ConfirmationNumber} from "@mui/icons-material";

const _CorporateChargeTransactions = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState({Name: "Id", Desc: false});
    const [transactions,setTransactions] = useState(null)


    useEffect(() => {
        getTransactions()
    }, [corporate,page,rowsPerPage,sortBy]);

    function getTransactions() {
        if(corporate)
            transactionCorporate_query({
                queryType: "FILTER",
                Type:"DEPOSIT",
                MaxPrice:0,
                FinanceCorporateId: corporate.Id,
                paging: {Page: page, Size: rowsPerPage,  orderBy: sortBy.Name, Desc: !sortBy.Desc}
            }).then((data) => {
                setTransactions(data.data.Data)
            });
    }


    function getTicket(transaction){
        try {
            var result = "";
            for(var ticket in transaction?.Serial?.Invoices[0]?.InvoiceSubscribe){
                console.log("ticket",ticket);
                result += transaction?.Serial?.Invoices[0]?.InvoiceSubscribe[ticket]?.Name + "\r\n";
            }
            return result;
        }catch (e){
           return  "نامشخص";
        }
    }

    return transactions?(
        <>
            <Card elevation={8} sx={{mt: 2, mb: 10, width: '100%', borderRadius: 2}}>
                <Table aria-label="userLists">
                    <TableHead sx={{bgcolor: 'primary.boxBg'}}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>نام و نام خانوادگی</TableCell>
                            <TableCell>تغییر شارژ</TableCell>
                            <TableCell><TableSortLabel onClick={() => {
                                setSortBy({Name: "Amount", Desc: !sortBy.Desc})
                            }} direction={(sortBy.Desc) ? "desc" : "asc"}>مبلغ</TableSortLabel></TableCell>
                            <TableCell>سریال</TableCell>
                            <TableCell><TableSortLabel onClick={() => {
                                setSortBy({Name: "CreatedDate", Desc: !sortBy.Desc})
                            }} direction={(sortBy.Desc) ? "desc" : "asc"}>تاریخ</TableSortLabel></TableCell>
                            <TableCell>نوع</TableCell>
                            <TableCell>وضعیت</TableCell>
                            <TableCell>بیشتر</TableCell>
                        </TableRow>
                    </TableHead>
                    {!transactions && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}
                    <TableBody>
                        {transactions?.content.map((row) => (
                            <TableRow
                                key={"depo-"+row.Id}
                                hover
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell sx={{justifyItems: "center"}}><Avatar src={row?.CreatorUser?.Avatar?.Url}
                                                                                 sx={{width: 25, height: 25}}/></TableCell>
                                <TableCell>{row?.CreatorUser?.FullName || " - "}</TableCell>
                                <TableCell>{toPriceWithComma(row?.LatestBalance) +" به "+toPriceWithComma(row?.LatestBalance+row?.Amount)}</TableCell>
                                <TableCell>{toPriceWithComma(row?.Amount)}</TableCell>
                                <TableCell>{row?.Serial?.Serial?.split("-")[0]}</TableCell>
                                <TableCell>{(row?.CreatorUser?.Birthday) ? new Date(row?.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : " - "}</TableCell>
                                <TableCell>{ProcessTypeEnum[row?.Serial?.ProcessType] || ""}</TableCell>
                                <TableCell>{InvoiceStatus[row?.Serial?.Invoices[0]?.Status] || ""}</TableCell>
                                <TableCell><Tooltip title={getTicket(row)}> <ConfirmationNumber/></Tooltip></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <CardActions sx={{bgcolor: 'primary.boxBg', justifyContent: "end"}}>
                    {transactions && <TablePagination
                        sx={{alignItems: "center"}}
                        rowsPerPageOptions={[5, 20, 30, 50]}
                        count={transactions?.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(a) => {
                            return ("نمایش " + a?.from + " تا " + a?.to + " از " + a?.count + " کارمند")
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </CardActions>
            </Card>
        </>
    ):(<>
        <CircularProgress />
    </>);
};

export default _CorporateChargeTransactions;
