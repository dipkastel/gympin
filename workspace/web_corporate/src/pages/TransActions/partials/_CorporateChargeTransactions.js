import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar, Button,
    Card,
    CardActions, CardHeader,
    CircularProgress, Collapse, FormControl,
    Grid2 as Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel, Typography,
} from "@mui/material";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {transactionCorporate_query, transactionCorporate_queryExport} from "../../../network/api/TransactionsCorporate";
import {toPriceWithComma} from "../../../helper/utils";
import {ProcessTypeEnum} from "../../../helper/enums/ProcessTypeEnum";
import {InvoiceStatus} from "../../../helper/enums/InvoiceStatus";
import DatePicker, {DateObject} from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import {DriveFolderUpload} from "@mui/icons-material";
import {getRppChargeTransaction, SetRppChargeTransaction} from "../../../helper/pocket";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

const _CorporateChargeTransactions = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppChargeTransaction());
    const [sortBy, setSortBy] = useState({Name: "Id", Desc: false});
    const [transactions, setTransactions] = useState(null)
    const [fromDate, setFromDate] = useState(null)
    const [ticketStatus, setTicketStatus] = useState(null)
    const [toDate, setToDate] = useState(null)


    useEffect(() => {
        getTransactions()
    }, [corporate, page, rowsPerPage, sortBy]);

    function getTransactions() {
        if (corporate){
            setTransactions(null);
            transactionCorporate_query({
                queryType: "FILTER",
                Type: "DEPOSIT",
                MaxPrice: 0,
                FromDate: fromDate,
                ToDate: toDate,
                InvoiceStatus:ticketStatus,
                FinanceCorporateId: corporate.Id,
                paging: {Page: page, Size: rowsPerPage, orderBy: sortBy.Name, Desc: !sortBy.Desc}
            }).then((data) => {
                setTransactions(data.data.Data)
            });
        }
    }

    function getExcel(e){
        e.preventDefault();
        if (corporate){
            transactionCorporate_queryExport({
                queryType: "FILTER",
                Type: "DEPOSIT",
                MaxPrice: 0,
                FromDate: fromDate,
                ToDate: toDate,
                InvoiceStatus:ticketStatus,
                FinanceCorporateId: corporate.Id,
                paging: {Page: page, Size: rowsPerPage, orderBy: sortBy.Name, Desc: !sortBy.Desc}
            }).then((result) => {
                const blob = new Blob([result.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${corporate.Name}-${new Date().toLocaleDateString('fa-IR')}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            });
        }
    }


    function getTicket(transaction) {
        try {
            var result = "";
            for (var ticket in transaction?.Serial?.Invoices[0]?.InvoiceSubscribe) {
                result += transaction?.Serial?.Invoices[0]?.InvoiceSubscribe[ticket]?.Name + "\r\n";
            }
            return result;
        } catch (e) {
            return "نامشخص";
        }
    }
    function getPlace(transaction) {
        try {
            var result = "";
            for (var ticket in transaction?.Serial?.Invoices[0]?.InvoiceSubscribe) {
                result += transaction?.Serial?.Invoices[0]?.InvoiceSubscribe[ticket]?.Place?.Name + "\r\n";
            }
            return result;
        } catch (e) {
            return "نامشخص";
        }
    }

    return  (
        <>

            <Card elevation={8} sx={{mt: 2, mb: 10, width: '100%', borderRadius: 2}}>

                <Grid container columns={12}>
                    <Grid sx={{p: 2}} size={11}>
                        <Typography variant={"caption"} >انتخاب تاریخ : </Typography>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            numberOfMonths={2}
                            range
                            placeholder="همیشه"
                            calendarPosition={"left"}
                            inputClass="DatePicker"
                            onChange={(e,d)=>{
                                setFromDate(e[0]?.toDate());
                                setToDate(e[1]?.toDate());
                            }}
                        />
                        <FormControl variant={"outlined"} sx={{minWidth:180,mx:2}}>
                            <InputLabel id="demo-simple-select-label">وضعیت </InputLabel>
                            <Select
                                sx={{height:42}}
                                name="Gender"
                                onChange={e => {
                                    setTicketStatus(e.target.value)
                                }}
                                value={ticketStatus}
                                input={<OutlinedInput label="وضعیت"/>}
                            >
                                <MenuItem value={null}>همه</MenuItem>
                                <MenuItem value={"COMPLETED"}>تکمیل شده</MenuItem>
                                <MenuItem value={"REFUNDED"}>پس داده شده</MenuItem>
                            </Select>
                        </FormControl>
                        <Button size={"large"} sx={{mx:1}} variant={"contained"} onClick={(e)=>getTransactions()} >جستجو</Button>
                    </Grid>
                    <Grid sx={{p: 2}} textAlign={"right"} size={1}>
                        <IconButton><DriveFolderUpload onClick={(e)=>getExcel(e)} fontSize={"medium"} /></IconButton>
                    </Grid>
                </Grid>
                <Table aria-label="userLists">
                    <TableHead sx={{bgcolor: 'primary.boxBg'}}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>نام و نام خانوادگی</TableCell>
                            <TableCell><TableSortLabel onClick={() => {
                                setSortBy({Name: "Amount", Desc: !sortBy.Desc})
                            }} direction={(sortBy.Desc) ? "desc" : "asc"}>مبلغ</TableSortLabel></TableCell>
                            <TableCell><TableSortLabel onClick={() => {
                                setSortBy({Name: "CreatedDate", Desc: !sortBy.Desc})
                            }} direction={(sortBy.Desc) ? "desc" : "asc"}>تاریخ</TableSortLabel></TableCell>
                            <TableCell>وضعیت</TableCell>
                            <TableCell>بلیط</TableCell>
                            <TableCell>مرکز</TableCell>
                        </TableRow>
                    </TableHead>
                   <TableBody>
                       {!transactions && <TableRow><TableCell align={"center"} colSpan={9}><CircularProgress/></TableCell></TableRow>}
                        {transactions?.content.map((row) => (
                            <TableRow
                                key={"depo-" + row.Id}
                                hover
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {console.log(row)}
                                <TableCell sx={{justifyItems: "center"}}><Avatar src={row?.Serial?.Invoices[0]?.User?.Avatar?.Url}
                                                                                 sx={{width: 25, height: 25}}/></TableCell>
                                <TableCell>{row?.Serial?.Invoices[0]?.User?.FullName || " - "}</TableCell>
                                <TableCell>{toPriceWithComma(row?.Amount)}</TableCell>
                                <TableCell>{(row?.CreatedDate) ? new Date(row?.CreatedDate).toLocaleDateString('fa-IR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : " - "}</TableCell>
                                <TableCell>{InvoiceStatus[row?.Serial?.Invoices[0]?.Status] || ""}</TableCell>
                                <TableCell>{getTicket(row)}</TableCell>
                                <TableCell>{getPlace(row)}</TableCell>

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
                            SetRppChargeTransaction(parseInt(event.target.value, 10))
                            setPage(0);
                        }}
                    />}
                </CardActions>
            </Card>
        </>
    ) ;
};

export default _CorporateChargeTransactions;
