import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    TableCell,
    TableContainer
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import _ModalInvoiceExtra from "./_ModalInvoiceExtra";
import {toPriceWithComma} from "../../../../helper/utils";
import TableHead from "@mui/material/TableHead";
import {TicketFoods_delete} from "../../../../network/api/TicketFoods.api";
import {Form} from "react-bootstrap";
import {InvoiceExtra_delete} from "../../../../network/api/invoiceExtra.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _EditPreOrderExtras = ({invoice, getInvoice}) => {

    const error = useContext(ErrorContext);
    const [itemToDelete, setItemToDelete] = useState(null);
    const catering = useSelector(({catering}) => catering.catering);


    function renderModalDelete() {
        function submitDelete(e) {
            e.preventDefault();
            setItemToDelete(null);
            InvoiceExtra_delete({id: itemToDelete.Id}).then(result => {
                getInvoice();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog
                open={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
            >
                <Form onSubmit={(e) => submitDelete(e)}>
                    <DialogTitle>{"حذف " + itemToDelete?.Name}</DialogTitle>
                    <DialogActions>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            variant={"outlined"}
                            color={"error"}
                            onClick={(e) => setItemToDelete(null)}
                        >
                            لغو
                        </Button>
                        <Button
                            sx={{px: 7, mb: 2, mx: 2}}
                            type={"submit"}
                            variant={"outlined"}
                            color={"success"}
                        >
                            تایید
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }

    return (
        <>
            <Card elevation={10} sx={{m: 2}}>
                <CardHeader
                    sx={{borderBottom: "1px solid #909090"}}
                    title={"موارد اضافه بر فاکتور"}
                    action={<>
                        <_ModalInvoiceExtra catering={catering} invoice={invoice} update={getInvoice}/>
                    </>}
                />
                <CardContent>

                    <TableContainer>
                        <Table aria-label="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>نام آیتم</TableCell>
                                    <TableCell align="center">قیمت واحد</TableCell>
                                    <TableCell align="center">تعداد</TableCell>
                                    <TableCell align="center">مجموع (تومان)</TableCell>
                                    <TableCell align="right">عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {invoice?.InvoiceExtras?.map(row => (
                                    <TableRow
                                        hover
                                        key={row.Id + "mh24"}
                                        sx={{cursor: "pointer"}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.Name}
                                        </TableCell>
                                        <TableCell align={"center"} component="th" scope="row">
                                            {toPriceWithComma(row?.UnitPrice) + " تومان"}
                                        </TableCell>
                                        <TableCell align={"center"} component="th" scope="row">
                                            {row?.Count + " عدد"}
                                        </TableCell>
                                        <TableCell align={"center"} component="th" scope="row">
                                            {toPriceWithComma(row?.UnitPrice * row.Count) + " تومان"}
                                        </TableCell>
                                        <TableCell align={"right"} component="th" scope="row">
                                            <IconButton> <Delete color={"error"} onClick={e=> setItemToDelete(row)}/> </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
            </Card>
            {renderModalDelete()}
        </>
    );
};

export default _EditPreOrderExtras;
