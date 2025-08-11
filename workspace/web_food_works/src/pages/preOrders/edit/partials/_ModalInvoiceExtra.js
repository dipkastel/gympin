import React, {useContext, useEffect, useState} from 'react';
import {Support_add} from "../../../../network/api/support.api";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {Add} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";
import {InvoiceExtra_add} from "../../../../network/api/invoiceExtra.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _ModalInvoiceExtra = ({catering,invoice,update}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd,setOpenModalAdd] = useState(null);
    const [inRow,setInRow] = useState({});

    useEffect(() => {
        setInRow({});
    }, [openModalAdd]);

    function renderModalAdd() {
        function submitRequest(e) {
            e.preventDefault();
            setOpenModalAdd(false);
            InvoiceExtra_add({
                Invoice:{Id:invoice.Id},
                Name:e.target.name.value,
                Description:e.target.description?.value||"",
                PlacePrice:toPriceWithoutComma(e.target.unitPrice.value),
                Place:{Id:catering.Id},
                UnitPrice:toPriceWithoutComma(e.target.unitPrice.value),
                Count:e.target.count.value,
            })
                .then((result) => {
                    update()
                })
                .catch((e) => {
                    try {
                        error.showError({ message: e.response.data.Message });
                    } catch (f) {
                        error.showError({ message: "خطا نا مشخص" });
                    }
                });
        }

        return (
            <Dialog
                open={openModalAdd}
                maxWidth={"md"}
                onClose={() => setOpenModalAdd(false)}
            >
                <Form onSubmit={(e) => submitRequest(e)}>
                    <DialogTitle>{"افزودن آیتم به فاکتور"}</DialogTitle>
                    <DialogContent>
                        <Grid sx={{p:1}} container columns={20} spacing={1} >
                            <Grid size={7}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    name={"name"}
                                    value={inRow.Name}
                                    label="نام مورد"
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) =>
                                        setInRow({ ...inRow, Name: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid size={3}>
                                <TextField
                                    fullWidth
                                    name={"count"}
                                    label="تعداد"
                                    value={inRow.Count}
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ className: "text-center" }}
                                    onChange={(e) =>
                                        setInRow({ ...inRow, Count: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid size={4}>
                                <TextField
                                    fullWidth
                                    name={"unitPrice"}
                                    label="قیمت واحد (تومان)"
                                    value={inRow.UnitPrice}
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) =>
                                        setInRow({...inRow, UnitPrice: toPriceWithComma(e.target.value)})
                                    }
                                    inputProps={{ className: "text-center" }}
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="مجموع"
                                    name={"sum"}
                                    variant="outlined"
                                    value={toPriceWithComma( toPriceWithoutComma(inRow.UnitPrice)*inRow.Count)}
                                    type="text"
                                    disabled={true}
                                />
                            </Grid>
                            <Grid size={20}>
                                <TextField
                                    margin="dense"
                                    name="description"
                                    label="توضیح"
                                    value={inRow.Desc}
                                    multiline={true}
                                    rows={5}
                                    type="text"
                                    fullWidth
                                    variant={"outlined"}
                                    onChange={(e) =>
                                        setInRow({ ...inRow, Desc: e.target.value })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ px: 7, mb: 2, mx: 2 }}
                            type={"submit"}
                            variant={"outlined"}
                            color={"success"}
                        >
                            ثبت
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }
    return (
        <>
            <IconButton onClick={()=>setOpenModalAdd(true)}><Add/></IconButton>
            {renderModalAdd()}
        </>
    );
};

export default _ModalInvoiceExtra;
