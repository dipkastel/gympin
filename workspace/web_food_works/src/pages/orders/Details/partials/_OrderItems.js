import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, IconButton, TableCell, TableContainer} from "@mui/material";
import {Add, FileDownload, Remove} from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import {toPriceWithComma} from "../../../../helper/utils";

const _OrderItems = ({invoice,getInvoice}) => {

    useEffect(() => {

    }, []);


    return (
        <>
            <Card elevation={10} sx={{m:2}}>
                <CardHeader
                    sx={{borderBottom:"1px solid #909090"}}
                    title={"آیتم ها"}
                    action={<><IconButton onClick={()=>alert("عملکرد دریافت خروجی اکسل به زودی در دسترس خواهد بود!")}><FileDownload/></IconButton></>}
                />
                <CardContent>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام آیتم</TableCell>
                                    <TableCell >قیمت واحد</TableCell>
                                    <TableCell >تعداد</TableCell>
                                    <TableCell align="right">مجموع</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {invoice?.InvoiceFoods?.map(row=>(
                                    <TableRow
                                        hover
                                        key={row.Id + "mh24"}
                                        sx={{cursor: "pointer"}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.Name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {toPriceWithComma(row?.UnitPrice)+" تومان"}
                                        </TableCell>
                                        <TableCell>
                                            {row?.Count+" عدد"}
                                        </TableCell>
                                        <TableCell  align="right" component="th" scope="row">
                                            {toPriceWithComma(row?.UnitPrice)+" تومان"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    );
};

export default _OrderItems;
