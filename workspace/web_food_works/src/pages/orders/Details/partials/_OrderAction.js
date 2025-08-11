import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {invoice_completeFoodPayment} from "../../../../network/api/invoice.api";
import {useNavigate} from "react-router";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _OrderAction = ({invoice}) => {

    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    function renderModalConfirm() {
        function invoiceChangeStatus(e) {
            e.preventDefault();
            setOpenModalConfirm(false);
            invoice_completeFoodPayment({id:invoice.Id}).then(result=>{
                navigate("/Orders");
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalConfirm} onClose={() => setOpenModalConfirm(null)}>
                <Form onSubmit={(e) => invoiceChangeStatus(e)}>
                    <DialogTitle>تایید و تکمیل سفارش</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant={"body2"}>
                                {"سفارش ارسال شده و به دست مشتری رسیده است."}
                            </Typography>
                            <Typography variant={"body2"}>
                                {"پس از تایید ارسال دیگر به لیست آیتم ها دسترسی نخواهید داشت."}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => setOpenModalConfirm(null)}
                        >
                            لغو
                        </Button>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            تایید
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        );
    }

    return (
        <>
            <Card elevation={10} sx={{m:2}}>
                <CardHeader sx={{borderBottom:"1px solid #909090"}} title={"عملیات"}/>
                <CardContent>
                    <Button variant={"contained"} fullWidth color={"success"} onClick={(e)=>setOpenModalConfirm(true)} >سفارش انجام شد</Button>
                </CardContent>
            </Card>
            {renderModalConfirm()}
        </>
    );
};

export default _OrderAction;
