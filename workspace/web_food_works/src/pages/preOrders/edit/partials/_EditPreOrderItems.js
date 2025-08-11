import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TableCell,
    TableContainer,
    TextField
} from "@mui/material";
import {Add, FileDownload, Remove} from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma} from "../../../../helper/utils";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {invoice_addFood, invoice_changeInvoiceBuyableCount, invoice_deleteBuyable} from "../../../../network/api/invoice.api";
import {Form} from "react-bootstrap";
import __SelectFoodFromMenu from "./__SelectFoodFromMenu";
import {useSelector} from "react-redux";

const _EditPreOrderItems = ({invoice,getInvoice}) => {


    const [openModalAdd,setOpenModalAdd] = useState(false);
    const catering = useSelector(({ catering }) => catering.catering);
    const error = useContext(ErrorContext);

    useEffect(() => {

    }, []);


    function removeItem(item){
        invoice_deleteBuyable({id: item.Id})
            .then(data => {
                error.showError({message: "عملیات موفق",});
                getInvoice();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateCount(action, item, _newCount) {
        let newCount = item.Count;
        if (action === "plus") {
            newCount++;
        }

        if (action === "minus") {
            newCount--;
            if(newCount==0){
                removeItem(item);
                return;
            }
        }
        if (action === "update") {
            newCount = _newCount;
        }

        invoice_changeInvoiceBuyableCount({
            Id: item.Id,
            Count: newCount
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            getInvoice();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function RenderModalAdd() {
        function addToMenu(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            invoice_addFood({
                Invoice: {Id: invoice.Id},
                MenuItem: {Id: e.target.selectFood.value},
                Count: 1,
                Corporate: {Id: invoice.Corporate.Id},
            }).then(result => {
                error.showError({message: 'به سبد خرید اضافه شد'});
                getInvoice();
            }).catch(e => {
                getInvoice();
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <>

                <Dialog  open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addToMenu(e)}>
                        <DialogTitle>افزودن آیتم</DialogTitle>
                        <DialogContent sx={{minWidth:"450px",minHeight:"350px"}}>
                            {/*<__SelectFoodFromMenu catering={catering} name={"food"}/>*/}
                            <__SelectFoodFromMenu name={"selectFood"} date={invoice.InvoiceFoods[0].Date} cateringId={catering.Id} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </>
        );
    }


    return (
        <>
            <Card elevation={10} sx={{m:2}}>
                <CardHeader
                    sx={{borderBottom:"1px solid #909090"}}
                    title={"آیتم ها"}
                    action={<><IconButton onClick={()=>setOpenModalAdd(true)}><Add/></IconButton></>}
                />
                <CardContent>
                    <TableContainer>
                        <Table aria-label="simple table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>نام آیتم</TableCell>
                                    <TableCell >قیمت واحد</TableCell>
                                    <TableCell align="right">تعداد</TableCell>
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
                                            {row?.PlacePrice}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color={"success"} onClick={()=>updateCount("plus",row,null)}><Add/></IconButton>
                                            {row?.Count+" عدد"}
                                            <IconButton color={"error"} onClick={()=>updateCount("minus",row,null)}><Remove/></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            {RenderModalAdd()}
        </>
    );
};

export default _EditPreOrderItems;
