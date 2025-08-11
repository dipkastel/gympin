import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActions, IconButton, TableCell, TableContainer, TablePagination, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {invoice_query} from "../../network/api/invoice.api";
import {toPriceWithComma} from "../../helper/utils";
import {useNavigate} from "react-router";


const Orders = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const catering = useSelector(({ catering }) => catering.catering);
    const [orders,setOrders] = useState(null);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);




    useEffect(() => {
        getPreOrders();
    }, [catering,page,perPage]);

    function getPreOrders() {
        if(!catering) return;
        invoice_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            Status:"PROCESSING",
            paging: {
                Page: page,
                Size: perPage,
                Desc: true
            }
        })
            .then((result) => {
                setOrders(result.data.Data);

            })
            .catch((e) => {
                try {
                    error.showError({ message: e.response.data.Message });
                } catch (f) {
                    error.showError({ message: "خطا نا مشخص" });
                }
            });
    }

    function getItemCount(CurrentBasket) {
        return CurrentBasket.InvoiceFoods.reduce(function (a, b) {
            return b.IsCount ? a + b.Count : a;
        }, 0);
    }

    return (
        <>
            <Grid
                container
                direction={"row"}
                columns={12}
            >
                <Grid size={12}>
                    <Card sx={{m: 2, p: 2}} variant={"outlined"}>
                        <Grid container direction={"row"} justifyContent={"space-between"}>
                            <Typography>لیست سفارشات تایید شده</Typography>
                        </Grid>
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Card sx={{m: 2, p: 2}} variant={"outlined"}>

                        {orders?.content?.length>0&&<>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>نام سازمان</TableCell>
                                        <TableCell align="center">سفارش دهنده</TableCell>
                                        <TableCell align="center">قیمت فاکتور</TableCell>
                                        <TableCell align="center">تعداد آیتم‌ها(غذای اصلی)</TableCell>
                                        <TableCell align="center">سفارش برای</TableCell>
                                        <TableCell align="center">تاریخ سفارش</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders?.content?.map((row) => (
                                        <TableRow
                                            hover
                                            key={row.Id+"hh23"}
                                            sx={{cursor: "pointer"}}
                                            onClick={()=>navigate("/Orders/details/"+row.Id)}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row?.Corporate?.Name}
                                            </TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {row.UserFullName}
                                            </TableCell>
                                            <TableCell align="center">{toPriceWithComma(row.TotalPrice)}</TableCell>
                                            <TableCell align="center">{row.InvoiceFoods.length+" آیتم ( در "+getItemCount(row)+" مورد ) "}</TableCell>
                                            <TableCell align="center">{new Date(row.InvoiceFoods[0].Date).toLocaleDateString("fa-IR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}</TableCell>
                                            <TableCell align="center">{new Date(row.CreatedDate).toLocaleDateString("fa-IR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}</TableCell>
                                            {/*<TableCell align="center">{row.MinOrderCount}</TableCell>*/}
                                            {/*<TableCell align="center">{row.MaxOrderCount}</TableCell>*/}
                                            {/*<TableCell align="right" sx={{py: 0}}><IconButton onClick={(e) => setItemToDelete(row)}><Delete*/}
                                            {/*    color={"error"}/> </IconButton></TableCell>*/}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CardActions sx={{justifyContent: "right"}}>
                            {(orders?.totalElements > 0) && <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                                component="div"
                                count={orders?.totalElements || 0}
                                labelRowsPerPage={<Typography sx={{mt: 2}}>تعداد نمایش</Typography>}
                                labelDisplayedRows={(param) => {
                                    return <Typography
                                        sx={{mt: 2}}>{`${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`}</Typography>
                                }}
                                rowsPerPage={perPage}
                                page={page}
                                onPageChange={(event, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(event) => {
                                    setPerPage(parseInt(event.target.value, 10));
                                    setPage(0);
                                }}
                            />}
                        </CardActions>
                    </>}

                    {!orders?.content?.length>0&&<Typography variant={"h6"} sx={{width:"100%",textAlign:"center"}} >سفارشی وجود ندارد</Typography>}

                </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Orders;
